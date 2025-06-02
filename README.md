## Motivation for choosing Tailwind CSS and DaisyUI

- In the development of our project, we chose to use Tailwind Css in combination
  with DaisyUI as our UI framework. This decision is based on:

- Fast and flexible development Tailwind allows for rapid and responsive design.
  It removes the need to write traditional CSS, speeding up the development
  process and simplifying code maintenance.

- Consistent design with less code Tailwind enables a consistent design system
  using utility classes. This allows us to create intuitive reusable and easy to
  modifiable UI components without reinventing styles for each element.

- DaisyUI - DaisyUI has a component-based UI kit, it is a plugin for Tailwind
  that provides pre-designed, clean and accessible UI components such as
  buttons, modals, cards, tables and more, fully compatible with Tailwind’s
  utility classes and are easy to customize.

- Active community support - Both Tailwind CSS and DaisyUI have large, active
  communities and strong documentation. This made it easier for us to onboard
  and find solutions and best practices

## Screenings API

### GET the 5 Nearest Upcoming Screenings

- **URL**: `/api/screenings/currently-showing`
- **Method**: `GET`
- **Description**: Returns the 5 upcoming screenings starting from the current
  time, sorted chronologically. Each screening is unique per movie and only
  includes films currently shown in cinemas.
- **Response**: JSON array of screening objects with embedded movie data.
- **Example Response**:

  ```
  [
  {
    "_id": "681b3a67ff63d5f81fc289c0",
    "title": "Guardians of the Galaxy Vol. 3",
    "description": "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own...",
    "year": 2023,
    "image": "https://m.media-amazon.com/images/M/MV5BOTJhOTMxMmItZmE0Ny00MDc3LWEzOGEtOGFkMzY4MWYyZDQ0XkEyXkFqcGc@._V1_SX300.jpg",
    "rating": 7.9,
    "inCinemas": true,
    "movieId": "681b3a14a20707b6cf797187",
    "auditoriumId": "68164b2ef469735514b5f89a",
    "startTime": "2025-05-08T00:00:00.000Z"
  },
  {
    "_id": "681b3a85ff63d5f81fc289c5",
    "title": "Fight Club",
    "description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "year": 1999,
    "image": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg",
    "rating": 8.8,
    "inCinemas": true,
    "movieId": "681b3a4ba20707b6cf797191",
    "auditoriumId": "68164b2ef469735514b5f89a",
    "startTime": "2025-05-08T00:00:00.000Z"
  }
  ]
  ```

  ### GET the 5 Nearest Upcoming Screenings

- **URL**: `/api/screenings/upcoming-movies`
- **Method**: `GET`
- **Description**: Returns the 5 upcoming movies starting from the current date,
  sorted by release date. Each movie is unique and only includes movies that has
  not been released yet.
- **Response**: JSON array of screening objects with embedded movie data.
- **Example Response**:

  ```
  [
  {
  description: "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family."
  image: "https://image.tmdb.org/t/p/original//3bN675X0K2E5QiAZVChzB5wq90B.jpg"
  inCinemas: true
  rating: "0"
  title: "Lilo & Stitch"
  trailerKey: "VWqJifMMgZE"
  year: "2025-05-21"
  __v: 0
  _id: "681f096a03071d53657a5f47"
  },
  ]
  ```

### Screening Validation API

#### POST `/api/screenings/validate`

**Method:** `POST`  
**Description:** Validates whether a screening exists based on a combination of `movieId`, `auditorium` (slug), and `screeningTime`.  
Used to prevent invalid navigation to nonexistent screenings (e.g. via manipulated URLs).

**Request Body:**


```json
{
  "movieId": "681b3a14a20707b6cf797187",
  "screeningTime": "2025-05-28T14:00:00.000Z",
  "auditorium": "city"
}
```


**Response:**
Returns a JSON object indicating whether a valid screening exists.


```json
{ "isValid": true }
```


**Error Responses:**
- `400 Bad Request`: If any required field is missing or malformed
- `200 OK` with `"isValid": false`: If no matching screening was found

