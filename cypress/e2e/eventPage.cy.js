describe('User Flow: find the right event navigation', () => {
	it('Should navigate from homepage to the Swan Lake event in the "live på bio" tab', () => {
		// 1.visit the homepage
		cy.visit('/');
		cy.url().should('eq', `${Cypress.config().baseUrl}/`);

		// 2. Find the heading "Star Wars Maraton"
		cy.contains('h1', 'Star Wars Maraton').should('be.visible');

		// 3. Click on "Läs mer" related to Star Wars Maraton
		cy.contains('Star Wars Maraton')
			.parentsUntil('section') //
			.find('a')
			.contains('LÄS MER')
			.click();

		// 4. Ensure we are on the event page
		cy.url().should('include', '/events'); //adjust if events?tab=tab2

		// 5. Check that we're on the "Evenemang" tab
		cy.get('[role="tablist"]').within(() => {
			cy.contains('Evenemang').should('have.attr', 'aria-selected', 'true');
		});

		// 6.Click on the "Live på bio" tab
		cy.contains('[role="tab"]', 'Live på Kino').click();

		// 7.Find the heading "Swan Lake"
		cy.contains('h2', 'Swan Lake').should('be.visible');
	});
});
