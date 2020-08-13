export default class CreateProfessor {
    
    get firstName() {
        return cy.get('#firstName')
    }

    get lastName() {
        return cy.get('#lastName')
    }

    kreirajProfesora(imeProf, prezimeProf) {
        this.firstName.type(imeProf)
        this.lastName.type(prezimeProf)
    }

    // get addImage() {
    //     return cy.get('.btn').contains('Add images').click()
    //     cy.get(['autofocus="autofocus"']).type(urlRandom)
    // }

    // get submitButton() {
    //     return cy.get('[type="submit"]').click()
    // }

}
export const createProfessor = new CreateProfessor()