**Use Case:**
This endpoint is called by the frontend before displaying the seat selector for a screening. If `isValid` is `false`, the frontend displays an error.

## Review API

### POST a New Review

- **URL**: `/api/reviews`
- **Method**: `POST`
- **Description**: Saves a new review for a specific movie. All fields are
  required.
- **Request
  Body(JSON)**:` {   "movieId": "681b3a14a20707b6cf797187",   "rating": 4,   "text": "Great movie, very entertaining!",   "user": "Jane Doe" }`
- **Response**: Returns the saved review document.
- **Example Response**:

```
{
  "success": true,
  "review": {
    "_id": "681b4c5ae98f5cd9e6d6d891",
    "movieId": "681b3a14a20707b6cf797187",
    "rating": 4,
    "text": "Great movie, very entertaining!",
    "userName": "Jane Doe",
    "__v": 0
  }
}
```

### GET Reviews for a Movie

- **URL**: `/api/reviews?movieId=[id]`
- **Method**: `GET`
- **Description**: Fetches all reviews for the specified movie.
- **Query Parameters**:movieId (required): The ID of the movie you want reviews
  for.
- **Response**: JSON array of review objects
- **Example Response**:

## Users API

### POST Login User

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Description: Authenticates a user with email and password.
  Returns a token in an httpOnly cookie if credentials are valid. All fields are
  required.

### POST Logout User

- **URL**: `/api/logout`
- **Method**: `POST`
- **Description**: Description: Logs the user out by removing the httpOnly token
  cookie.

### GET Current User Info and Role Update

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user with name, email, and password.
  Validates input, hashes password, stores the user, sets a login token via
  HTTP-only cookie.

### GET Current User Info and Role Update

- **URL**: `/api/user/me`
- **Method**: `GET`
- **Description**: Authenticates the user, checks their points, updates their
  role (silver, guld, kinoguru), and returns their user info with the new role.

```


{
  "success": true,
  "reviews": [
    {
      "_id": "681b4c5ae98f5cd9e6d6d891",
      "movieId": "681b3a14a20707b6cf797187",
      "rating": 4,
      "text": "Great movie, very entertaining!",
      "userName": "Jane Doe",
      "__v": 0
    },
    {
      "_id": "681b4c7de98f5cd9e6d6d892",
      "movieId": "681b3a14a20707b6cf797187",
      "rating": 2,
      "text": "Not my taste, too slow.",
      "userName": "John Smith",
      "__v": 0
    }
  ]
}
```

## Events API

### GET an Event by ID

