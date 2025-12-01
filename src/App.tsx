import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Movies from "./components/layout/Movies";
import Footer from "./components/layout/Footer";
import { useMovies } from "./hooks/useMovies";
import Loading from "./components/common/Loading";

function App() {
  const {
    isLoading,
    errorMessage,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlaying,
    trendingMovies,
  } = useMovies();

  if (isLoading) return <Loading />;
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Hero heroMovies={popularMovies} />
        <Movies
          trendingMovies={trendingMovies}
          topRatedMovies={topRatedMovies}
          upcomingMovies={upcomingMovies}
          nowPlaying={nowPlaying}
          errorMessage={errorMessage}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
