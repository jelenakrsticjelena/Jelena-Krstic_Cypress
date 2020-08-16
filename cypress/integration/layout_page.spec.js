import {EMAIL} from '../fixtures/constants'
import {registerPage} from '../page_object/register.page'
import {authPage} from '../page_object/login.page'

const faker = require('faker')
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let email = faker.internet.email();
let text = faker.random.words();


describe('Layout page as a user - module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {
      cy.visit('/')
      //cy.get('.nav-link').contains('Register').click()
      cy.server()
    });


    it('GB-21: same as a GB-4: Layout of homepage as registered user – Gradebooks Page', () => { 
        cy.get('.nav-link').contains('Register').click()
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

    it('GB-20: same as a GB:19 - Layout of homepage as logged user – Gradebooks Page', () => { 
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

    it('GB-22: Layout of My Gradebook page', () => { 
      cy.get('.nav-link').contains('Sign in').click()
      authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.wait(1000)
      cy.get('.nav-link').contains('My Gradebook').click()
      cy.get('.nav-link').contains('Gradebooks').should('be.visible')
      cy.get('.nav-link').contains('My Gradebook').should('be.visible') 
      cy.get('.nav-link').contains('Create Gradebook').should('be.visible')  
      cy.get('.nav-link').contains('Professors').should('be.visible')
      cy.get('.nav-link').contains('Sign out').should('be.visible')
      cy.get('h3').contains('My Gradebook Page').should('be.visible');
      cy.get('.table').should('be.visible');
      cy.get('table > thead > tr').should('contain','Add Student')
      cy.get('table > thead > tr').should('contain','Gradebook')
      cy.get('table > thead > tr').should('contain','Professor')
      cy.get('table > thead > tr').should('contain','Student')
      cy.get('table > tbody > tr').eq(0).should('contain','Delete Gradebook')
      cy.get('.btn').contains('Edit Gradebook').should('be.visible')
      cy.get('h4').contains('Comments').should('be.visible');
      cy.get('textarea').should('have.attr', 'placeholder','Writte your comment')
      cy.get('.btn').contains('Submit Comment').should('be.visible')  
  })

  it('GB-23: Layout of Add student page', () => { 
    cy.get('.nav-link').contains('Sign in').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.wait(1000)
    cy.get('.nav-link').contains('My Gradebook').click()
    cy.get('table > thead > tr').should('contain','Add Student').click()
    cy.get('.btn').contains('Add Student').click()
    cy.get('label').contains('First Name').should('be.visible')
    cy.get('#firstName').should('be.visible')
    cy.get('label').contains('Last Name').should('be.visible')
    cy.get('#lastName').should('be.visible')
    cy.get('.btn').contains('Add images').should('be.visible')  
    cy.get('.btn').contains('Submit').should('be.visible') 

})

it('GB-24: Layout of Edit Gradebook Page', () => { 
  cy.get('.nav-link').contains('Sign in').click()
  authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
  cy.wait(1000)
  cy.get('.nav-link').contains('My Gradebook').click()
  cy.wait(1000)
  cy.get('.btn').contains('Edit Gradebook').click()
  cy.wait(1000)
  cy.get('h3').contains('Create Gradebook Page').should('be.visible');
  cy.get('label').contains('Gradebook title').should('be.visible')
  cy.get('#title').should('be.visible')
  cy.get('label').contains('Professor').should('be.visible')
  cy.get('#professor').should('be.visible')
  cy.wait(1000)
  cy.get('.btn').contains('Submit').should('be.visible') 

})

    it('GB-25 : Layout of Create gradebook page', () => { 
      cy.get('.nav-link').contains('Sign in').click()
      authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.wait(1000)
      cy.get('.nav-link').contains('Create Gradebook').click()
      cy.get('h3').contains('Create Gradebook Page').should('be.visible');
      cy.get('label').contains('Professor').should('be.visible');
      cy.get('label').contains('Gradebook title').should('be.visible');
      cy.get('[type="text"]').should('be.visible')
      cy.get('#professor').should('be.visible')
      cy.get('.btn').should('be.visible')
      cy.get('.nav-link').contains('Sign out').should('be.visible')
  })

  it('GB-26: Layout of All professors page', () => { 
    cy.get('.nav-link').contains('Sign in').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.wait(1000)

    cy.get('#navbardrop').click()
    cy.get('a').contains('All Professors').click()
    cy.wait(1000)
    //cy.get('h3').contains('All Professors Page').should('be.visible')
    cy.wait(2000)
    cy.get('label').contains('Professors filter').should('be.visible')
    cy.get('.form-control').should('be.visible')
    cy.get('table > thead > tr').should('contain', 'FirstName', 'LastName', 'Picture', 'Gradebook')
    cy.get('.nav-link').contains('Sign out').should('be.visible')
})

it('GB-27: Layout of Create professor page', () => { 
  cy.get('.nav-link').contains('Sign in').click()
  authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
  cy.wait(1000)
  cy.get('#navbardrop').click()
  cy.get('a').contains('Create Professor').click()
  cy.wait(1000)
  cy.get('h3').contains('Create Professor').should('be.visible')
  cy.wait(2000)
  cy.get('label').contains('First Name').should('be.visible')
  cy.get('#firstName').should('be.visible')
  cy.get('label').contains('Last Name').should('be.visible')
  cy.get('#lastName').should('be.visible')
  cy.get('.btn').contains('Add images').click()
  cy.get('[type="submit"]').should('be.visible')
  cy.get('.nav-link').contains('Sign out').should('be.visible')
})

})
