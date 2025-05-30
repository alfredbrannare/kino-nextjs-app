describe('User Flow: All movies with sorting and search filtering (Desktop Version)', () => {
    const searchBar = '[placeholder="Skriv in filmtitel..."]';
    const movieCard = 'article.group.relative';
    const dropdown = 'select';

    it('navigates to the all movies page, searches, and clears search, and sorts for highest rated', () => {
        // Set the viewport to a common desktop resolution.
        cy.viewport(1280, 720);

        // Ensure we are on the start page.
        cy.visit('http://localhost:3000');

        // Click on 'FILMER' in the navigation.
        cy.get('.navbar-center').contains('a', 'FILMER').click();

        // Ensure we are on the /movies page.
        cy.location('pathname').should('eq', '/movies');

        // Type "Minecraft" into the search field.
        cy.get(searchBar).type('Minecraft');

        // Ensure the Minecraft movie is displayed.
        cy.get(movieCard).should('contain', 'Minecraft');

        // Ensure that only one movieCard is shown.
        cy.get(movieCard).should('have.length', 1);

        // Remove "Minecraft" from the search field.
        cy.get(searchBar).clear();

        // Ensure that more movies are displayed again.
        cy.get(movieCard).should('have.length.above', 1);

        // Select 'Högst betyg' from the dropdown.
        cy.get(dropdown).select('Högst betyg');

        // After sorting, ensure the first movie card contains 'Interstellar'.
        cy.get(movieCard).first().should('contain', 'Interstellar');
    });
});