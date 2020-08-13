import {EMAIL} from '../fixtures/constants'
import {registerPage} from '../page_object/register.page'
import {authPage} from '../page_object/login.page'

const faker = require('faker')
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let email = faker.internet.email();
let text = faker.random.words();


describe('Layout page module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {
      cy.visit('/')
      cy.get('.nav-link').contains('Register').click()
      cy.server()
    });

    it('GB-  : Layout of homepage as register user', () => { 
        //cy.get('.nav-link').contains('Register').click()
        registerPage.register(firstName, lastName, password, email)
        cy.wait(1000)
  
        cy.get('.nav-link').contains('Gradebooks').should('be.visible')
        cy.get('.nav-link').contains('My Gradebook').should('be.visible') 
        cy.get('.nav-link').contains('Create Gradebook').should('be.visible')  
        cy.get('.nav-link').contains('Professors').should('be.visible')
        cy.get('.nav-link').contains('Sign out').should('be.visible')
        cy.get('h3').contains('All Gradebooks Page').should('be.visible')
        cy.get('label').contains('Gradebook Filter').should('be.visible')
        cy.get('.form-control').should('be.visible')
        cy.get('.btn').contains('Search').should('be.visible')
        cy.get('.table').should('be.visible')
        cy.get('tr').eq(0).contains('Gradebook').should('be.visible')
        cy.get('tr').eq(0).contains('Professor').should('be.visible')
        cy.get('tr').eq(0).contains('Created at').should('be.visible')
        cy.get('.btn').contains('Next').should('be.visible')
        cy.get('.nav-link').contains('Sign out').click()
    })

    it('GB-  : Layout of homepage as loged user', () => { 
        cy.get('.nav-link').contains('Sign in').click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait(1000)

        cy.get('.nav-link').contains('Gradebooks').should('be.visible')
        cy.get('.nav-link').contains('My Gradebook').should('be.visible') 
        cy.get('.nav-link').contains('Create Gradebook').should('be.visible')  
        cy.get('.nav-link').contains('Professors').should('be.visible')
        cy.get('.nav-link').contains('Sign out').should('be.visible')
        cy.get('h3').contains('All Gradebooks Page').should('be.visible')
        cy.get('label').contains('Gradebook Filter').should('be.visible')
        cy.get('.form-control').should('be.visible')
        cy.get('.btn').contains('Search').should('be.visible')
        cy.get('.table').should('be.visible')
        cy.get('tr').eq(0).contains('Gradebook').should('be.visible')
        cy.get('tr').eq(0).contains('Professor').should('be.visible')
        cy.get('tr').eq(0).contains('Created at').should('be.visible')
        cy.get('.btn').contains('Next').should('be.visible')
        cy.get('.nav-link').contains('Sign out').click()
    })

})
