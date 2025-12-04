import { useRef, type ReactEventHandler } from "react";

import { CalendarDays, Clock, Star, Play, Plus, Download } from "lucide-react";
import { vote_avergate } from "../../utils/formatters";
import type { IconProps, TagProps } from "../../interfaces/movie";

import Button from "../ui/Button";

interface Genre {
  id: number;
  name: string;
}

interface InfoPanelProps {
  title: string;
  description: string;
  genres?: Genre[];
  age?: string;
  time?: string;
  score: number;
  trailer: string;
  scrollToSimilarMovies: () => void;
}

export default function InfoPanel({
  title,
  description,
  genres = [],
  age,
  time,
  score,
  trailer,
  scrollToSimilarMovies,
}: InfoPanelProps) {
  const IconText = ({
    Icon,
    iconFill = "transparent",
    children,
  }: IconProps) => (
    <span className="flex  items-center gap-1 text-[0.7rem] text-center">
      <Icon fill={iconFill} className="w-3 h-3 relative top-[-0.7px]" />
      {children}
    </span>
  );

  const Tag = ({ text }: TagProps) => (
    <span className=" rounded-xl px-2 py-[0.15rem] bg-white/15">{text}</span>
  );

  const watchTrailer = trailer.replace("embed/", "watch?v=");

  const shortDescription = description.slice(0, 400).concat("...");

  return (
    <div className="absolute bottom-0 flex flex-col gap-2 mb-3 mx-2 xl:mx-20">
      <h1 className="lg:text-5xl">{title}</h1>
      <div className="flex gap-2">
        <IconText Icon={CalendarDays}>{age}</IconText>
        <IconText Icon={Clock}>{time}</IconText>
        <IconText iconFill="yellow" Icon={Star}>
          {vote_avergate(score, "")}
        </IconText>
      </div>
      <div className="flex gap-2 text-[0.6rem]">
        {genres.map((genre) => (
          <Tag key={genre.id} text={genre?.name} />
        ))}
      </div>
      <p className="text-sm max-w-xl line-clamp-3 ">{shortDescription}</p>
      <div className="flex  items-center gap-2">
        <Button
          Icon={Play}
          iconFill="black"
          iconColor="black"
          shape="circle"
          play
          onHandleClick={() => window.open(watchTrailer, "_blank")}
        ></Button>
        <Button Icon={Plus} shape="circle"></Button>
        <Button Icon={Download} shape="circle"></Button>
        <Button size="sm" onHandleClick={scrollToSimilarMovies}>
          Similars
        </Button>
      </div>
    </div>
  );
}
