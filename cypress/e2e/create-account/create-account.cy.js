describe('Create a new account', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.sc-ftvSup').click();
  })

  it('should be possible to create a new account', () => {
    const randownUser = String(new Date().getTime());
    const email = `${randownUser}@mail.com`;
    const pass = 'abc1234';
    cy.createAcc(randownUser, email, pass);
    cy.wait('@registerAccount').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('user');
      expect(xhr.response.body.user).is.not.null;
    })
  });

  it('should show a error messsage when a user alread exists', () => {
    const errorMessage = 'Email already exists';
    cy.createAcc('Paulo', 'paulo.fernando@luby.software', 'abc1234');
    cy.wait('@registerAccount').then((xhr) => {
      expect(xhr.status).be.eq(400);
      expect(xhr.response.body).has.property('error');
      expect(xhr.response.body.error.message).be.eq(errorMessage);
    });
    cy.get('.Toastify__toast-body > :nth-child(2)')
      .should('have.text', errorMessage);
  })
})