describe('Sign out', () => {
    beforeEach(() => {
        cy.server()
    })

    it('GB: 41 Sign out from application', () => {
        cy.loginBe('jelllenakrstic@gmail.com', 'Jelenak1908')
        cy.wait(1000)
        cy.get('.nav-link').contains('Sign in').should('not.be.visible')
        cy.get('.nav-link').contains('Register').should('not.be.visible')
        cy.wait(1000)
        cy.get('a').contains('Sign out').click()
        cy.wait(1000)
        cy.get('.nav-link').contains('Sign in').should('be.visible')
        cy.get('.nav-link').contains('Register').should('be.visible')
        })

  })