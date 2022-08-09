describe('Create a new account', () => {
  before(() => {
    cy.visit('/');
    cy.get('.sc-ftvSup').click();
  })

  it('should be possible to create a new account', () => {
    const randownUser = String(new Date().getTime());
    cy.get('#name').click().type(randownUser);
    cy.get('#email').click().type(`${randownUser}@mail.com`);
    cy.get('#password').click().type('123456');

    cy.server();
    cy.route('POST', '**/user/create').as('registerAccount');

    cy.get('.sc-iBkjds').click();
    cy.wait('@registerAccount').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('user');
      expect(xhr.response.body.user).is.not.null;
    })
  });

  
})