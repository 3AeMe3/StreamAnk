import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../../interfaces/movie";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Carousel
interface MovieRowProps {
  title: string;
  typeMovies: Movie[];
}

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
        <Swiper
          modules={[Navigation]}
          navigation={{ enabled: true }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            640: { slidesPerView: 4, spaceBetween: 15 },
            768: { slidesPerView: 5, spaceBetween: 15 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {typeMovies?.slice(0, 10).map((movie) => (
            <SwiperSlide key={movie.id} className="px-2">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
