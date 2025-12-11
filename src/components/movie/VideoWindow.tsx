import { X } from "lucide-react";

interface VideoWindowProps {
  videoUrl: string;
  onHandleClick: () => void;
}

export default function VideoWindow({
  videoUrl,
  onHandleClick,
}: VideoWindowProps) {
  return (
    <div
      className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onHandleClick}
      role="dialog"
      aria-modal="true"
      aria-label="Movie Trailer"
    >
      <div
        className="relative h-[40%] w-[90%] xl:h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="h-full w-full rounded-lg"
          src={videoUrl}
          title="Trailer"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <button
          onClick={onHandleClick}
          aria-label="Close Trailer"
          className="absolute -top-3 -right-3 cursor-pointer rounded-full bg-white/90 p-2 text-black shadow-md transition-transform hover:scale-110 hover:bg-white"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
