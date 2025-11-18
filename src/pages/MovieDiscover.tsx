import Navbar from "../components/layout/Navbar";
import React, { useState, useRef } from "react";
import { fetchBySearch, IMAGE_BASE_URL } from "../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../interfaces/movie";

import MovieGrid from "../components/movie/MovieGrid";

export default function MovieDiscover() {
  const [findMovie, setFindMovie] = useState<Movie[]>([]);
  const inputTyping = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigate();

  const onHandleInput = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const query = inputTyping.current?.value.trim();
    if (!query) return;

    try {
      const data = await fetchBySearch(query);
      setFindMovie(data);
    } catch (error) {
      console.log("error fetching movies:", error);
    }
  };

  const queryValue = inputTyping.current?.value || "";

  return (
    <>
      <Navbar />

      <section className="px-5 flex h-[50vh] flex-col justify-end items-center mb-10 gap-10 ">
        <div className="px-5 flex flex-col items-center">
          <h1 className="font-normal text-3xl text-center lg:text-6xl">
            Discover Your Next Favorite
          </h1>
          <p className="font-light text-sm mt-2 text-white/70">
            Search through thousands of movies, TV shows, and anime series
          </p>
        </div>
        <div className="flex flex-col border-1 border-white/50 w-full gap-3 p-3 rounded-xl my-4 max-w-4/5 lg:max-w-3/6">
          <input
            ref={inputTyping}
            className=" border-1 border-white/50 rounded-lg placeholder-white/50 px-2 py-1"
            placeholder="Type here to search.."
            type="search"
          />
          <button
            className="border-1 rounded-xl border-white/50 text-sm cursor-pointer py-4"
            onClick={(e) => onHandleInput(e)}
          >
            Buscar
          </button>
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
