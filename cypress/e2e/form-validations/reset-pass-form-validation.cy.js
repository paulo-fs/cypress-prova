describe('Reset password form validations', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.forgotPass').click();
  })

  context('Form validation on empty fields', () => {
    it('should show validation error when leaving the email field blank', () => {
      cy.get('#email').click();
      cy.get('#email').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'O campo de email é obrigatório!');
    })
  })

  context('Form content validation', () => {
    it('should show validation error when e-mail is invalid', () => {
      cy.get('#email').click().type('email.teste.com');
      cy.get('#email').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'Email inválido!');
    })
  })

  context('Register button validation', () => {
    it('should register button be disabled when e-mail is invalid', () => {
      cy.get('#email').click().type('invalidemailteste.com');
      cy.get('.sc-iBkjds').should('be.disabled');
    })
  })
})