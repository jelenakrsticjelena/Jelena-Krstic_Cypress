
//ZAVRSITI kako da odabraniProfesor bude == imeProf + ' ' +  prezimeProf

export default class CreateGradebook {
    
    get gradebookTitle() {
        return cy.get('[type="text"]')
    }

    get professor() {
        return cy.get('#professor')
    }

    get loginButton() {
        return cy.get('button')
    }

    kreirajDnevnik(naslovDnevnika, odabraniProfesor) {
        this.gradebookTitle.type(naslovDnevnika)
        this.professor.select(odabraniProfesor)
        this.loginButton.click()
    }
}
export const createGradebook = new CreateGradebook()