import MovieCard from "./MovieCard";
interface MovieRowProps {
  title: string;
}
export default function MovieRow({ title }: MovieRowProps) {
  return (
    <div className=" px-4 my-10">
      <div className="flex justify-between  ">
        <h3 className="font-bold">{title}</h3>
        <button>{">"}</button>
      </div>
      <div className="flex overflow-x-auto gap-4 my-8">
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
      </div>
    </div>
  );
}
