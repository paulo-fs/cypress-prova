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

    it.only('should be possible to make a bet for each game', () => {

    })

    it('should be possible to delete a bet from the cart', () => {
      cy.get('[data-cy="deleteBet"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#deletBetToast').should('exist');
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


  })
})