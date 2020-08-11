// import {EMAIL} from '../fixtures/constants'
// import {authPage} from '../page_object/login.page'

const { authPage } = require("../page_object/login.page");
const { EMAIL } = require("../fixtures/constants");

describe('Login module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {
      cy.get('.nav-link').contains('Sign in').click()
      cy.server()
      cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('diaries')
    });
  
      it('GB-2 : GB-2 : Login page layout ', () => {
        cy.get('.nav-link').contains('Sign in').click()  
        cy.get('[type=text]').should('have.attr', 'placeholder', 'Email Address')
        cy.get('[type=password]').should('have.attr', 'placeholder', 'Password')
        cy.get('[type=submit]').contains('Login').should('be.visible')
      })

      it('GB-2 : GB-2 : Login page valid data ', () => {
        // authPage.email.type(EMAIL.EXISTING)
        // authPage.password.type(EMAIL.PASSWORD)
        // authPage.loginButton.click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)

        cy.wait('@diaries')
        cy.get('.nav-link').contains('Sign out').should('be.visible')
      })



    })