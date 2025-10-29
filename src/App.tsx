import { useState, useEffect } from "react";
import {
  fetchMoviesByType,
  fetchMovieTrailer,
  fetchTrendingByType,
} from "./services/tmdb";
import type { Movie } from "./interfaces/movie";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
import Footer from "./components/Footer";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const [popular, topRated, upcoming, nowPlaying, trendingMovie] =
          await Promise.all([
            fetchMoviesByType("popular"),
            fetchMoviesByType("top_rated"),
            fetchMoviesByType("upcoming"),
            fetchMoviesByType("now_playing"),
            fetchTrendingByType("movie"),
          ]);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setNowPlaying(nowPlaying);
        setTrendingMovies(trendingMovie);
      } catch (error) {
        setErrorMessage(
          ` Failed to fetch movies. Please try again later.: ${error}`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Hero heroMovies={popularMovies} />
        <Movies
          trendingMovies={trendingMovies}
          topRatedMovies={topRatedMovies}
          upcomingMovies={upcomingMovies}
          nowPlaying={nowPlaying}
          errorMessage={errorMessage}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
