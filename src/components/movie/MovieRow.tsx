import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../../interfaces/movie";

// Carousel
import Slider from "react-slick";
import NextArrow from "../ui/Slider/NextArrow";
import PrevArrow from "../ui/Slider/PrevArrow";
interface MovieRowProps {
  title: string;
  typeMovies: Movie[];
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1280, // laptops y desktop pequeños
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function MovieRow({ title, typeMovies = [] }: MovieRowProps) {
  const navigate = useNavigate();

  return (
    <div className="my-10 px-10 lg:px-35 xl:px-45">
      <div className="relative flex justify-between">
        <h3 className="font-bold lg:text-2xl">
          <span className="h-1 w-1 bg-violet-500 text-violet-500">|</span>{" "}
          {title}
        </h3>
      </div>

      <div className="my-8">
        <Slider {...settings}>
          {typeMovies?.slice(0, 10).map((movie) => (
            <div key={movie.id} className="!w-auto px-2">
              <MovieCard
                title={movie.title}
                rating={`${movie.vote_average.toFixed(1)}/10`}
                image={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
                handleClick={() =>
                  navigate(`/movie/${movie.id}`, {
                    state: { movie },
                  })
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
