import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { KEY } from "../App.jsx";

function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    imdbVotes,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  console.log(title, year);
  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok)
            throw new Error("Something went wrong fetching movie details");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);

          setMovie(data);
        } catch (err) {
          const message =
            err.message === "Failed to fetch"
              ? "Couldn’t reach OMDb. Check your connection and try again."
              : err.message;
          console.error(message);
          setError(message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );

  if (isLoading)
    return (
      <div className="details">
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="details">
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <ErrorMessage message={error} />
      </div>
    );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span> {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating size={24} maxRating={10} />
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        {director !== "N/A" && <p>Directed by: {director}</p>}
      </section>
    </div>
  );
}

export default MovieDetails;
