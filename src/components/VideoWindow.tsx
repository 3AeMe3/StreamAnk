

export default function VideoWindow({ videoUrl,onHandleClick }: { videoUrl: string ,onHandleClick: () => void}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-[80%] h-[80%]">
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          title="Trailer"
          allowFullScreen
        ></iframe>
        <button
          onClick={onHandleClick}
          className="cursor-pointer absolute -top-1 -right-10 bg-white text-black px-3 py-1 rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
