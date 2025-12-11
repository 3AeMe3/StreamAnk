import placeholderImage from "../../assets/images/noImage.jpg";
import { Star } from "lucide-react";
interface MovieGridProps {
  image: string;
  title: string;
  tag: string;
  score: string;
  onHandleClick?: () => void;
}

export default function MovieGrid({
  image,
  title,
  tag,
  score,
  onHandleClick,
}: MovieGridProps) {
  return (
    <>
      <div
        className={`group relative m-2 overflow-hidden transition-all duration-300 hover:z-10`}
        onClick={onHandleClick}
      >
        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = placeholderImage)}
          className="w-full object-cover transition-all duration-300 hover:scale-110 hover:brightness-70 xl:w-full"
          loading="lazy"
        />

        {/* Capa que aparece en hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full scale-y-75 transform flex-col justify-end p-3 pb-2 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-y-100 group-hover:opacity-100">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex items-center justify-between text-sm font-light">
            <span className="font-extralight">{`${tag}`}</span>
            <span className="flex items-center justify-center gap-1">
              <Star size={15} fill="red" color="red" />
              {score}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
