// import {EMAIL} from '../fixtures/constants'
// import {authPage} from '../page_object/login.page'

const { authPage } = require("../page_object/login.page");
const { EMAIL } = require("../fixtures/constants");

describe('Login module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {
      //cy.get('.nav-link').contains('Sign in').click()
      cy.server()
      cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
    });
  
    // afterEach(() =>
    //   cy.visit('/')
    // );

    // after(() =>
    //   cy.visit('/login')
    // );

      it('GB-15 : Sign in / login page layout', () => {
        cy.get('.nav-link').contains('Sign in').click() 
        cy.get('h2').contains('Please login')
        cy.get('[type=text]').should('have.attr', 'placeholder', 'Email Address')
        cy.get('[type=password]').should('have.attr', 'placeholder', 'Password')
        cy.get('[type=submit]').contains('Login').should('be.visible')
      })

      it('GB-16 : Login page valid data ', () => {
        // authPage.email.type(EMAIL.EXISTING)
        // authPage.password.type(EMAIL.PASSWORD)
        // authPage.loginButton.click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@diaries')

        cy.wait(1000)

        cy.get('.nav-link').contains('Sign out').click() 

      })




      it('GB-17 : Login page invalid data - invalid email', () => {
        cy.get('[type=text]').clear()
        cy.get('[type=text]').type('jelenakrstic@gmail.com')
        cy.get('[type=password]').clear()
        cy.get('[type=password]').type(EMAIL.PASSWORD)
        authPage.loginButton.click()
        cy.wait(1000)
        cy.get('[type=submit]').contains('Login').should('be.visible')
      })


      
      it('GB-18 : Login page invalid data - invalid password', () => {
      cy.get('[type=text]').clear()

        cy.get('[type=text]').type(EMAIL.EXISTING)
        cy.get('[type=password]').clear()
        cy.get('[type=password]').type('jelenak1988')
        authPage.loginButton.click()
        cy.wait(1000)
        cy.get('[type=submit]').contains('Login').should('be.visible')
      })

    })