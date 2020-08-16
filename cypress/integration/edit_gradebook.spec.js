import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {createProfessor} from '../page_object/create_professors.page'
import {createGradebook} from '../page_object/create_gradebook.page'

const faker = require('faker')
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let email = faker.internet.email();
let text = faker.random.words();
let gradebookTitle = faker.random.words();
let gradebookTitle2 = faker.random.words();
let imeProf = faker.random.words();
let prezimeProf = faker.random.words();
let image1 = "https://www.newenglishreview.org/files/100/Image/Paperchase.jpg";
let image2 = "https://img.freepik.com/free-photo/old-professor-showing-classroom_23-2148201060.jpg?size=626&ext=jpg"
let image3 = "https://images.ctfassets.net/p0qf7j048i0q/3C15803B7BE94A5696501B2AE89C30CF/9168c33e6bacbcaafca0a3163a32fcd9/491706503.jpg"
let studentFirstName = faker.random.words();
let studentLastName = faker.random.words();
let studentImage1 = "https://cdn.imgbin.com/16/10/12/imgbin-girl-study-skills-student-board-exam-s-girl-reading-book-illustration-Vug2u10kNqeDMngXET4U5nNuB.jpg"
let studentImage2 = "https://w0.pngwave.com/png/893/482/lesson-cartoon-student-student-png-clip-art.png"
let studentImage3 = "https://www.pngkit.com/png/detail/239-2395475_graphic-transparent-library-student-thinking-png-hd-tongue.png"

describe('Edit gradebook module', () => {

    before(() => {
      cy.visit('/')
    });
  
    beforeEach(() => {

    cy.visit('/')
    cy.get('.nav-link').contains('Sign in').click()
    
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    });
  
   
//single book grade page is visible and editable
    it('GB-28: Edit gradebook page - student addition with added images and delete them', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
        cy.get('a').contains(gradebookTitle).click()
        cy.wait(1000)
        cy.get('.btn').contains('Add Student').click()
        cy.get('#firstName').type(studentFirstName)
        cy.get('#lastName').type(studentLastName)   
        cy.get('button').contains('Add images').click()
        cy.get('[autofocus=autofocus]').eq(0).type(studentImage3)
        cy.get('button').contains('Add images').click()
        cy.get('[autofocus=autofocus]').eq(1).type(studentImage2)
        cy.get('button').contains('Add images').click()
        cy.get('[autofocus=autofocus]').eq(2).type(studentImage1)
        cy.get('button').eq(8).contains('Move image up').click()
        cy.wait(1000)
        cy.get('button').eq(7).contains('Remove image').click()
        cy.wait(1000)
        cy.get('button').eq(7).contains('Submit').click()
        cy.wait(2000);
        cy.get('table > tbody > tr > td:last-child').should('contain', studentFirstName + ' ' + studentLastName)
    })


    it('GB-29: Edit gradebook page - change gradebook title', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
        cy.get('a').contains(gradebookTitle).click()
        cy.wait(1000)
        cy.get('.btn').contains('Edit Gradebook').click()
        cy.get('[type=text]').clear()
        cy.get('[type=text]').type('NEW TITLE' + ' ' + gradebookTitle2)
        cy.get('button').contains('Submit').click()
        cy.wait(1000);
        cy.get('[type=text]').type('NEW TITLE' + ' ' + gradebookTitle2)
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        
    })

    it('GB-30: Edit gradebook page - add and delete comment', () => { 
        cy.get('#navbardrop').click()
        cy.wait(2000)
        cy.get('a').contains('Create Professor').click()
        createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
        cy.wait(1000);
        cy.get('.nav-link').contains('Create Gradebook').click()
        cy.wait(1000);
        createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
        cy.wait(1000);
        cy.get('.form-control').type(gradebookTitle)
        cy.wait(1000);
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
        cy.get('a').contains(gradebookTitle).click()
        cy.wait(1000)
        cy.get('textarea').type('Comment No1..........')
        cy.get('button').contains('Submit Comment').click()
        cy.wait(1000);
        cy.get('a').contains('Gradebooks').click()
        cy.get('[type=text]').type(gradebookTitle)
        cy.get('button').contains('Search').click()
        cy.wait(2000)
        cy.get('a').contains(gradebookTitle).click()
        cy.wait(2000)
        cy.get('.comments > div > button').contains('Delete').click()

    })

        it('GB-31: Edit gradebook page - delete gradebook', () => { 
            cy.get('#navbardrop').click()
            cy.wait(2000)
            cy.get('a').contains('Create Professor').click()
            createProfessor.kreirajProfesora(imeProf, prezimeProf, image1)
            cy.wait(1000);
            cy.get('.nav-link').contains('Create Gradebook').click()
            cy.wait(1000);
            createGradebook.kreirajDnevnik(gradebookTitle, imeProf + ' ' + prezimeProf)
            cy.wait(1000);
            cy.get('.form-control').type(gradebookTitle)
            cy.wait(1000);
            cy.get('button').contains('Search').click()
            cy.wait(2000)
            cy.get('table > tbody > tr > td > a').should('contain', gradebookTitle)
            cy.get('a').contains(gradebookTitle).click()
            cy.wait(1000)
            cy.get('button').contains('Delete Gradebook').click()
            cy.wait(1000);
            cy.get('.form-control').type(gradebookTitle)
            cy.wait(1000);
            cy.get('button').contains('Search').click()
            cy.wait(1000)
        })


 })