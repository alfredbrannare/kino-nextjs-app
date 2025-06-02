describe('Booking flow with real screening and mocked backend', () => {
    const movieId = '683c4c2d778a4d61786d10b2';
    const screeningTime = '2040-01-01T11:00:00.000Z';
    const auditorium = 'city';
  
    beforeEach(() => {
      // Mock: no booked seats
      cy.intercept(
        'GET',
        `/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}&auditorium=${auditorium}`,
        {
          statusCode: 200,
          body: [],
        }
      ).as('getBookedSeats');
  
      // Mock: book seats
      cy.intercept('POST', '/api/bookings', {
        statusCode: 201,
        body: {
          booking: { totalPrice: 280 },
          movieTitle: 'Testfilm',
        },
      }).as('postBooking');
    });
  
    it('should complete booking flow without saving to database', () => {
       // Set the viewport to a common desktop resolution.
      cy.viewport(1280, 1000);
      cy.visit(
        `/auditoriums/${auditorium}?movieId=${movieId}&screeningTime=${encodeURIComponent(
          screeningTime
        )}&auditorium=${auditorium}`
      );
  
      // Select two more ordinary tickets (two are preselected)
      cy.contains('Ordinarie')
        .parents('[class*="rounded"]')
        .within(() => {
          cy.get('button').contains('+').click().click();
        });
  
      // Wait for booked seats
      cy.wait('@getBookedSeats');
  
      // Select four seats
      cy.get('button[aria-label*="stol"]')
        .not('[disabled]')
        .eq(0)
        .click();
      cy.get('button[aria-label*="stol"]')
        .not('[disabled]')
        .eq(1)
        .click();
      cy.get('button[aria-label*="stol"]')
        .not('[disabled]')
        .eq(2)
        .click();
      cy.get('button[aria-label*="stol"]')
        .not('[disabled]')
        .eq(3)
        .click();

        // Correct number of seats selected
        cy.get('button[aria-label*="vald"]').should('have.length', 4);

      // Click on Book-button
      cy.contains('Boka platser').click();
  
      // BookingConfirmationModal
      cy.wait('@postBooking').then(() => {
        cy.contains('Bokning bekräftad!').should('exist');
        cy.contains('Testfilm').should('exist');
        cy.contains('Totalt pris: 280 kr').should('exist');
      });
      
    });
  });
  