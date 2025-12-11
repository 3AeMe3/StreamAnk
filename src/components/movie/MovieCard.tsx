import { Star } from "lucide-react";
import placeholderImage from "../../assets/images/noImage.jpg";

interface MovieCardProps {
  title: string;
  image: string;
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
  handleClick,
  rating: score,
}: MovieCardProps) {
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-300 hover:z-10 hover:scale-105 xl:w-50`}
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
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 pb-2 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-white md:text-base">
          {title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs font-light md:text-sm">
          <span className="flex items-center gap-1">
            <Star size={13} fill="red" color="red" />
            {score}
          </span>
        </div>
      </div>

      {top10 && (
        <span className="text-outline-purple group-hover:text-purple absolute top-2 left-1 text-4xl leading-none font-bold text-black select-none group-hover:transition-colors group-hover:duration-100">
          {topIndex}
        </span>
      )}
    </div>
  );
}
