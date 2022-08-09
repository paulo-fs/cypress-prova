
describe('Register form validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.sc-ftvSup').click();
  })
  
  context('Form validation on empty fields', () => {
    it('should show validation error when leaving the name field blank', () => {
      cy.get('#name').click();
      cy.get('#name').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'O campo de nome é obrigatório!');
    });

    it('should show validation error when leaving the email field blank', () => {
      cy.get('#email').click();
      cy.get('#email').blur();
      cy.get(':nth-child(2) > .sc-kDDrLX')
        .should('have.text', 'O campo de email é obrigatório!');
    })

    it('should show validation error when leaving the password field blank', () => {
      cy.get('#password').click();
      cy.get('#password').blur();
      cy.get(':nth-child(3) > .sc-kDDrLX')
        .should('have.text', 'O campo de senha é obrigatório');
    })
  })

  context('Form content validation', () => {
    it('should show validation error when e-mail is invalid', () => {
      cy.get('#email').click().type('email.teste.com');
      cy.get('#email').blur();
      cy.get(':nth-child(2) > .sc-kDDrLX')
        .should('have.text', 'Email inválido!');
    })

    it('should show validation error when there are less than 6 digits on password input', () => {
      cy.get('#password').click().type('12345');
      cy.get('#password').blur();
      cy.get(':nth-child(3) > .sc-kDDrLX')
        .should('have.text', 'A senha precisa ter pelo menos 6 dígitos!');
    })
  })

  context('Register button validation', () => {
    it('should register button be disabled when name field is blank', () => {
      cy.get('#name').click();
      cy.get('#email').click().type('validemail@teste.com');
      cy.get('#password').click().type('123456');
      cy.get('.sc-iBkjds').should('be.disabled');
    })

    it('should register button be disabled when e-mail is invalid', () => {
      cy.get('#name').click().type('Name');
      cy.get('#email').click().type('invalidemailteste.com');
      cy.get('#password').click().type('123456');
      cy.get('.sc-iBkjds').should('be.disabled');
    })

    it('should register button be disabled when invalid password is invalid', () => {
      cy.get('#name').click().type('Name');
      cy.get('#email').click().type('validemail@teste.com');
      cy.get('#password').click().type('12345');
      cy.get('.sc-iBkjds').should('be.disabled');
    })
  })
})