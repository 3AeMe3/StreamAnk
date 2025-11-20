import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { fetchBySearch, IMAGE_BASE_URL } from "../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../interfaces/movie";

import { useDebounce } from "react-use";
import { Search } from "lucide-react";
import MovieGrid from "../components/movie/MovieGrid";

export default function MovieDiscover() {
  const [findMovie, setFindMovie] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigation = useNavigate();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearchTerm) return;

      try {
        const data = await fetchBySearch(debouncedSearchTerm);
        setFindMovie(data);
      } catch (error) {
        console.log("error fetching movies:", error);
      }
    };
    fetchData();
  }, [debouncedSearchTerm]);

  const queryValue = debouncedSearchTerm || "";

  return (
    <>
      <Navbar />

      <section className="px-5 flex h-[50vh] flex-col justify-end items-center mb-10 gap-10 ">
        <div className="px-5 flex flex-col items-center">
          <h1 className="font-normal text-3xl text-center lg:text-6xl">
            <span className="title bg-linear-to-r from-violet-200  to-violet-500 bg-clip-text  text-transparent ">
              Discover
            </span>{" "}
            Your Next Favorite
          </h1>
          <p className="font-light text-sm mt-2 text-white/70">
            Search through thousands of movies, TV shows, and anime series
          </p>
        </div>
        <div className="relative flex flex-col w-full gap-3 p-3 rounded-xl my-4 max-w-4/5 lg:max-w-2/5">
          {/* Lupa */}
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60 pointer-events-none" />

          <input
            className="border-1 border-white/50 rounded-lg placeholder-white/50 px-12 py-4 bg-transparent"
            placeholder="Type here to search.."
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>
      <section className="px-5  lg:px-75 ">
        {queryValue && (
          <>
            <h2>{`Search Results for "${queryValue}" `}</h2>
            <p className="text-sm text-white/70">{`${findMovie.length} results found`}</p>
            <div className="flex relative gap-10 my-8 no-scrollbar overflow-y-hidden overflow-x-auto"></div>
            <div className="grid grid-cols-2  lg:grid-cols-6 lg:gap-3">
              {findMovie.map((movie) => (
                <MovieGrid
                  key={movie.id}
                  title={movie.title}
                  tag="Movie"
                  image={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
                  score={` ${movie?.vote_average.toFixed(1)}/10`}
                  onHandleClick={() =>
                    navigation(`/movie/${movie?.id}`, { state: { movie } })
                  }
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
