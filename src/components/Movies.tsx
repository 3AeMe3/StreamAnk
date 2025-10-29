import MovieRow from "./MovieRow";
import Top10 from "./Top10";
import type { Movie } from "../interfaces/movie";

interface MoviesProps {
  trendingMovies?: Movie[];
  topRatedMovies?: Movie[];
  upcomingMovies?: Movie[];
  nowPlaying?: Movie[];
  errorMessage?: string;
}

export default function Movies({
  trendingMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlaying,
  errorMessage,
}: MoviesProps) {
  return (
    <section>
      {errorMessage && <p className="text-red-600 text-2xl">{errorMessage}</p>}
      <Top10 typeMovies={trendingMovies} />
      <MovieRow title="Upcomming" typeMovies={upcomingMovies} />
      <MovieRow title="On Threatres" typeMovies={nowPlaying} />
      <MovieRow title="Top Rated" typeMovies={topRatedMovies} />
    </section>
  );
}