- **URL**: `/api/events/[id]`
- **Method**: `GET`
- **Description**: Retrieves a single event by its ID.
- **Response**: JSON object representing the event.
- **Example Response**: { "\_id": "60e5b7f9b8a1c72d6c9f1234", "title": "Movie
  Premiere Night", "time": "19:00", "date": "2025-06-10", "image":
  "https://example.com/event-image.jpg", "description": "Join us for the
  premiere of the latest blockbuster!", "\_\_v": 0 }

### DELETE an Event by ID (Admin only)

- **URL**: `/api/events/[id]`
- **Method**: `DELETE`
- **Description**: Deletes an event by its ID. Requires user to be authenticated
  and have admin role.
- **Response**: JSON object representing the event.
- **Example Response**: { "message": "Event deleted successfully" }

### PUT Update an Event by ID (Admin only)

- **URL**: `/api/events/[id]`
- **Method**: `PUT`
- **Description**: Updates an existing event by ID. Requires admin
  authentication.
- **Request Body**: { "title": "Updated Event Title", "time": "20:00", "date":
  "2025-06-11", "image": "https://example.com/updated-event-image.jpg",
  "description": "Updated description of the event." }
- **Response**: { "\_id": "60e5b7f9b8a1c72d6c9f1234", "title": "Updated Event
  Title", "time": "20:00", "date": "2025-06-11", "image":
  "https://example.com/updated-event-image.jpg", "description": "Updated
  description of the event.", "\_\_v": 0 }

## Offers API

### GET all offers

- **URL**: `/api/offers`
- **Method**: `GET`
- **Description**: Retrieves all offers.
- **Response**: JSON object containing an array of offer objects.
- **Example Response**: { "offers": [ { "_id": "60f6b8a9e47e8c3f8c5a5a8d",
  "text": "20% off on all tickets this weekend!", "__v": 0 }, { "_id":
  "60f6b8bae47e8c3f8c5a5a8e", "text": "Buy one get one free on popcorn.", "__v":
  0 } ] }

### POST Create a New Offer (Admin only)

- **URL**: `/api/offers`
- **Method**: `POST`
- **Description**: Creates a new offer. Only accessible by authenticated admin
  users.
- **Request Body (JSON)**: { "offer": "Free drink with every ticket purchase!" }
- **Example Response**: { "\_id": "60f6b9b5e47e8c3f8c5a5a8f", "text": "Free
  drink with every ticket purchase!", "\_\_v": 0 }

### DELETE an Offer by ID (Admin only)

- **URL**: `/api/offers/[id]`
- **Method**: `DELETE`
- **Description**: Deletes an offer by its ID. Requires authenticated admin
  user.
- **Response**: { "success": true }

## Profile Picture API

### POST Upload Profile Picture

- **URL**: `/api/upload-profile`
- **Method**: `POST`
- **Auth**: Required (User)
- **Description**: Uploads or updates a user's profile picture to Cloudinary and
  stores the image URL in the database.
- **Request Type**: multipart/form-data
- **Form Data Parameters**: file: Image file to upload.
- **Response**: { "profilePicture":
  "https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/profile_pics/user_123.jpg"
  }

### DELETE Remove Profile Picture

- **URL**: `/api/remove-profile`
- **Method**: `DELETE`
- **Auth**: Required (User)
- **Description**: Deletes the user's profile picture from Cloudinary and
  removes the URL from the user record in the database.
- **Response**: { "message": "Profile image removed." }

```

## Get Movies with Upcoming Screenings API
### GET Movies

- **URL**: `/api/movies-with-screenings`
- **Method**: `GET`
- **Description**: Fetches all movies and their screenings.
- **Response**: JSON array of movie objects
- **Example Response**:
[
  {
    "_id": "movieId",
    "title": "Movie Title",
    "description": "Movie description",
    "rating": 8.7,
    "image": "/image.jpg",
    ...
    "screenings": [
      {
        "_id": "screeningId",
        "startTime": "2025-05-28T18:30:00.000Z",
        "auditorium": "Salong 1",
        "availableSeats": 64,
        "bookedCount": 36
      },
      ...
    ]
  },
  ...
]

```

## Live Events API

### GET an Event by ID

- **URL**: `/api/events/live/[id]`
- **Method**: `GET`
- **Description**: Retrieves a single live event by its ID.
- **Response**: JSON object representing the event.
- **Example Response**:

```

{
"\_id": "682c408c51ae0f3436daaabe",
"title": "Fidelio",
"time": "19:00",
"date": "2025-06-10",
"image": "https://example.com/event-image.jpg",
"description": "Fidelio, Beethovens enda opera och hans storslagna hyllning till kärleken.",
"genre": "Opera",
"runtime": 123,
}

```

### DELETE an Event by ID (Admin only)

- **URL**: `/api/events/live/[id]`
- **Method**: `DELETE`
- **Description**: Deletes a live event by its ID. Requires user to be
  authenticated and have admin role.
- **Response**: JSON object representing the event.
- **Example Response**:

```

{
"message": "Live event deleted successfully"
}

```

### PUT Update an Event by ID (Admin only)

- **URL**: `/api/events/live/[id]`
- **Method**: `PUT`
- **Description**: Updates an existing live event by ID. Requires admin
  authentication.
- **Request Body**:

```

{
"title": "Updated Event Title",
"time": "20:00",
"date": "2025-06-11",
"image": "https://example.com/updated-event-image.jpg",
"description": "Updated description of the live event.",
"genre": "Updated genre of the live event",
"runtime": 123
}

```

- **Response**:

```

{
"message": "Event \"Updated Event Title\" was successfully updated!",
"event": {
"\_id": "60e5b7f9b8a1c72d6c9f1234",
"title": "Updated Event Title",
"time": "20:00",
"date": "2025-06-11",
"image": "https://example.com/updated-event-image.jpg",
"description": "Updated description of the live event.",
"genre": "Updated genre of the live event",
"runtime": 123,
"inCinemas": false,
"\_\_v": 0
}
}

```

### Instructions for Using the Auth Context

Import the useAuth Hook First, import the useAuth hook in your component:

    import { useAuth } from "src/components/user/AuthData";

Destructure Auth Data Then, use the useAuth hook to get the user data,
authentication status, loading state, and other necessary values:

    const { userData, isLoggedIn, isLoading, logout, login, isAdmin, token } = useAuth();

Now, you can use these values throughout your component as needed!

### Example: Protecting Pages for Logged-in Users

If you want to protect specific pages so that only logged-in users can access
them, you can implement a simple check using the useAuth hook and useEffect:

    import { useAuth } from "src/components/user/AuthData";
    import { useRouter } from "next/navigation";
    import { useEffect } from "react";

    const { userData, isLoggedIn, isLoading, logout, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isLoggedIn) {
       router.push("/"); // Redirect to the home page if the user is not logged in
      }
    }, [isLoggedIn, isLoading, router]);

    if (isLoading) return <p>Loading page data...</p>;
    if (!isLoggedIn) return <p>Access Denied. You are not authorized to view this page.</p>;

### Example: Backend Token Validation

On the backend, you can check the user's token to validate their authentication.
Here's how you might check the token:

    import { checkAuth } from "src/lib/auth";
    import { NextResponse } from "next/server"; // Import NextResponse

    const authenticatedUser = await checkAuth(req);
       if (!authenticatedUser) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
       }

      // Optionally, check if the user is an admin
     const isAdmin = authenticatedUser.role.includes('admin');
       if (!isAdmin) {
        return NextResponse.json(
         { message: "You don't have the right to use this feature!" },
         { status: 403 }
        );
      }

