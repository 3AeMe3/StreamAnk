import { Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  image: string;
  children?: React.ReactNode;
  cardSize?: "sm" | "md" | "lg" | "xl";
  tag?: string;
  rating: string;

  top10?: boolean;
  topIndex?: number;
}

const sizeCards = {
  sm: "h-40",
  md: "h-60",
  lg: "h-68",
  xl: "h-76",
};

export default function MovieCard({
  title,
  image,
  children,
  cardSize = "md",
  top10 = false,
  topIndex,
  tag,
  rating: score,
}: MovieCardProps) {
  return (
    <div className="relative shrink-0">
      <div
        className={` ${sizeCards[cardSize]} overflow-hidden rounded-xl group transition-all duration-300  hover:z-10 `}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Capa que aparece en hover */}
        <div
          className="absolute inset-x-0 bottom-0 bg-black/60 text-white transform translate-y-full scale-y-75 opacity-0 group-hover:translate-y-0 group-hover:scale-y-100 transition-all ease-out  group-hover:opacity-100 
                  flex flex-col justify-end p-3  duration-500"
        >
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <div className="flex justify-between items-center text-sm font-light">
            <span className="font-extralight">{`${tag}`}</span>
            <span className="flex justify-center items-center gap-1">
              <Star size={15} fill="red" color="red" />
              {score}
            </span>
          </div>
        </div>

        {children}
      </div>
      {top10 && (
        <span className="absolute  -left-12 bottom-22 text-outline-red font-bold text-8xl -z-1   ">
          {topIndex}
        </span>
      )}
    </div>
  );
}
