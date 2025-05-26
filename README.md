docker run -v C:\Users\user\kino-nextjs-app\data\mongo:/data/db -p 27017:27017 mongo
OMDB=5cd99ae7
MONGO_URI=mongodb://localhost:27017

## remember to add ip to mongo atlas

## Screenings API

### GET the 5 Nearest Upcoming Screenings

- **URL**: `/api/screenings/currently-showing`
- **Method**: `GET`
- **Description**: Returns the 5 upcoming screenings starting from the current time, sorted chronologically. Each screening is unique per movie and only includes films currently shown in cinemas.
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
- **Description**: Returns the 5 upcoming movies starting from the current date, sorted by release date. Each movie is unique and only includes movies that has not been released yet.
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

## Review API

### POST a New Review

- **URL**: `/api/reviews`
- **Method**: `POST`
- **Description**: Saves a new review for a specific movie. All fields are required.
- **Request Body(JSON)**:`
{
  "movieId": "681b3a14a20707b6cf797187",
  "rating": 4,
  "text": "Great movie, very entertaining!",
  "user": "Jane Doe"
}`
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
- **Query Parameters**:movieId (required): The ID of the movie you want reviews for.
- **Response**: JSON array of review objects
- **Example Response**:

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
- **Example Response**:
{ 
  "_id": "60e5b7f9b8a1c72d6c9f1234",
  "title": "Movie Premiere Night",
  "time": "19:00",
  "date": "2025-06-10",
  "image": "https://example.com/event-image.jpg",
  "description": "Join us for the premiere of the latest blockbuster!",
  "__v": 0
} 

### DELETE an Event by ID (Admin only)

- **URL**: `/api/events/[id]`
- **Method**: `DELETE`
- **Description**:  Deletes an event by its ID. Requires user to be authenticated and have admin role.
- **Response**: JSON object representing the event.
- **Example Response**:
{
  "message": "Event deleted successfully"
}

### PUT Update an Event by ID (Admin only)

- **URL**: `/api/events/[id]`
- **Method**: `PUT`
- **Description**: Updates an existing event by ID. Requires admin authentication.
- **Request Body**:
{
  "title": "Updated Event Title",
  "time": "20:00",
  "date": "2025-06-11",
  "image": "https://example.com/updated-event-image.jpg",
  "description": "Updated description of the event."
}
- **Response**:
{
  "_id": "60e5b7f9b8a1c72d6c9f1234",
  "title": "Updated Event Title",
  "time": "20:00",
  "date": "2025-06-11",
  "image": "https://example.com/updated-event-image.jpg",
  "description": "Updated description of the event.",
  "__v": 0
}

## Offers API

### GET all offers

- **URL**: `/api/offers`
- **Method**: `GET`
- **Description**: Retrieves all offers.
- **Response**: JSON object containing an array of offer objects.
- **Example Response**: 
{
  "offers": [
    {
      "_id": "60f6b8a9e47e8c3f8c5a5a8d",
      "text": "20% off on all tickets this weekend!",
      "__v": 0
    },
    {
      "_id": "60f6b8bae47e8c3f8c5a5a8e",
      "text": "Buy one get one free on popcorn.",
      "__v": 0
    }
  ]
}

### POST Create a New Offer (Admin only)

- **URL**: `/api/offers`
- **Method**: `POST`
- **Description**: Creates a new offer. Only accessible by authenticated admin users.
- **Request Body (JSON)**:
{
  "offer": "Free drink with every ticket purchase!"
}
- **Example Response**: 
{
  "_id": "60f6b9b5e47e8c3f8c5a5a8f",
  "text": "Free drink with every ticket purchase!",
  "__v": 0
}

### DELETE an Offer by ID (Admin only)

- **URL**: `/api/offers/[id]`
- **Method**: `DELETE`
- **Description**: Deletes an offer by its ID. Requires authenticated admin user.
- **Response**: 
{
  "success": true
}

## Profile Picture API

### POST Upload Profile Picture

- **URL**: `/api/upload-profile`
- **Method**: `POST`
- **Auth**: Required (User)
- **Description**: Uploads or updates a user's profile picture to Cloudinary and stores the image URL in the database.
- **Request Type**: multipart/form-data
- **Form Data Parameters**: file: Image file to upload.
- **Response**: 
{
  "profilePicture": "https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/profile_pics/user_123.jpg"
}

### DELETE Remove Profile Picture

- **URL**: `/api/remove-profile`
- **Method**: `DELETE`
- **Auth**: Required (User)
- **Description**: Deletes the user's profile picture from Cloudinary and removes the URL from the user record in the database.
- **Response**: 
{
  "message": "Profile image removed."
}

```

### Instructions for Using the Auth Context

Import the useAuth Hook
First, import the useAuth hook in your component:

    import { useAuth } from "src/components/user/AuthData";

Destructure Auth Data
Then, use the useAuth hook to get the user data, authentication status, loading state, and other necessary values:

    const { userData, isLoggedIn, isLoading, logout, login, isAdmin, token } = useAuth();

Now, you can use these values throughout your component as needed!

### Example: Protecting Pages for Logged-in Users

If you want to protect specific pages so that only logged-in users can access them, you can implement a simple check using the useAuth hook and useEffect:

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

On the backend, you can check the user's token to validate their authentication. Here's how you might check the token:

    import { checkAuth } from "src/lib/auth";
    import { NextResponse } from "next/server"; // Import NextResponse

    const authenticatedUser = await checkAuth(req);
       if (!authenticatedUser) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
       }

      // Optionally, check if the user is an admin
     const isAdmin = authenticatedUser.role === "admin";
       if (!isAdmin) {
        return NextResponse.json(
         { message: "You don't have the right to use this feature!" },
         { status: 403 }
        );
      }

### Example: Hiding Components Based on Login Status

You can also conditionally render components based on whether the user is logged in. Here's an example of how to hide or show content depending on the login status:

    const { isLoggedIn, isLoading } = useAuth();
    {!isLoggedIn ? (
      <p>Show this data to non-logged-in users</p>
       ) : (
      <p>Hide this data for logged-in users</p>
     )}
