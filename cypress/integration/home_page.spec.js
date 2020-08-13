import {EMAIL} from '../fixtures/constants'

import {authPage} from '../page_object/login.page'
import {createProfessor} from '../page_object/create_professors.page'
//import {par} from '../fixtures/constants'

const faker = require('faker')
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let email = faker.internet.email();
let text = faker.random.words();
let gradebookTitle = faker.random.words();
let imeProf = faker.random.words();
let prezimeProf = faker.random.words();
let image1 = "https://www.newenglishreview.org/files/100/Image/Paperchase.jpg"


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

    //ovde ubaciti da kreira novu galeriju za slucaj da neko obrise postojecu
    it('GB-  : Homepage - filter - found gradebook', () => { 
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        cy.wait('@diaries')
        cy.get('.form-control').type('Pozorištance puž')
        cy.get('.btn').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', 'Pozorištance puž')
    })

    it.only('GB-  : Create gradebook', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        // cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
        // cy.wait('@diaries')
        //cy.wait(2000)
        createProfessor.kreirajProfesora(imeProf, prezimeProf)
        cy.get('.btn').contains('Add images').click()
        cy.get('.form-control').type(image1)
        cy.get('[type="submit"]').click()
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click();
        cy.get('h3').contains('Create Gradebook Page').should('be.visible');
        cy.get('label').contains('Professor').should('be.visible');
        cy.get('label').contains('Gradebook title').should('be.visible');
        cy.wait(1000);
        cy.get('[type="text"]').click().type(gradebookTitle);
        cy.wait(1000);

//ZAVRSITI VALIDIRANJE DA JE PROF KREIRAN I KREIRATI DNEVNIK SA TIM PROFESOROM ODABRATI GA SA POSLEDNJEG MESTA LISTE

        cy.get('[name="professor"]').select([imeProf]);
        cy.wait(1000);
        cy.get('.btn').contains('Submit').click();
    })

    })