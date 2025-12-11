import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "react-use";

import { fetchBySearch, IMAGE_BASE_URL } from "../services/tmdb";
import type { Movie } from "../interfaces/movie";
import { Search } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import MovieGrid from "../components/movie/MovieGrid";
import SEO from "../components/common/SEO";

export default function MovieDiscover() {
  const [findMovie, setFindMovie] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const navigation = useNavigate();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    fetchBySearch(debouncedSearchTerm)
      .then(setFindMovie)
      .catch((err) => console.log(err));
  }, [debouncedSearchTerm]);

  const queryValue = debouncedSearchTerm;

  const description = "Search through thousands of movies";

  return (
    <>
      <SEO title="Search - StreamANK" description={description}></SEO>
      <Navbar />
      <section className="mb-10 flex h-[50vh] flex-col items-center justify-end gap-10 px-5">
        <div className="flex flex-col items-center px-5">
          <h1 className="text-center text-3xl font-normal lg:text-6xl">
            <span className="title mr-2 bg-linear-to-r from-violet-200 to-violet-500 bg-clip-text text-transparent">
              Discover
            </span>
            Your Next Favorite
          </h1>
          <p className="text-md mt-2 font-light text-white/70">{description}</p>
        </div>
        <div className="relative my-4 flex w-full max-w-4/5 flex-col gap-3 rounded-xl p-3 lg:max-w-2/5">
          {/* Lupa */}
          <Search className="pointer-events-none absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 text-white/60" />
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full rounded-lg border-1 border-white/50 bg-transparent px-12 py-4 placeholder-white/50"
              placeholder="Type here to search.."
              type="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </section>
      <section className="px-5 lg:px-75">
        {queryValue && (
          <>
            <h2>{`Search Results for "${queryValue}" `}</h2>
            <p className="text-sm text-white/70">{`${findMovie.length} results found`}</p>
            <div className="no-scrollbar relative my-8 flex gap-10 overflow-x-auto overflow-y-hidden"></div>
            <div className="grid grid-cols-2 lg:grid-cols-6 lg:gap-3">
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
