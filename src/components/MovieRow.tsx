import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../services/tmdb";

interface MovieRowProps {
  title: string;
  typeMovies: any[];
}

export default function MovieRow({ title, typeMovies = [] }: MovieRowProps) {
  return (
    <div className=" px-4 my-10">
      <div className="flex justify-between relative  ">
        <h3 className="font-bold ">
          <span className="w-1 h-1 bg-violet-500 text-violet-500">|</span> {title}
        </h3>
        <button>{">"}</button>
      </div>
      <div className="flex relative gap-10 my-8 no-scrollbar overflow-y-hidden overflow-x-auto">
        {typeMovies?.slice(0, 10).map((movie) => (
          <MovieCard
            title={movie.title}
            tag="Movie"
            rating={` ${String(movie?.vote_average).slice(0, 3)}/10`}
            key={movie.id}
            image={`${IMAGE_BASE_URL}${movie.poster_path} `}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}
