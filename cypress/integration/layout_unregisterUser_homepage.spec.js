describe('Unregistered user module', () => {
  
      it('GB-1 : Homepage page layout - user is not registered, user is not sign in', () => {
        cy.visit('/')
        cy.get('.nav-link').contains('Sign in').should('be.visible')
        cy.get('.nav-link').contains('Register').should('be.visible')
        cy.get('h2').contains('Please login').should('be.visible')
        cy.get('[type=text]').should('have.attr', 'placeholder', 'Email Address').should('be.visible')
        cy.get('[type=password]').should('have.attr', 'placeholder', 'Password').should('be.visible')
        cy.get('[type=submit]').contains('Login').should('be.visible').should('be.visible')
      })
    })