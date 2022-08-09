// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, pass) => {
  cy.get('#email').type(email);
  cy.get('#password').type(pass);

  cy.server();
  cy.route('POST', '**/login').as('login');
  cy.get('.sc-iBkjds').click();
});

Cypress.Commands.add('createAcc', (userName, email, pass) => {
  cy.get('#name').click().type(randownUser);
  cy.get('#email').click().type(`${randownUser}@mail.com`);
  cy.get('#password').click().type('123456');

  cy.server();
  cy.route('POST', '**/user/create').as('registerAccount');

  cy.get('.sc-iBkjds').click();
})