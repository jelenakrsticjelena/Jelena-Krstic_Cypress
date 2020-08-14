export default class CreateProfessor {
    
    get firstName() {
        return cy.get('#firstName')
    }

    get lastName() {
        return cy.get('#lastName')
    }

    get addImageBtn() {
        return cy.get('.btn').contains('Add images')
    }

    get addImage() {
        return cy.get('.form-control')
    }
    
    get submitButton() {
        return cy.get('[type="submit"]')
    }
    kreirajProfesora(imeProf, prezimeProf, image1) {
        this.firstName.type(imeProf)
        this.lastName.type(prezimeProf)
        this.addImageBtn.click()
        this.addImage.type(image1)
        this.submitButton.click()
    }}
export const createProfessor = new CreateProfessor()