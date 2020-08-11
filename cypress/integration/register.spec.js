const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password2 = faker.internet.password();

describe('Register module', () => {

  before(() => {
    cy.visit('/')
  });

  beforeEach(() => {
    //cy.visit('/register')
    cy.visit('/')
    cy.get('.nav-link').contains('Register').click()
    cy.server()
  });

    it('GB-2 : GB-2 : Register page layout ', () => {
      cy.get('.nav-link').contains('Sign in').click()  
      cy.get('.nav-link').contains('Register').click()
      cy.get('label').contains('First Name').should('be.visible')
      cy.get('#firstName').should('be.visible')
      cy.get('label').contains('Last Name').should('be.visible')
      cy.get('#lastName').should('be.visible')
      cy.get('label').contains('Password').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('label').contains('Password Confirmation').should('be.visible')
      cy.get('#passwordConfirmation').should('be.visible')
      cy.get('label').contains('Email').should('be.visible')
      cy.get('#email').should('be.visible')
      cy.get('label').contains('Accept terms and conditions')
      cy.get('[type="checkbox"]').should('be.visible').check() 
      cy.get('[type=submit]').should('be.visible')
    })

//završiti

    it('GB-3: Register – valid data (positive test)', () => { 
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').type(email)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(1000)
      })


      it('GB-4 : Register page - visibility as logged in user', () => {
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').type(email)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(1000)
        cy.get('.nav-link').contains('Register').should('not.be.visible')
      })


      //promeniti broj ovog testa
      it('GB-X: Register – valid data professor realy exist', () => {
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').type(email)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(2000)
        cy.get('#navbardrop').click()
        cy.wait(1000)
        cy.get('a').contains('All Professors').click()
        cy.get('table > tbody:last-child > tr > td').should('contain', firstName)
      })

    })