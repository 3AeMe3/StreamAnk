import { Star } from "lucide-react";
import placeholderImage from "../../assets/images/noImage.jpg";

interface MovieCardProps {
  title: string;
  image: string;
  tag?: string;
  rating: string;

  top10?: boolean;
  topIndex?: number;
  handleClick?: () => void;
}

export default function MovieCard({
  title,
  image,
  top10 = false,
  topIndex,
  tag,
  handleClick,
  rating: score,
}: MovieCardProps) {
  return (
    <div
      className={`relative w-40  group transition-all duration-300  hover:z-10 hover:scale-105 cursor-pointer xl:w-50`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        onError={(e) => (e.currentTarget.src = placeholderImage)}
        className="object-cover transition-all duration-500 hover:brightness-75"
        loading="lazy"
      />

      {/* Overlay */}
      <div
        className="absolute inset-x-0 bottom-0 text-white translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                transition-all ease-out flex flex-col justify-end p-3 pb-2 duration-500 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      >
        <h3 className="text-white text-sm md:text-base font-semibold leading-tight line-clamp-2">
          {title}
        </h3>
        <div className="flex justify-between items-center text-xs md:text-sm font-light mt-1">
          <span>{tag}</span>
          <span className="flex items-center gap-1">
            <Star size={13} fill="red" color="red" />
            {score}
          </span>
        </div>
      </div>

      {top10 && (
        <span className="text-black absolute  text-outline-purple top-2  left-1 font-bold text-4xl leading-none select-none group-hover:text-purple group-hover:transition-colors group-hover:duration-100  ">
          {topIndex}
        </span>
      )}
    </div>
  );
}
