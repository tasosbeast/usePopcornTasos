import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumofResults from "./components/Numofresults";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const KEY = "3479a937";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }
  /*
  useEffect(function () {
    console.log("After initial render");
  }, []);

  useEffect(function () {
    console.log("After every render");
  });

  useEffect(
    function () {
      console.log("After query render");
    },
    [query]
  );

  console.log("During render");
  */

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true); // trigger loading indicator before starting the request
          setError(""); // clear any previous error so the UI resets
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          ); // request matching movies from the OMDb API

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies"); // guard against HTTP errors (e.g. 404, 500)

          const data = await res.json(); // parse the JSON response body

          if (data.Response === "False") throw new Error("Movie not found!"); // OMDb-specific error when the movie search fails

          setMovies(data.Search); // update state with the list of movies so they render
        } catch (err) {
          console.error(err.message); // log for debugging
          setError(err.message); // show the error message in the UI
        } finally {
          setIsLoading(false); // stop showing the loader regardless of success or failure
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies(); // immediately run the async function when the component mounts
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumofResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
