
//ZAVRSITI

export default class CreateGradebook {
    
    get gradebookTitle() {
        return cy.get('[type="text"]')
    }

    get professor() {
        return cy.get('[name="professor"]').select(['Shania Champlin'])
    }

    get loginButton() {
        return cy.get('btn')
    }

    createGradebook(naslovDnevnika, profa) {
        this.gradebookTitle.type(naslovDnevnika)
        this.professor.type(profa)
        this.loginButton.click()
    }
}
export const createGradebook = new CreateGradebook()