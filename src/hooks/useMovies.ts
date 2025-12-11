import { useState, useEffect } from "react";
import { fetchMoviesByType, fetchTrendingByType } from "../services/tmdb";
import type { Movie } from "../interfaces/movie";

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
          ` Failed to fetch movies. Please try again later.: ${error}`,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  return {
    isLoading,
    errorMessage,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlaying,
    trendingMovies,
  };
};
