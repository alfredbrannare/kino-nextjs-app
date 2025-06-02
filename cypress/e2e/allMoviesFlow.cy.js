describe('User Flow: All movies with sorting and search filtering (Desktop Version)', () => {
    const searchBar = '[placeholder="Sök filmer..."]';
    const movieCard = 'article.group.relative';
    const dropdown = 'select';
    const movieRatingSelector = 'span[aria-label$="rating"]'; // Consistent naming
    let previousRating = Infinity; // Initialize with a very high value for descending check

    it('navigates to the all movies page, searches, and clears search, and sorts for highest rated', () => {
        // Set the viewport to a common desktop resolution.
        cy.viewport(1280, 720);

        // Ensure we are on the start page.
        cy.visit('http://localhost:3000');

        // Accept cookie for easier visuals in cypress
        cy.contains('button', 'Acceptera').click();

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

        // Add a small wait to ensure the DOM re-renders after sorting
        cy.wait(500);

        // After sorting, verify ratings are in descending order
        cy.get(movieCard).each(($card, index) => {
            const $ratingSpan = $card.find(movieRatingSelector);

            cy.wrap($card).find('h2').invoke('text').then((movieTitle) => {
                if ($ratingSpan.length > 0) {
                    const ariaLabel = $ratingSpan.attr('aria-label');
                    const ratingParts = ariaLabel.split(' out of 10 rating');

                    if (ratingParts.length > 0 && ratingParts[0] !== '') {
                        const currentRating = parseFloat(ratingParts[0]);
                        expect(currentRating).to.be.lte(previousRating);
                        previousRating = currentRating;
                    }
                }
            });
        });
    });
});