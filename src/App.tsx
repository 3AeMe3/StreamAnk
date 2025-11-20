import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Movies from "./components/layout/Movies";
import Footer from "./components/layout/Footer";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useState } from "react";
import Loading from "./components/common/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    errorMessage,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlaying,
    trendingMovies,
  } = useMovies();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

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
