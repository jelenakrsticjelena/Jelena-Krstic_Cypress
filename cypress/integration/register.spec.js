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

//uraditi 

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
      it('GB-X: Register – valid data user/professor realy exist', () => {
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

      it('GB-11: Register page – First name input field: required', () => {
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').then(($input) => {
          expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.get('#lastName').type(lastName)
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').type(email)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
      })

      it('GB-11: Register page – Last name input field: required', () => {
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').then(($input) => {
          expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').type(email)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
      })

      it('GB-13: Register page – Email field: required', () => {
        cy.get('.nav-link').contains('Register').click()
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#password').type(password)
        cy.get('#passwordConfirmation').type(password)
        cy.get('#email').then(($input) => {
          expect($input[0].validationMessage).to.eq('Please fill out this field.')
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
      })
    })

    it('GB-14: Register page – Email field format invalid', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password').type(password)
      cy.get('#passwordConfirmation').type(password)
      cy.get('#email').type('invalidemail.invalid.com')
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000) 
      cy.get('#email').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'invalidemail.invalid.com\' is missing an \'@\'.')
    })
    })

    it('GB-15: Register page – Password input field empty', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password')
      cy.get('#passwordConfirmation').type(password)
      cy.get('#email').type(email)
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000)
      cy.on('window:alert', (message) => {
        expect(message).to.equal('Your passwords doesn`t match, try again, please')
      })
    })

    it('GB-16: Register page – Password Confirm input field empty', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password').type(password)
      cy.get('#passwordConfirmation')
      cy.get('#email').type(email)
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000)
      cy.on('window:alert', (message) => {
        expect(message).to.equal('Your passwords doesn`t match, try again, please')
      })
    })

    it('GB-17: Register page – Password do not match the requested format', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password').type('1234aa')
      cy.get('#passwordConfirmation').type('1234aa')
      cy.get('#email').type(email)
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000)

      cy.get('#password').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please match the requested format.')
    })
    })


    //  Uraditi i u Postmanu i u FE   - registracija uspeva, a ne bi trebala
    it('GB-18: Register page – User can not register twice with the same email', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password').type('1234aa')
      cy.get('#passwordConfirmation').type('1234aa')
      cy.get('#email').type(email)
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000)

      cy.get('#password').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please match the requested format.')
    })
    })


    //  Uraditi i u Postmanu i u FE   - registracija uspeva, a ne bi trebala
    it('GB-19: Register page – Terms and conditions unchecked', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#firstName').type(firstName)
      cy.get('#lastName').type(lastName)
      cy.get('#password').type('1234aa')
      cy.get('#passwordConfirmation').type('1234aa')
      cy.get('#email').type(email)
      cy.get('[type="checkbox"]').check()
      cy.wait(1000)
      cy.get('[type=submit]').click() 
      cy.wait(1000)

      cy.get('#password').then(($input) => {
        expect($input[0].validationMessage).to.eq('Please match the requested format.')
    })
    })
  })
