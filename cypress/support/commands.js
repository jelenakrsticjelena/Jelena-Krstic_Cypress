// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('loginBe', (mejl, pasvord) =>{
    Cypress.log({
      name: 'loginByForm',
      message: mejl + ' | ' + pasvord
    })
    cy.request({
      method: 'POST',
      url: Cypress.env('apiUrl') + 'login',
      form: true,
      followRedirect: true,
      body: {
        email: mejl,
        password: pasvord,
      }
    }).
    then((resp)=>{
       expect(resp.body).to.have.property('token')
       localStorage.setItem('user', JSON.stringify(resp.body.user))
       localStorage.setItem('loginToken', resp.body.token)
       cy.visit('/')
    }) 
  })

  Cypress.Commands.add('registerBe', (name, last, mejl, pasvord) =>{

    cy.request({
      method: 'POST',
      url: Cypress.env('apiUrl') + 'register',
      form: true,
      followRedirect: true,
      body: {
        firstName: name,
        lastName: last,
        email: mejl,
        password: pasvord,
      }
    }).
    then((resp)=>{
       cy.visit('/')
    }) 
  })


//   Cypress.Commands.add('deleteBe', ()=>{
//     cy.request({
//       //     method: 'DELETE',
//       //     url: Cypress.env('apiUrl')}/galleries/${useCaseID}',
//       //     form: true,
//       //     followRedirect: true,
//       //     headers: {
//         authorization: `Bearer ${window.loicalStorage.getItem('token')}`
//       }
//       )
//   })
  