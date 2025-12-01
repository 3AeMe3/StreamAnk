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
        className={` relative  m-2 overflow-hidden  group transition-all duration-300  hover:z-10 `}
        onClick={onHandleClick}
      >
        <img
          src={image}
          alt={title}
          onError={(e) => (e.currentTarget.src = placeholderImage)}
          className="w-full xl:w-full object-cover transition-all duration-300 hover:scale-110  hover:brightness-70  "
          loading="lazy"
        />

        {/* Capa que aparece en hover */}
        <div
          className="absolute inset-x-0 bottom-0  text-white transform translate-y-full scale-y-75 opacity-0 group-hover:translate-y-0 group-hover:scale-y-100 transition-all ease-out  group-hover:opacity-100 
                  flex flex-col justify-end p-3 pb-2  duration-500 pointer-events-none    "
        >
          <h3 className="text-white text-lg font-semibold ">{title}</h3>
          <div className="flex justify-between items-center text-sm font-light">
            <span className="font-extralight">{`${tag}`}</span>
            <span className="flex justify-center items-center gap-1">
              <Star size={15} fill="red" color="red" />
              {score}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