### Example: Hiding Components Based on Login Status

You can also conditionally render components based on whether the user is logged
in. Here's an example of how to hide or show content depending on the login
status:

    const { isLoggedIn, isLoading } = useAuth();
    {!isLoggedIn ? (
      <p>Show this data to non-logged-in users</p>
       ) : (
      <p>Hide this data for logged-in users</p>
     )}

## Auditoriums API

### Overview
Auditoriums represent the different cinema halls available for movie screenings.

Each auditorium has a unique `slug` and a complete seat layout, including any wheelchair-accessible seats.

Each seat may optionally include the boolean field `"isWheelchair": true` to indicate accessibility. These seats are visually distinguished with a blue square/seat in the frontend.

This information is used for rendering the seat selector and validating bookings.

Auditoriums are stored as documents in the MongoDB database and can be added manually.

### GET `/api/auditoriums/[slug]`

**Method:** `GET`

**Description:** Fetches auditorium data including seat layout based on the given slug.
Used by the booking system to render available seats in the correct layout.

**URL Parameters:**

- `slug` (required): The unique identifier for the auditorium (e.g. `city`,
  `grand`)

**Example Auditorium Documents:**

```json
{
  "name": "Uppsala City",
  "capacity": 58,
  "seats": [
    { "row": 1, "seat": 1 },
    { "row": 1, "seat": 2 },
    { "row": 1, "seat": 3 },
    ...
    { "row": 8, "seat": 10, "isWheelchair": true }
  ],
  "slug": "city"
}


```
```json
{
  "name": "Salong Grand",
  "slug": "grand",
  "capacity": 120,
  "seats": [
    { "row": 1, "seat": 1 },
    { "row": 1, "seat": 2 },
    ...
    { "row": 12, "seat": 10, "isWheelchair": true }
  ]
}

```

---

## Booking API

### GET `/api/bookings`

