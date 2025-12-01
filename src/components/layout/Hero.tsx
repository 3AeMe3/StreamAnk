import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays, Star, Play, Info, type LucideIcon } from "lucide-react";
import Slider from "react-slick";

import VideoWindow from "../movie/VideoWindow";
import Button from "../ui/Button";
import { IMAGE_BASE_URL, fetchMovieTrailer } from "../../services/tmdb";
import type { Movie } from "../../interfaces/movie";

interface HeroProps {
  heroMovies?: Movie[];
}

interface HeroTagProps {
  Icon?: LucideIcon;
  iconFill?: string;
  iconColor?: string;
  children: React.ReactNode;
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

  // Componente pequeño para tags del Hero
  const Tag = ({ Icon, iconFill, iconColor, children }: HeroTagProps) => (
    <span
      className="flex justify-center items-center gap-1 rounded-xl px-2 text-sm backdrop-blur-sm border border-white/25 bg-black/20"
    >
      {Icon && <Icon size={12} color={iconColor} fill={iconFill} />}
      {children}
    </span>
  );

  // Slide individual
  const HeroSlide = ({ movie }: { movie: Movie }) => {
    const navigate = useNavigate();

    const handlePlay = async () => {
      const trailer = await fetchMovieTrailer(movie.id);
      if (trailer) setVideoUrl(trailer);
    };

    return (
      <div className="relative h-[85vh]" key={movie.id}>
        <img
          className="h-full w-full object-cover object-center brightness-60 
                     mask-y-from-90% mask-y-to-black-90% mask-l-from-70%"
          src={`${IMAGE_BASE_URL}original${movie.backdrop_path}`}
          alt={movie.title}
          loading="lazy"
        />

        <div className="absolute bottom-20 px-3 lg:px-65">
          <h1 className="text-4xl font-bold mb-2 lg:text-5xl">{movie.title}</h1>

          <div className="flex gap-2 mb-4">
            <Tag Icon={Star} iconColor="yellow" iconFill="#facc15">
              {movie.vote_average.toFixed(1)}/10
            </Tag>

            <Tag Icon={CalendarDays}>{movie.release_date?.slice(0, 4)}</Tag>

            {movie.genres?.slice(0, 2).map((g) => (
              <Tag key={g.id}>
                {g.name === "Science Fiction" ? "SF" : g.name}
              </Tag>
            ))}
          </div>

          <p className="text-gray-300 text-lg/6 mb-4 lg:w-2/5">
            {movie.overview.slice(0, 150)}...
          </p>

          <div className="flex gap-4">
            <Button
              Icon={Play}
              iconSize={25}
              shape="circle"
              iconFill="black"
              onHandleClick={handlePlay}
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
  };

  return (
    <section className="h-[90vh]">
      <Slider {...settings}>
        {heroMovies?.slice(0, 5).map((movie) => (
          <HeroSlide key={movie.id} movie={movie} />
        ))}
      </Slider>

      {videoUrl && (
        <VideoWindow
          videoUrl={videoUrl.replace("watch?v=", "embed/")}
          onHandleClick={() => setVideoUrl(null)}
        />
      )}
    </section>
  );
}
