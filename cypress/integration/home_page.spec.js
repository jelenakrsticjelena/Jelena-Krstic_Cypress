import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {createProfessor} from '../page_object/create_professors.page'
import {createGradebook} from '../page_object/create_gradebook.page'

const faker = require('faker')
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let email = faker.internet.email();
let text = faker.random.words();
let gradebookTitle = faker.random.words();
let gradebookTitle2 = faker.random.words();
let imeProf = faker.random.words();
let prezimeProf = faker.random.words();
let image1 = "https://www.newenglishreview.org/files/100/Image/Paperchase.jpg";
//let naslovDnevnika = faker.random.words();
//let profa = faker.random.words();
//let dodajSliku = faker.image.people();


describe('Home page module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {

    cy.visit('/')
    cy.get('.nav-link').contains('Sign in').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    });
  
    it('GB-  : Homepage - filter - not found gradebook', () => { 
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.wait('@diaries')
        cy.get('.form-control').type(text)
        cy.get('.btn').contains('Search').click()
        cy.wait(2000)
        cy.get('.container > p').contains('There is no more gradebooks in base, try again').should('be.visible')
    })

    //ovde ubaciti da kreira novi dnevnik za slucaj da neko obrise postojeci
    it('GB-  : Homepage - filter - found gradebook', () => { 
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.wait('@diaries')

        cy.get('.form-control').type('Pozorištance puž')
        cy.get('.btn').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', 'Pozorištance puž')
    })

    //proba filtriranja sa page objest create gradebook
    it.only('GB-  : Homepage - filter - found gradebook', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.get('a').contains('Gradebooks').click()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
    })

    it('GB-  : New professor gets new gradebook', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.get('a').contains('Professors').click()
        cy.wait(1000);
        cy.get('.dropdown-menu').contains('All Professors').click()
        cy.get('table > tbody:last-child > tr').should('contain', imeProf, prezimeProf, 'Professor is available')
        cy.wait(2000)
        cy.get('.nav-link').contains('Create Gradebook').click();
        cy.wait(1000);
        cy.get('[type="text"]').type(gradebookTitle);
        cy.get('#professor').select(imeProf + ' ' +  prezimeProf)
        cy.wait(1000);
        cy.get('.btn').contains('Submit').click();
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.wait('@diaries')
        cy.get('.form-control').type(gradebookTitle)
        cy.get('.btn').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
        
    })
    
    //novi profesor uzima novi dnevnik i vise nije dostupan
    it('GB-  : New professor gets new gradebook and frofessor is not available for getting a another gradebook', () => { 
        
        cy.get('#navbardrop').click()
        cy.wait(2000)

        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        //napravljen prvi gradebook sa prof
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        cy.get('[type="text"]').type(gradebookTitle);
        cy.get('#professor').select(imeProf + ' ' +  prezimeProf)
        cy.wait(1000);
        cy.get('.btn').contains('Submit').click();
        //pravim drugi dnevnik i pokusavam da mu dodam istog profesora, ali nije dostupan
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click();
        cy.wait(1000);
        cy.get('[type="text"]').type(gradebookTitle2);
        cy.get('#professor').find(imeProf + ' ' +  prezimeProf)
                            .should('not.be.visible')
       
    })
//proba za page object create gradebook
    it('GB-  : Create gradebook', () => { 
        
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        
    })


    })