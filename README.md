docker run -v C:\Users\user\kino-nextjs-app\data\mongo:/data/db -p 27017:27017 mongo
OMDB=5cd99ae7
MONGO_URI=mongodb://localhost:27017

## remember to add ip to mongo atlas

## Screenings API

### GET the 5 Nearest Upcoming Screenings

- **URL**: `/api/screenings/next`
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

    import { useAuth } from "src/components/user/AuthData";
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
