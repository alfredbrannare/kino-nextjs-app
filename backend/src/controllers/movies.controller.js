import Movie from "../models/model.movies.js";

/**
 * @desc Get all movies from the database
 * @route GET /api/movies
 */
export const listMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};


/**
 * @desc Get a single movie by its ID
 * @route GET /api/movies/:id
 * @param - req.params.id
 */
export const listSelectedMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

/**
 * @desc Add a new movie to the database using IMDb ID via OMDb API
 * @route POST /api/movies
 * @param  - IMDb movie ID ({"id": "tt1234567"})
 */
export const addMovie = async (req, res) => {
  // Data som finns i body
  console.log("Received request body:", req.body);
  if (!req.body || !req.body.id) {
    return res.status(400).json({
      status: "Imdb film id is requied",
    });
  }

  //Hämtar film data från OMDb API
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${req.body.id}&apikey=5cd99ae7`
    );
    const data = await response.json();

    const movie = new Movie({
      title: data.Title,
      description: data.Plot,
      year: parseInt(data.Year),
      image: data.Poster,
      rating: parseFloat(data.imdbRating),
    });

    // Kolar om filmen finns redan i databasen
    const existing = await Movie.findOne({ title: data.Title });
    if (existing) {
      return res
        .status(400)
        .json({ status: "Movie already exists in the database." });
    }

    await movie.save();
    res.json(movie);
  } catch {
    res.status(400).json({
      status: "IMDb ID is invalid or the OMDb API is not responding.",
    });
  }
};
