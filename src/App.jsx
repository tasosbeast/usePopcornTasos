import { useState } from "react";
import { tempMovieData } from "./data/tempData";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumofResults from "./components/Numofresults";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MoviesList from "./components/MoviesList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumofResults movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          <MoviesList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
