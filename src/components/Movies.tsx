import MovieRow from "./MovieRow";

export default function Movies() {
  return (
    <section>
      <MovieRow title="Trending Now" />
      <MovieRow title="Latest Releases" />
      <MovieRow title="Exclusives Shows" />
      <MovieRow title="Most Popular" />
      <MovieRow title="Top Rated" />
    </section>
  );
}
