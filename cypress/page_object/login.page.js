import { EMAIL } from "../fixtures/constants"

export default class AuthPage {
    get email() {
        return cy.get('[type=text]')
    }

    get password() {
        return cy.get('[type=password]')
    }

    get loginButton() {
        return cy.get('button[type=submit]')
    }

    login(mejl, sifra) {
        this.email.type(mejl)
        this.password.type(sifra)
        this.loginButton.click()
    }
}
export const authPage = new AuthPage()