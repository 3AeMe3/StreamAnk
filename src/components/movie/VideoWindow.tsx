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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onHandleClick}
      role="dialog"
      aria-modal="true"
      aria-label="Movie Trailer"
    >
      <div className="relative w-[80%] h-[80%] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          title="Trailer"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <button
          onClick={onHandleClick}
          aria-label="Close Trailer"
          className="absolute -top-3 -right-3 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow-md transition-transform hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
