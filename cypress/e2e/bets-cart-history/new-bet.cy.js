describe('Make a new bet', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('paulo.fernando@luby.software', 'abc1234');
    cy.wait('@login');
  });

  context('Success cases', () => {
    beforeEach(() => {
      cy.get('[data-cy="completeGame"]').click();
      cy.get('[data-cy="addToCart"]').click();
    });

    it('should be possible to make a random Lotofácil bet', () => {
      cy.get('#addToCartToast').should('exist');
      cy.get('[data-cy="numberCartItens"]').should('exist');
    });

    it('should be possible to make a bet for all existing games', () => {
      cy.get('[data-cy="gameTypes"] > button')
        .each((button) => {
          cy.wrap(button).click();
          cy.get('[data-cy="completeGame"]').click();
          cy.get('[data-cy="addToCart"]').click();
          cy.get('#addToCartToast').should('exist');
        });
    });

    it('should be possible clear a game', () => {
      cy.get('[data-cy="clearGame"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#clearGameToast').should('exist');
    });
  });

  context('Fail cases', () => {
    it('should not be possible to add a incomplete bet to cart', () => {
      cy.get('.sc-dmRaPn > :nth-child(1)').click();
      cy.get('[data-cy="completeGame"]').click();
      cy.get('.sc-dmRaPn > :nth-child(1)').click();
      cy.get('[data-cy="addToCart"]').click();
      cy.get('#addToCartFail').should('exist');
    });
  });

  context('Interface confirmation tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="completeGame"]').click();
    });
    
    it('should show a modal to confirm action when click on clear game button', () => {
      cy.get('[data-cy="clearGame"]').click();
      cy.get('.ReactModal__Content').should('exist');
    });

    it('should show a success message when confirmed to clear game', () => {
      cy.get('[data-cy="clearGame"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#clearGameToast').should('exist');
    });

    it('should show a success message when add a bet in cart', () => {
      cy.get('[data-cy="completeGame"]').click();
      cy.get('[data-cy="addToCart"]').click();
      cy.get('#addToCartToast').should('exist');
    })
  })
})