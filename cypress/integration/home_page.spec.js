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
let image2 = "https://img.freepik.com/free-photo/old-professor-showing-classroom_23-2148201060.jpg?size=626&ext=jpg"
let image3 = "https://images.ctfassets.net/p0qf7j048i0q/3C15803B7BE94A5696501B2AE89C30CF/9168c33e6bacbcaafca0a3163a32fcd9/491706503.jpg"
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
    it('GB-  : Homepage - filter - found gradebook - manual searching - scrolling down', () => { 
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.wait('@diaries')

        cy.get('.form-control').type('Pozorištance puž')
        cy.get('.btn').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', 'Pozorištance puž')
    })

    //proba filtriranja sa page objest create gradebook
    it('GB-  : Homepage - filter - found gradebook - filter searching', () => { 
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
    it('GB-  : New professor gets new gradebook and professor is not available for getting another gradebook', () => { 
        
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

// ako se ne unese naslov dnevnika iskace poruka, prvo please fill out this field a posle i crvena poruka
    it.only('GB-  : Create new gradebook - gradebook title required', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
    //napravljen prvi gradebook sa prof
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
    //cy.get('[type="text"]').type(gradebookTitle);
        cy.get('#professor').select(imeProf + ' ' +  prezimeProf)
        cy.wait(1000);
        cy.get('.btn').contains('Submit').click();
        cy.get("div>.alert > :nth-child(1)>div").should(
            "have.text",
            '\n          [\n  "The title field is required."\n]\n        '
          );

})


//single book grade page is visible
    it('GB-  : Single gradebook page', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
        cy.get('a').contains(gradebookTitle).click()
        cy.wait(1000)
        cy.get('h3').contains('Single Gradebook Page').should('be.visible')
    })


    //dodati studente u ovaj test i prijaviti bug za stranicu single profesor page jer su izmesana polja
    it('GB-  : Single professor page ', () => { 
        
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td').eq(1).should('contain', imeProf + ' ' + prezimeProf).click()
        cy.wait(1000)
        cy.get('h3').contains('Single Professor Page').should('be.visible')
        cy.get('table').should('be.visible')  //bug reposrt

        // cy.get('table > tbody > td').eq(0).should('contain',image1)
        // cy.get('table > tbody > tr > td').eq(1).should('contain',imeProf + ' ' + prezimeProf)
        // cy.get('table > tbody > tr > td').eq(2).should('contain',gradebookTitle)
        // cy.get('table > tbody > tr > td').eq(3).should('contain', numberofstudents) dodati studente u ovaj test

    })


    it('GB-  : Create professor add and delete images', () => { 
        
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('button').contains('Add images').click()
        cy.get('.form-control').eq(0).type(image3)
        cy.get('button').contains('Add images').click()
        cy.get('.form-control').eq(1).type(image2)
        cy.get('button').contains('Add images').click()
        cy.get('.form-control').eq(2).type(image1)
        cy.get('button').eq(8).contains('Move image up').click()
        cy.wait(1000)
        cy.get('button').eq(7).contains('Remove image').click()
        cy.wait(1000)
        cy.get('button').eq(7).contains('Submit').click()
        cy.wait(2000);
        cy.get('[type=text]').type(firstName)
        cy.get('table > tbody > tr > td').should('contain', firstName)
    })

    })