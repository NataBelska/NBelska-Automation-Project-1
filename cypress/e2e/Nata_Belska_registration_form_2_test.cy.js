beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

//ASSIGNMENT 4

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {

        MandatoryFields()
        // Type confirmation password which is different from first password        
        cy.get('input[name="password"]').type('Natatest1')
        cy.get('[name="confirm"]').type('Natatest2')
        cy.get('[name="confirm"]').type('{enter}')

        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        cy.screenshot('Full page screenshot')

        // Change the test, so the passwords would match
        cy.get('input[name="password"]').clear()
        cy.get('[name="confirm"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('input[name="password"]').type('Natatest1')
        cy.get('[name="confirm"]').type('Natatest1')
        cy.get('[name="confirm"]').type('{enter}')

        cy.get('.submit_button').should('be.enabled')
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible')
        cy.screenshot('Full page screenshot')
    })

    it('User can submit form with all fields added', () => {

        MandatoryFields()
        cy.get('#phpFavLanguage').check().should('be.checked') //Checking PHP radio button
        cy.get('#vehicle2').check().should('be.checked') //Checking "I have a car" option
        cy.get('#cars').select('Saab')
        cy.get('#animal').select('Horse')

        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.screenshot('Full page screenshot')

    })

    it('User can submit form with valid data and only mandatory fields added', () => {

        MandatoryFields()
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible')
        cy.screenshot('Full page screenshot')
    })

    it('User cannot submit the form without Username', () => {

        MandatoryFields()
        cy.get('#username').clear().type('{enter}')
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
        cy.screenshot('Full page screenshot')
    })
})

//ASSIGNMENT 5

describe('Section 2: Visual tests', () => {

    it('My test for second picture', () => {
        cy.log('Will check logo source and size of the second picture')
        cy.get('img').eq(1).should('be.visible').and('have.attr', 'src').should('contain', 'cypress_logo.png')
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 100).and('be.greaterThan', 50)
        cy.get('img').eq(1).invoke('width').should('be.lessThan', 150).and('be.greaterThan', 100)
    });

    it('My test for second link', () => {

        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').children().eq(1).should('have.text', 'Registration form 3')
        //alternative string: cy.get('nav').find('a').eq(1).should('have.text', 'Registration form 3')

        cy.get('nav').children().eq(1)
            .should('be.visible')
            .should('have.attr', 'href', 'registration_form_3.html')
            .click()

        cy.url().should('contain', '/registration_form_3.html')

        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('My test for checkbox list', () => {

        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat').and('not.be.checked')

        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
    })

    it('My test for Animal dropdown', () => {

        cy.get('#animal').find('option').should('have.length', 6)

        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })
})

function MandatoryFields() {
    cy.get('#username').type('Nata')
    cy.get('#email').type('natalija@gmail.com')
    cy.get('input[name="name"]').type('Natalija')
    cy.get('#lastName').type('Belska')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('input[name="password"]').type('Natatest1')
    cy.get('[name="confirm"]').type('Natatest1')
    cy.get('h2').contains('Password').click()
}
