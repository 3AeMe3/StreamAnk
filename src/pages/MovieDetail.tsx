import { MoveLeft, VolumeXIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router";

import InfoPanel from "../components/movie/InfoPanel";
import Button from "../components/ui/Button";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieGrid from "../components/movie/MovieGrid";
import Actors from "../components/movie/Actors";
import Loading from "../components/common/Loading";
import SEO from "../components/common/SEO";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { credits, similar, trailer, find, isLoading, errorMessage } =
    useMovieDetails(id);

  if (isLoading) return <Loading />;

  if (errorMessage)
    return <p className="text-red-500  mt-10">{errorMessage}</p>;
  if (!find) return null;

  const trailerUrl = trailer
    ?.replace("watch?v=", "embed/")
    .concat(
      "",
      `?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&vq=hd1080`
    );
  const releaseYear = find.release_date?.slice(0, 4) ?? "N/A";

  const runtime = find.runtime ?? 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const duration = `${hours}h ${minutes}m`;

  return (
    <>
      <SEO
        title={find.title}
        description={find.overview}
        url={String(trailerUrl)}
      ></SEO>
      <div className="relative  h-[80vh] overflow-hidden   ">
        <div className="h-full mask-b-from-90% mask-b-to-100%">
          {trailer ? (
            <iframe
              className="absolute -bottom-40"
              width="1920"
              height="1080"
              allow="autoplay; muted; encrypted-media"
              src={String(trailerUrl)}
              title="Movie trailer"
            ></iframe>
          ) : (
            <p className="flex justify-center items-center h-full text-2xl text-red-500">
              No video available to display :(
            </p>
          )}
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/30 px-5 ">
          <div className="flex mx-2 justify-between items-center mt-5  xl:mx-20">
            <Button
              Icon={MoveLeft}
              iconSize={30}
              onHandleClick={() => navigate(-1)}
            />
            <Button Icon={VolumeXIcon} shape="circle" iconSize={20} />
          </div>

          <InfoPanel
            genres={find?.genres}
            title={find.title}
            description={find.overview}
            age={releaseYear}
            time={duration}
            score={find?.vote_average}
            trailer={String(trailerUrl)}
          />
        </div>
      </div>

      {/*Actors*/}
      <Actors credits={credits} />

      {/*Peliculas Similars*/}
      <section className="   pt-5  mx-5 xl:mx-20">
        <h3 className=" text-2xl my-4 font-medium">You may like</h3>
        {similar.length !== 0 ? (
          <div className="grid grid-cols-2  lg:grid-cols-8 lg:gap-3">
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
          <p className="h-40 flex justify-center items-center text-lg text-red-400">
            It seems there is nothing to show.
          </p>
        )}
      </section>
    </>
  );
}