**Method:** `GET`  
**Description:** Fetches all booked seats for a specific screening of a movie in
a given auditorium.

**Query Parameters:**

- `movieId` (required): The ID of the movie
- `screeningTime` (required): The start time of the screening (ISO format)
- `auditorium` (required): The slug of the auditorium (e.g. `city`)

**Example Request:**

```
/api/bookings?movieId=abc123&screeningTime=2025-05-28T14:00:00.000Z&auditorium=city
```

**Response:**

```json
[
  { "row": 1, "seat": 5, "type": "ordinary" },
  { "row": 1, "seat": 6, "type": "ordinary" },
  { "row": 1, "seat": 7, "type": "child" },
  { "row": 2, "seat": 7, "type": "member" },
  { "row": 4, "seat": 4, "type": "student" },
  { "row": 4, "seat": 5, "type": "student" },
  { "row": 9, "seat": 1, "type": "retired" }
]
```

---

### POST `/api/bookings`

**Method:** `POST`  
**Description:** Creates a booking for a specific movie screening. If the
booking includes member tickets, the user must be logged in. The backend
automatically links the booking to the authenticated user (if any) and updates
the related screening.

**Request Body:**

```json
{
  "movieId": "681b3a14a20707b6cf797187",
  "screeningTime": "2025-05-28T14:00:00.000Z",
  "auditorium": "city",
  "seats": [
    { "row": 1, "seat": 7 },
    { "row": 1, "seat": 8 }
  ],
  "ticketInfo": {
    "ordinary": 0,
    "child": 0,
    "retired": 0,
    "student": 0,
    "member": 2
  }
}
```

**Response:**

```json
{
  "booking": {
    "_id": "681f2d47e17e8fa94212a123",
    "movieId": "681b3a14a20707b6cf797187",
    "screeningTime": "2025-05-28T14:00:00.000Z",
    "auditorium": "city",
    "seats": [
      { "row": 1, "seat": 7, "type": "member" },
      { "row": 1, "seat": 8, "type": "member" }
    ],
    "userId": "681a25fc1b75d872c0c502ab",
    "totalPrice": 210,
    "__v": 0
  },
  "movieTitle": "Lilo & Stitch"
}
```

**Error Responses:**

- `400 Bad Request`: If any required field is missing
- `403 Forbidden`: If member tickets are selected but the user is not logged in
- `409 Conflict`: If one or more seats are already booked

---

### Example: Booking as a Logged-In Member

**Scenario:**  
A logged-in user opens a screening and selects _Medlem_ tickets. All other
ticket types are hidden.  
When submitting the booking, the request is automatically linked to the
authenticated user.

#### Requirements

- The user must be logged in via the `<Login />` component
- `useAuth()` provides access to the user's `isLoggedIn` and `userData`
- The booking request must include at least one member ticket

#### Booking Flow

1. User selects **only** member tickets in `TicketSelector.jsx`
2. All other ticket types are automatically set to `0` on login
3. On submit, the frontend sends a `POST /api/bookings` with
   `ticketInfo.member > 0`
4. The backend:
   - Extracts the `userId` via JWT with `checkAuth()`
   - Rejects the request if the user is not logged in
   - Saves the booking and links it to the authenticated user
   - Adds the booking ID to the correct `Screening` via `$push`

#### Example Payload (simplified):

```json
{
  "movieId": "...",
  "screeningTime": "...",
  "auditorium": "city",
  "seats": [{ "row": 1, "seat": 4 }],
  "ticketInfo": {
    "ordinary": 0,
    "child": 0,
    "retired": 0,
    "student": 0,
    "member": 1
  }
}
```

---

### Booking → Screening Mapping (Server-side)

When a booking is made, the backend also:

- Converts the provided `auditorium` slug into an `_id` using the `Auditorium`
  model
- Finds the matching `Screening` document using `movieId`, `startTime`, and
  `auditoriumId`
- Pushes the new booking’s `_id` into the screening’s `bookedSeats` array:

