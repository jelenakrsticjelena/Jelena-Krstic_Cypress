describe('Route all', () => {
    beforeEach(() => {
        cy.server()
    })

    it('Wait for request to be registered', () => {
        cy.registerBe('tamo neki', 'pokusava da se registruje','jelllenakrstic@gmail.com', 'Jelenak1908')
           
        })

    it('Wait for request to logged', () => {
        cy.loginBe('jelllenakrstic@gmail.com', 'Jelenak1908')
       
        })

  
  })