import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../../interfaces/movie";
import Slider from "react-slick";
import NextArrow from "../ui/Slider/NextArrow";
import PrevArrow from "../ui/Slider/PrevArrow";

interface Top10Props {
  typeMovies: Movie[];
}

export default function Top10({ typeMovies = [] }: Top10Props) {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280, // laptops y desktop pequeños
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className=" px-10 my-10 lg:px-35 xl:px-75">
      <div className="flex items-center gap-4   ">
        <h3 className="font-bold text-6xl tracking-[-8px] lg:mr-5 lg:tracking-[-15px] lg:text-9xl  ">
          <span className="text-outline-purple text-black ">T</span>
          <span className="text-outline-purple text-black">O</span>
          <span className="text-outline-purple text-black">P </span>
          <span className="text-outline-purple text-black">1</span>
          <span className="text-outline-purple text-black">0</span>
        </h3>
        <span className="text-sm font-semibold tracking-[.5rem] lg:text-lg ">
          CONTENT <br />
          TODAY
        </span>
      </div>
      <div className=" my-8 slider-container   ">
        <Slider {...settings}>
          {typeMovies.slice(0, 10)?.map((movie, i) => (
            <div className="px-2 ">
              <MovieCard
                key={movie.id}
                title={movie.title}
                tag={
                  movie.media_type
                    ? movie.media_type[0].toUpperCase() +
                      movie.media_type.slice(1)
                    : "Movie"
                }
                rating={` ${movie?.vote_average.toFixed(1)}/10`}
                top10
                topIndex={i + 1}
                image={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
                handleClick={() =>
                  navigate(`/movie/${movie?.id}`, { state: { movie } })
                }
              ></MovieCard>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
