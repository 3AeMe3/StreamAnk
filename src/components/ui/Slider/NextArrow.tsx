import { ChevronRight } from "lucide-react";

export default function NextArrow({ className, onClick, style }: any) {
  return (
    <button
      onClick={onClick}
      className={`absolute right-1 ${className}`}
      style={{
        ...style,
      }}
    >
      <ChevronRight
        size={30}
        className="  text-white/50 transition-all ease-in-out hover:scale-125  hover:duration-500 hover:text-white   "
      />
    </button>
  );
}
