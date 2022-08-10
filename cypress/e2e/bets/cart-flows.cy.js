describe('Testint actions on cart', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('paulo.fernando@luby.software', 'abc1234');
  });

  context('Adding/removing item to/from cart', () => {
    beforeEach(() => {
      cy.get('[data-cy="completeGame"]').click();
      cy.get('[data-cy="addToCart"]').click();
    });

    it('should show a status when there is an item in the cart', () => {
      cy.get('[data-cy="numberCartItens"]').should('exist');
    });

    it('should the TOTAL be diferent then zero when adds a item in the cart', () => {
      cy.get('p > span').should((span) => {
        const content = span.text();
        expect(content).be.not.eq(' Total: R$0,00')
      })
    });

    it('should be possible to delete a bet from the cart', () => {
      cy.get('[data-cy="deleteBet"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#deletBetToast').should('exist');
    });

    it('should show a modal to confirm when removing a item from cart', () => {
      cy.get('[data-cy="deleteBet"]').click();
      cy.get('.ReactModal__Content').should('exist');
    });

    it('should show a success message when a item was deleted from cart', () => {
      cy.get('[data-cy="deleteBet"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#deletBetToast').should('exist');
    })
  });

  context('Saving cart', () => {
    it('should show a error message when saving a cart with a value above the min cart value', () => {
      cy.get('[data-cy="gameTypes"] > button')
      .each((button) => {
        cy.wrap(button).click();
        cy.get('[data-cy="completeGame"]').click();
        cy.get('[data-cy="addToCart"]').click();
        cy.get('#addToCartToast').should('exist');
      });
      cy.get('[data-cy="saveCart"]').click();
      cy.get('#saveCartError').should('exist');
    });

    it('should be possible save the cart', () => {
      cy.fillCart();
      cy.get('[data-cy="saveCart"]').click();
      cy.get('[data-cy="confirm"]').click();
      cy.get('#saveBetToast').should('exist');
    });
  })
})