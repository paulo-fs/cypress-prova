describe('Testing action flows on bet history page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('paulo.fernando@luby.software', 'abc1234');
    cy.get('.sc-eCYdqJ > a').click();
    cy.server();
    cy.route('**/bet/all-bets?0=**').as('findSearchTerms');
  })

  it('should use each game filter and check if the query match with the game', () => {
    cy.get('[data-cy="betFilters"] > button').within((el) => {
      let counter = 0;
      teste();

      function teste(){
        if(counter < el.length){
          el[counter].click();
          cy.wrap(el[counter]).then(btn => {
            cy.wait('@findSearchTerms').then((xhr) => {
              expect(xhr.url).to.have.string(btn.text());
            })
          }).then(() => {
            el[counter].click();
            counter++;
            teste();
          })
        }
      }

    })
  })
})