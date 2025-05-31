describe('User Flow: Log in and log out', () => {
    const användarnamn = 'testanvändare';
    const lösenord = 'lösen123';

    it('Should log in and log out', () => {
        cy.intercept('GET', '/api/user/me', {
            statusCode: 401,
            body: { message: 'Not logged in' },
        }).as('userRequestBeforeLogin');

        cy.intercept('POST', '/api/user/login', {
            statusCode: 200,
            body: {
                user: {
                    name: användarnamn,
                    role: ['user'],
                    id: 1,
                },
            },
        }).as('loginRequest');

        cy.intercept('GET', '/api/user/me', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    user: {
                        name: användarnamn,
                        role: ['user'],
                        id: 1,
                    },
                },
            });
        }).as('userRequestAfterLogin');

        cy.intercept('POST', '/api/user/logout', {
            statusCode: 200,
            body: { message: 'Logged out' },
        }).as('logoutRequest');

        // 1. Make sure we are on the start page
        cy.visit('/');
        cy.contains('VISAS JUST NU').should('exist');

        // 2. Click "testanvändare"
        cy.contains('testanvändare', { timeout: 10000 }).click();

        // 3. Make sure to be on the membership page and that the username shows
        cy.url().should('include', '/membership');
        cy.contains(användarnamn).should('be.visible');

        // 4. Make sure the text "Dina Biljetter" exists
        cy.contains('Dina Biljetter').should('exist');

        // 5. Log out
        cy.get('[data-testid="logout-icon"]').click();
        cy.wait('@logoutRequest');

        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('KOMMANDE FILMER').should('exist');
    });
});