import image from "../assets/images/image.png";
export default function MovieCard() {
  return (
    <div className="flex shrink-0">
      <img className="h-45 rounded-xl" src={image} alt="" />
    </div>
  );
}
