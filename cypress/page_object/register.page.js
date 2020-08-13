export default class RegisterPage {
    get firstName() {
        return cy.get('#firstName')
    }
    get lastName() {
        return cy.get('#lastName')
    }

    get password() {
        return cy.get('#password')
    }

    get passwordConfirmation() {
        return cy.get('#passwordConfirmation')
    }

    get email() {
        return cy.get('#email')
    }

    get termsAndConditions() {
        return cy.get('[type="checkbox"]')
    }

    get loginButton() {
        return cy.get('button[type=submit]')
    }


    register(ime, prezime, sifra, mejl) {
        this.firstName.type(ime)
        this.lastName.type(prezime)
        this.password.type(sifra)
        this.passwordConfirmation.type(sifra)
        this.email.type(mejl)        
        this.loginButton.click()
        this.termsAndConditions.check() 
    }
}
export const registerPage = new RegisterPage()