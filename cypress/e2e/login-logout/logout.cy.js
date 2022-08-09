describe('Logout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show a modal to confirm logout', () => {
    cy.login('paulo.fernando@luby.software', 'abc1234');
    cy.get('.sc-eCYdqJ > div > :nth-child(2)')
      .should('exist');
  });

  it('should be possible logout', () => {
    cy.login('paulo.fernando@luby.software', 'abc1234');
    cy.get('.sc-eCYdqJ > div > :nth-child(2)').click();
    cy.get('.sc-jIZahH').click();
    });
})