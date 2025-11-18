import MovieRow from "../movie/MovieRow";
import Top10 from "../movie/Top10";
import type { Movie } from "../../interfaces/movie";

interface MoviesProps {
  trendingMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  nowPlaying: Movie[];
  errorMessage?: string;
}

export default function Movies({
  trendingMovies,
  topRatedMovies,
  upcomingMovies,
  nowPlaying,
  errorMessage,
}: MoviesProps) {
  const movieSection = [
    { title: "Top 10 trending", Component: Top10, movie: trendingMovies },
    { title: "Upcoming", Component: MovieRow, movie: upcomingMovies },
    { title: "Now Playing", Component: MovieRow, movie: nowPlaying },
    { title: "Top Rated", Component: MovieRow, movie: topRatedMovies },
  ];

  return (
    <section>
      {errorMessage ? (
        <p className="text-center text-red-400 text-xl my-8">{errorMessage}</p>
      ) : (
        <div className="slider-container">
          {movieSection.map(({ title, Component, movie }) => (
            <Component key={title} title={title} typeMovies={movie}></Component>
          ))}
        </div>
      )}
    </section>
  );
}
