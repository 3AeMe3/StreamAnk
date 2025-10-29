import { useState } from "react";
import { CalendarDays, Star, Play, Info } from "lucide-react";
import VideoWindow from "./VideoWindow";
import { IMAGE_BASE_URL, fetchMovieTrailer } from "../services/tmdb";
import Slider from "react-slick";
import Button from "./Button";

interface HeroProps {
  heroMovies?: any[];
}

export default function Hero({ heroMovies }: HeroProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleWatchTrailer = async (movieID: number) => {
    const url = await fetchMovieTrailer(movieID);
    if (url) {
      setVideoUrl(url);
    } else {
      alert("Trailer not available");
    }
  };

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

  return (
    <section className="h-[90vh]">
      <div className=" ">
        <Slider {...settings}>
          {heroMovies?.slice(0, 5)?.map((movie) => (
            <div className="relative h-[90vh] " key={movie.id}>
              <img
                className="h-full w-full object-cover object-center brightness-70 "
                src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`}
                alt=""
              />
              <div className="absolute bottom-20 left-3 max-w-lg">
                <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
                <div className="flex gap-2 mb-4 ">
                  <Button
                    Icon={Star}
                    iconColor="yellow"
                    iconFill="#facc15"
                    text={`${String(movie?.vote_average).slice(0, 3)}/10`}
                  />
                  <Button
                    Icon={CalendarDays}
                    text={`${movie?.release_date?.slice(0, 4)}`}
                  />
                  <Button text={`${movie?.original_language.toUpperCase()}`} />
                </div>
                <p className="text-gray-300 text-lg/6 mb-4">
                  {movie?.overview?.slice(0, 150).concat("...")}
                </p>

                <div className="flex gap-4 ">
                  <Button
                    Icon={Play}
                    iconSize={25}
                    shape="circle"
                    iconFill="black"
                  />
                  <Button
                    text="See More"
                    Icon={Info}
                    iconSize={20}
                    iconFill="none"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

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
