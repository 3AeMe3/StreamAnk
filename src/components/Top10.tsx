import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../services/tmdb";

interface MovieRowProps {
  typeMovies: any[];
}

export default function top10({ typeMovies = [] }: MovieRowProps) {
  return (
    <div className=" px-4 my-10">
      <div className="flex items-center gap-4  ">
        <h3 className="font-bold text-6xl  ">
          <span className="text-outline-red">T</span>
          <span className="text-outline-red">O</span>
          <span className="text-outline-red">P</span>
          <span className="text-outline-red">1</span>
          <span className="text-outline-red">0</span>
        </h3>
        <span className="text-sm tracking-[.5rem] ">
          CONTENT <br />
          TODAY
        </span>
      </div>
      <div className="flex  pl-12 gap-15 my-8 no-scrollbar overflow-y-hidden  overflow-x-auto">
        {typeMovies?.slice(0, 10).map((movie, i) => (
          <MovieCard
            title={movie.title}
            tag={movie.media_type.split("")[0].toUpperCase() + movie.media_type.slice(1)}
            rating={` ${String(movie?.vote_average).slice(0, 3)}/10`}
            top10={true}
            topIndex={i + 1}
            cardSize="lg"
            key={movie.id}
            image={`${IMAGE_BASE_URL}${movie.poster_path} `}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}
