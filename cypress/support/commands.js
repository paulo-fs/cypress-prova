Cypress.Commands.add('login', (email, pass) => {
  cy.get('#email').type(email);
  cy.get('#password').type(pass);
  cy.server();
  cy.route('POST', '**/login').as('login');
  cy.get('.sc-iBkjds').click();
});

Cypress.Commands.add('createAcc', (userName, email, pass) => {
  cy.get('#name').click().type(userName);
  cy.get('#email').click().type(email);
  cy.get('#password').click().type(pass);
  cy.server();
  cy.route('POST', '**/user/create').as('registerAccount');
  cy.get('.sc-iBkjds').click();
});

Cypress.Commands.add('resetPass', (email) => {
  cy.get('#email').click().type(email);
  cy.server();
  cy.route('POST', '**/reset').as('resetPassword');
  cy.get('.sc-iBkjds').click();
});

Cypress.Commands.add('changePass', (pass) => {
  cy.get('#password').click().type(pass);
  cy.server();
  cy.route('POST', `**/reset/**`).as('changePassword');
  cy.get('.sc-iBkjds').click();
})