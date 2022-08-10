Cypress.Commands.add('login', (email, pass) => {
  cy.get('#email').type(email);
  cy.get('#password').type(pass);
  cy.server();
  cy.route('POST', '**/login').as('login');
  cy.get('.sc-iBkjds').click();
  cy.wait('@login').then((xhr) => {
    Cypress.env('userToken' ,xhr.response.body.token.token)
   });
  cy.interceptors();
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

Cypress.Commands.add('getGamesInfo', () => {
  cy.request({
    method: 'GET',
    url: 'http://127.0.0.1:3333/cart_games',
    Headers: {
      'Accept': 'application/json'
    }
  })
})

Cypress.Commands.add('createRandomBet', () => {
  cy.get('[data-cy="gameTypes"] > button')
    .each((button, i, arr) => {
      const amountBtn = arr.length;
      const randomNumber = Math.round(Math.random() * amountBtn);
      if(randomNumber === i){
        cy.wrap(button).click();
        cy.get('[data-cy="completeGame"]').click();
        cy.get('[data-cy="addToCart"]').click();
      }
    });
})

Cypress.Commands.add('fillCart', () => {
  cy.getGamesInfo().then(response => {
    Cypress.env('minCartValue' ,response.body.min_cart_value);
  });
  cy.createRandomBet();
  cy.get('[data-cy="totalCart"]').then(total => {
    const cartTotal = parseFloat(total.text().replace(',', '.'));
    if(cartTotal < Cypress.env('minCartValue')){
      cy.fillCart();
    }
  })
})

Cypress.Commands.add('interceptors', () => {
  cy.intercept('POST', '**/bet/new-bet', (req) => {
    req.headers.Authorization = 'Bearer ' + Cypress.env('userToken');
    req.continue();
  })

  cy.intercept('GET', '**/bet/all-bets', (req) => {
    req.headers.Authorization = 'Bearer ' + Cypress.env('userToken');
    req.continue();
  })
})