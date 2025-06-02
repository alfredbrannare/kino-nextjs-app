describe('Tickets Page: Display movies and screenings', () => {
  const testMovies = [
    {
      _id: 'movie1',
      title: 'Testfilm 1',
      runtime: 120,
      genres: 'Action',
      description: 'En spännande testfilm.',
      image: '/testfilm.jpg',
      screenings: [
        {
          _id: 'screening1',
          startTime: new Date().toISOString(),
          bookedCount: 30,
          availableSeats: 70,
          auditorium: {
            name: 'Salong 1',
            slug: 'salong-1',
          },
        },
      ],
    },
    {
      _id: 'movie2',
      title: 'Testfilm 2',
      runtime: null,
      genres: null,
      description: 'Ingen visning för denna film.',
      image: '/testfilm2.jpg',
      screenings: [],
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/movies-with-screenings', {
      statusCode: 200,
      body: testMovies,
    }).as('moviesRequest');
  });

  it('Displays movies and screenings correctly', () => {
    cy.visit('/tickets');
    cy.wait('@moviesRequest');

    // The text "Biljetter" should show
    cy.contains('Biljetter').should('be.visible');

    // Movie 1 shows and its screening(s)
    cy.contains('Testfilm 1').should('exist');
    cy.contains('Längd: 120 minuter').should('exist');
    cy.contains('Genre: Action').should('exist');
    cy.contains('En spännande testfilm.').should('exist');
    cy.contains('Salong 1').should('exist');

    // Movie 2 shows but without screenings
    cy.contains('Testfilm 2').should('exist');
    cy.contains('Längd: Ej specificerad minuter').should('exist');
    cy.contains('Genre: Ej specificerad').should('exist');
    cy.contains('Ingen visning för denna film.').should('exist');
    cy.contains('Inga visningar för tillfället.').should('exist');
  });

  it('Shows error message on failed fetch', () => {
    cy.intercept('GET', '/api/movies-with-screenings', {
      statusCode: 500,
    }).as('moviesRequestFail');

    cy.visit('/tickets');
    cy.wait('@moviesRequestFail');

    cy.contains('Vi har förtillfället problem att hämta alla biljetter').should('be.visible');
  });
});