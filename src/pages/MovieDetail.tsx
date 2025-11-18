import { MoveLeft, VolumeXIcon } from "lucide-react";
import { useParams, useNavigate } from "react-router";

import InfoPanel from "../components/movie/InfoPanel";
import Button from "../components/ui/Button";
import { IMAGE_BASE_URL } from "../services/tmdb";
import { useMovieDetails } from "../hooks/useMovieDetails";
import MovieGrid from "../components/movie/MovieGrid";

import portrait from "../assets/images/portraitNoImage.png";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { credits, similar, trailer, find, isLoading, errorMessage } =
    useMovieDetails(id);

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>;

  if (errorMessage)
    return <p className="text-red-500  mt-10">{errorMessage}</p>;
  if (!find) return null;

  const trailerUrl = trailer
    ?.replace("watch?v=", "embed/")
    .concat(
      "",
      `?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&vq=hd1080`
    );

  const description = find.overview?.slice(0, 141).concat("...");
  const releaseYear = find.release_date?.slice(0, 4);

  const runtime = find.runtime ?? 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const duration = `${hours}h ${minutes}m`;

  return (
    <>
      <div className="relative  h-[80vh]   ">
        <div className="h-full mask-b-from-90% mask-b-to-100%">
          <iframe
            width="100%"
            height="100%"
            allow="autoplay;muted"
            src={String(trailerUrl)}
            title="Movie trailer"
          ></iframe>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/30 px-5 ">
          <div className="flex justify-between items-center mt-5">
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
            description={description}
            age={releaseYear}
            time={duration}
            score={find?.vote_average}
          />
        </div>
      </div>

      {/*Actors*/}
      <section className="  pt-5  mx-20">
        <h3 className="text-2xl my-4 font-medium">Actors</h3>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 ">
          {credits.slice(0, 12).map((credit) => (
            <div className="group">
              <article
                key={credit.id}
                className="bg-[#151515] border-1 border-white/10 rounded-lg pt-3 px-3 flex gap-3  group-hover:transition group-hover:duration-500 group-hover:border-indigo-600 "
              >
                <img
                  src={`${IMAGE_BASE_URL}w300/${credit.profile_path}`}
                  alt={credit.name}
                  className="h-25 rounded-t-lg "
                  onError={(e) => (e.currentTarget.src = portrait)}
                />
                <div className="flex flex-col justify-center   text-sm">
                  <h3 className="text-xl font-semibold group-hover:text-indigo-600 group-hover:transition group-hover:duration-500">
                    {credit.name}
                  </h3>
                  <span className="text-md text-gray-300">
                    {credit.character}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/*Peliculas Similars*/}
      <section className=" pt-5 px-5 mx-20 ">
        <h3 className=" text-2xl my-4 font-medium">You may like</h3>
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
      </section>
    </>
  );
}
