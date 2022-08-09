describe('Authentication form validations', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  context('Form validation on empty fields', () => {
    it('should email field be required', () => {
      cy.get('#email').click();
      cy.get('#email').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'O campo de email é obrigatório');
    })

    it('should show validation error when leaving password field blank', () => {
      cy.get('#password').click();
      cy.get('#password').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'O campo de senha é obrigatório');
    })
  })

  context('Form content validation', () => {
    it('should show validation error when type a invalid e-mail', () => {
      cy.get('#email').click().type('email.teste.com');
      cy.get('#email').blur();
      cy.get('.sc-kDDrLX')
        .should('have.text', 'Email inválido!');
    })
  })

  context('Register button validation', () => {
    it('should register button be disabled when e-mail is invalid', () => {
      cy.get('#email').click().type('invalidemailteste.com');
      cy.get('#password').click().type('123456');
      cy.get('.sc-iBkjds').should('be.disabled');
    })

    it('should register button be disabled when password input is empty', () => {
      cy.get('#email').click().type('validemail@teste.com');
      cy.get('#password').should('be.empty');
      cy.get('.sc-iBkjds').should('be.disabled');
    })
  })
})