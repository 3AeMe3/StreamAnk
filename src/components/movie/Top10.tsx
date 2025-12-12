import MovieCard from "./MovieCard";
import { IMAGE_BASE_URL } from "../../services/tmdb";
import { useNavigate } from "react-router";
import type { Movie } from "../../interfaces/movie";
//Swiper
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css";

interface Top10Props {
  typeMovies: Movie[];
}

export default function Top10({ typeMovies = [] }: Top10Props) {
  const navigate = useNavigate();

  return (
    <div className="my-10 px-10 lg:px-35 xl:px-75">
      <div className="flex items-center gap-4">
        <h3 className="text-6xl font-bold tracking-[-8px] lg:mr-5 lg:text-9xl lg:tracking-[-15px]">
          <span className="text-outline-purple text-black">T</span>
          <span className="text-outline-purple text-black">O</span>
          <span className="text-outline-purple text-black">P </span>
          <span className="text-outline-purple text-black">1</span>
          <span className="text-outline-purple text-black">0</span>
        </h3>
        <span className="text-sm font-semibold tracking-[.5rem] lg:text-lg">
          CONTENT <br />
          TODAY
        </span>
      </div>
      <div className="my-8">
        <Swiper
          modules={[Navigation]}
          navigation={{ enabled: true }}
          slidesPerView={1.3}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            640: { slidesPerView: 4, spaceBetween: 15 },
            768: { slidesPerView: 5, spaceBetween: 15 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
          }}
        >
          {typeMovies.slice(0, 10)?.map((movie, i) => (
            <SwiperSlide key={movie.id} className="px-2">
              <MovieCard
                key={movie.id}
                title={movie.title}
                rating={` ${movie?.vote_average.toFixed(1)}/10`}
                top10
                topIndex={i + 1}
                image={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
                handleClick={() =>
                  navigate(`/movie/${movie?.id}`, { state: { movie } })
                }
              ></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