```js
Screening.findOneAndUpdate(
  {
    movieId,
    startTime: new Date(screeningTime),
    auditoriumId: auditoriumDoc._id,
  },
  {
    $push: { bookedSeats: booking._id },
  },
);
```

This ensures that:

- Booked seats are correctly linked to their screening
- Future requests can show which seats are taken for each showtime

---

## Teststrategies

To run the following tests:

1. Ensure the app is running locally at `http://localhost:3000` using
   `npm run dev`.
2. Open the Cypress Test Runner with `npm run cypress:open`.
3. Select specific file and run

### Cypress E2E Test: Movie Management (`allMoviesFlow.cy.js`)

This Cypress E2E test validates the user flow for movie filtering and sorting.
The test performs the following:

- Navigates to the 'FILMER' page.
- Searches for 'Minecraft' and confirms the movie is displayed.
- Clears the search field and ensures all movies are displayed again.
- Sorts the movies by 'Högst betyg' and confirms 'Interstellar' is displayed
  first.

### Cypress E2E test: Event flow (`eventPage.cy.js`)

this Cypress test validates the user flow for the event page and performs the
following

- Navigating from the homepage to the "Star Wars Maraton" event.
- Clicking the "LÄS MER" link.
- Ensuring the user is routed to the /events page.
- Verifying the correct default tab ("Evenemang") is active.
- Switching to the "Live på Kino" tab.
- Ensuring the "Swan Lake" heading is visible on that tab.

### Cypress E2E Test: Home Page (`home.cy.js`)

This Cypress E2E test validates the core content visibility and navigation on the Kino homepage.
The test performs the following:

- Visits the home page (/).
- Confirms that key sections are rendered: VISAS JUST NU, KOMMANDE FILMER and LIVE PÅ KINO.
- Clicks the "SE ALLA FILMER" button and verifies redirection to the /movies page.

### Cypress E2E Test: Login (`loginFlow.cy.js`)

This Cypress E2E test verifies the login and logout flow for a user.
The test performs the following:

- Mocks the unauthenticated state (GET /api/user/me returns 401).
- Logs in using test credentials (POST /api/user/login).
- Mocks the authenticated user response after login.
- Verifies redirection to the Medlemssida and confirms:
- The username is displayed.
- The text "Dina Biljetter" is visible.
- Logs the user out (POST /api/user/logout).
- Confirms redirection to the home page (/) and checks that "KOMMANDE FILMER" is visible.

### Cypress E2E Test: Tickets Page (ticketPage.cy.js)

This Cypress E2E test verifies the behavior of the Tickets page when displaying movies and their screenings.
The test performs the following:

- Mocks a successful API response with two test movies. One with a screening and one without any screenings.
- Visits the /tickets page and confirms: (1) The page title "Biljetter" is visible. (2) Movie details (title, runtime, genre, description) are correctly displayed. (3) Screenings are shown for movies that have them. (4) A fallback message is shown for movies without screenings.
- Mocks a failed API response (500) and confirms that an error message is displayed to the user.

### API Unit/Integration Tests (Jest)

These tests cover the API route handlers. To run the following tests:

1. In the project root, start the MongoDB service: `docker-compose up -d mongo`.
2. Run Tests: `npm run test`
3. Stop mongoDB server: `docker stop mongo_kino_test`


### A Deployment:

- The short backstory:
A long time ago in our first courses when We still didn’t understand what Express was, we came across Render.com and created a small API route where we got our first response in JSON.

- Nowadays:
The service is basically a website connected to GitHub that provides users with a free slice of server time which shuts down after 15 minutes of inactivity.
Render service itself is very flexible and easy to scale.
From the very beginning we deployed the site to production so we could monitor it during development and ensure it worked without errors — and it did that perfectly!
After every commit it automatically detects that the site needs to be rebuilt and runs npm run build, run and install. It also provides a convenient and secure environment for environment variables.
It might be a bit pricey but our database is hosted on MongoDB Atlas and so far that has been enough for us.

>>>>>>> b666d0b91d091bc7bb0a2b0774398e776a6c3785
