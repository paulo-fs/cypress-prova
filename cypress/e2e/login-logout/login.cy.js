describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should be possible log in', () => {
    cy.login('paulo.fernando@luby.software', 'abc1234');
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('token');
      expect(xhr.response.body.token.token).be.not.null;
    });
  });

  it('should show a message when login fails', () => {
    const errorMessage = 'Senha ou e-mail inválidos';
    cy.login('invalidUser@user.com', 'abc1234');
    cy.wait('@login').then((xhr) => {
      expect(xhr.status).be.eq(401);
      expect(xhr.response.body).has.property('message');
      expect(xhr.response.body.message).be.eq(errorMessage);
    });
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('have.text', errorMessage);
  });
})