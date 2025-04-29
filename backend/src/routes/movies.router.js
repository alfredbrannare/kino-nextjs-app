import express from "express";
import { listMovies, listSelectedMovie, addMovie } from "../controllers/movies.controller.js";

//Rutt hanterare
const router = express.Router();

router.get("/", listMovies);
router.get("/:id", listSelectedMovie);
router.post("/", addMovie);
// router.put("/:id", updateMovie);
// router.delete("/:id", deleteMovie);

export default router;