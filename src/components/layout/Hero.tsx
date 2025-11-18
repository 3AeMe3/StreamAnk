import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays, Star, Play, Info } from "lucide-react";
import Slider from "react-slick";

import VideoWindow from "../movie/VideoWindow";
import Button from "../ui/Button";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import type { Movie, IconProps } from "../../interfaces/movie";
import { useMovieDetails } from "../../hooks/useMovieDetails";

interface HeroProps {
  heroMovies?: Movie[];
}

export default function Hero({ heroMovies }: HeroProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  function HeroSlide({ movie }: { movie: Movie }) {
    const navigate = useNavigate();
    const { find } = useMovieDetails(movie.id.toString());
    const { trailer } = useMovieDetails(movie.id.toString());

    const Tag = ({ Icon, iconFill, iconColor, children }: IconProps) => (
      <span
        className={`  flex justify-center items-center  gap-1 rounded-xl px-2 text-sm backdrop-blur-sm  border-1 border-white/25 bg-black/20  `}
      >
        {Icon && <Icon size={12} color={iconColor} fill={iconFill} />}
        {children}
      </span>
    );

    return (
      <div className="relative h-[85vh]   " key={movie.id}>
        <img
          className="h-full w-full object-cover object-center brightness-60 mask-y-from-90% mask-y-to-black-90% mask-l-from-70%  "
          src={`${IMAGE_BASE_URL}original${movie.backdrop_path}`}
          alt={`Backdrop of ${movie.title}`}
          loading="lazy"
        />
        <div className="absolute bottom-20 px-3 lg:px-65 ">
          <h1 className="text-4xl font-bold mb-2 lg:text-5xl">{movie.title}</h1>
          <div className="flex gap-2 mb-4 ">
            <Tag Icon={Star} iconColor="yellow" iconFill="#facc15">
              {movie.vote_average.toFixed(1)}/10
            </Tag>
            <Tag Icon={CalendarDays}>{movie.release_date?.slice(0, 4)}</Tag>

            {find &&
              find.genres
                ?.slice(0, 2)
                .map((genre) => (
                  <Tag key={genre.id}>
                    {genre.name === "Science Fiction" ? "SF" : genre.name}
                  </Tag>
                ))}
          </div>
          <p className="text-gray-300 text-lg/6 mb-4 lg:w-2/5">
            {movie.overview.slice(0, 150).concat("...")}
          </p>

          <div className="flex gap-4 ">
            <Button
              Icon={Play}
              iconSize={25}
              shape="circle"
              iconFill="black"
              onHandleClick={() => {
                setVideoUrl(trailer);
              }}
            />
            <Button
              text="See More"
              Icon={Info}
              iconSize={20}
              iconFill="none"
              size="lg"
              onHandleClick={() =>
                navigate(`/movie/${movie.id}`, { state: { movie } })
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="h-[90vh]">
      <Slider {...settings}>
        {heroMovies?.slice(0, 5)?.map((movie) => (
          <HeroSlide key={movie.id} movie={movie} />
        ))}
      </Slider>

      {/* Modal para el trailer */}
      {videoUrl && (
        <VideoWindow
          videoUrl={videoUrl.replace("watch?v=", "embed/")}
          onHandleClick={() => setVideoUrl(null)}
        />
      )}
    </section>
  );
}
