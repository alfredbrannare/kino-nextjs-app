describe('Kino Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the main sections', () => {
    cy.contains('VISAS JUST NU').should('be.visible');
    cy.contains('KOMMANDE FILMER').should('be.visible');
    cy.contains('LIVE PÅ KINO').should('be.visible');
  });

  it('navigates to /movies when clicking "SE ALLA FILMER"', () => {
    cy.contains('SE ALLA FILMER').click();
    cy.url().should('include', '/movies');
  });
});