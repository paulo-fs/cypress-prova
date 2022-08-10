describe('Recover the password', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.forgotPass').click();
  });

  it('should be possibe to recover or change the password', () => {
    const email = 'manoel@gmail.com';
    const newPassword = 'abc1234';
    cy.resetPass(email);
    cy.wait('@resetPassword').then((xhr) => {
      expect(xhr.status).be.eq(200);
    });
    cy.changePass(newPassword);
    cy.wait('@changePassword').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('email');
      expect(xhr.response.body.email).be.not.null;
    });
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('exist');
  });

  it('should show a error message when the e-mail dont exists', () => {
    const errorMessage = 'Usuário não encontrado em nossa base de dados';
    cy.resetPass('invalidEmail@mail.com');
    cy.wait('@resetPassword').then((xhr) => {
      expect(xhr.status).be.eq(404);
      expect(xhr.response.body).has.property('message');
      expect(xhr.response.body.message).be.eq(errorMessage);
    });
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('have.text', errorMessage);
  })
})