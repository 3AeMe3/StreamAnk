import { useState, useEffect } from "react";

import {
  fetchCredits,
  fetchSimilarMovies,
  fetchMovieTrailer,
  fetchFindByID,
} from "../services/tmdb";

import type { Movie } from "../interfaces/movie";
import type { CastMember } from "../interfaces/movie";

export const useMovieDetails = (id?: string) => {
  const [credits, setCredits] = useState<CastMember[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [find, setFind] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAllMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const [credits, similar, trailer, movieData] = await Promise.all([
          fetchCredits(Number(id)),
          fetchSimilarMovies(Number(id)),
          fetchMovieTrailer(Number(id)),
          fetchFindByID(Number(id)),
        ]);
        setCredits(credits);
        setSimilar(similar);
        setTrailer(trailer);
        setFind(movieData);
      } catch (error) {
        setErrorMessage(
          `failed to fecth movies. please try again later: ${error} `,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMovies();
  }, [id]);

  return { credits, similar, trailer, find, isLoading, errorMessage };
};
