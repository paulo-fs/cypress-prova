describe('Change password form validations', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.forgotPass').click();
    cy.get('#email').type('paulo.fernando@luby.software')
    cy.get('.sc-iBkjds').click();
  })

  it('should show validation error when leaving password field black', () => {
    cy.get('#password').click();
    cy.get('#password').blur();
    cy.get('.sc-kDDrLX')
      .should('have.text', 'O campo de senha é obrigatório');
  })

  it('should show validation error when there are less than 6 digits on password input', () => {
    cy.get('#password').click().type('123');
    cy.get('#password').blur();
    cy.get('.sc-kDDrLX')
      .should('have.text', 'A senha precisa ter pelo menos 6 caracteres');
  })

  it('should submit button be disabled when password field is empty', () => {
    cy.get('#password').click();
    cy.get('#password').blur();
    cy.get('.sc-iBkjds')
      .should('be.disabled');
  })

  it('should submit button be disabled when password field is invalid', () => {
    cy.get('#password').click().type('123');
    cy.get('#password').blur();
    cy.get('.sc-iBkjds')
      .should('be.disabled');
  })
})