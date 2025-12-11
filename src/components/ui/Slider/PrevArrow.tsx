import { ChevronLeft } from "lucide-react";

export default function PrevArrow({ onClick, className }: any) {
  return (
    <div onClick={onClick} className={`block ${className}`}>
      <ChevronLeft
        size={30}
        className="text-white/50 transition-all ease-in-out hover:scale-125 hover:text-white hover:duration-500"
      />
    </div>
  );
}
