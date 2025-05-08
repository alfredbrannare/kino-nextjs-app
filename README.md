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
