import { useState, useRef } from "react";

import { MoveLeft, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import YouTube from "react-youtube";

import InfoPanel from "../components/movie/InfoPanel";
import Button from "../components/ui/Button";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieGrid from "../components/movie/MovieGrid";
import Actors from "../components/movie/Actors";
import Loading from "../components/common/Loading";
import SEO from "../components/common/SEO";
import Footer from "../components/layout/Footer";

export default function MovieDetail() {
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);

  const similarMoviesRef = useRef<HTMLDivElement>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { credits, similar, trailer, find, isLoading, errorMessage } =
    useMovieDetails(id);

  if (isLoading) return <Loading />;

  if (errorMessage) return <p className="mt-10 text-red-500">{errorMessage}</p>;
  if (!find) return null;

  const trailerUrl = trailer
    ?.replace("watch?v=", "embed/")
    .concat(
      "",
      `?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&vq=hd1080`,
    );

  const scrollToSimilarMovies = () => {
    similarMoviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const trailerId = getYoutubeId(trailer || "");

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    event.target.mute();
  };

  const toggleAudio = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(70);
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const releaseYear = find.release_date?.slice(0, 4) ?? "N/A";

  const runtime = find.runtime ?? 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const duration = `${hours}h ${minutes}m`;

  const opts = {
    height: "1080",
    width: "1920",
    playerVars: {
      autoplay: 1,
      mute: 1, // Comienza muteado
      loop: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      playlist: trailerId, // Necesario para el loop
    },
  };

  return (
    <>
      <SEO
        title={find.title}
        description={find.overview}
        url={String(trailerUrl)}
      ></SEO>
      <div className="relative h-[80vh] overflow-hidden">
        <div className="h-full mask-b-from-90% mask-b-to-100%">
          {trailerId ? (
            <YouTube
              videoId={trailerId}
              opts={opts}
              onReady={onPlayerReady}
              className="absolute bottom-40 h-full w-full"
              iframeClassName=""
            />
          ) : (
            <p className="flex h-full items-center justify-center text-2xl text-red-500">
              No video available to display :(
            </p>
          )}
        </div>

        <div className="absolute top-0 left-0 h-full w-full bg-black/30 px-5">
          <div className="mx-2 mt-5 flex items-center justify-between xl:mx-20">
            <Button
              Icon={MoveLeft}
              iconSize={30}
              onHandleClick={() => navigate(-1)}
            />
            <Button
              Icon={isMuted ? VolumeXIcon : Volume2Icon}
              shape="circle"
              iconSize={20}
              onHandleClick={toggleAudio}
            />
          </div>

          <InfoPanel
            genres={find?.genres}
            title={find.title}
            description={find.overview}
            age={releaseYear}
            time={duration}
            score={find?.vote_average}
            trailer={String(trailerUrl)}
            scrollToSimilarMovies={scrollToSimilarMovies}
          />
        </div>
      </div>

      {/*Actors*/}
      <Actors credits={credits} />

      {/*Peliculas Similars*/}
      <section ref={similarMoviesRef} className="mx-5 pt-5 xl:mx-20">
        <h3 className="my-4 text-2xl font-medium">You may like</h3>
        {similar.length !== 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-8 lg:gap-3">
            {similar.map((movie) => (
              <MovieGrid
                key={movie.id}
                title={movie.title}
                image={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
                score={`${movie.vote_average.toFixed(1)}/10`}
                tag="Movie"
                onHandleClick={() =>
                  navigate(`/movie/${movie?.id}`, { state: { movie } })
                }
              />
            ))}
          </div>
        ) : (
          <p className="flex h-40 items-center justify-center text-lg text-red-400">
            It seems there is nothing to show.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
