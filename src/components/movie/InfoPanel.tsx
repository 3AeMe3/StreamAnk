import { CalendarDays, Clock, Star, Play, Plus, Download } from "lucide-react";
import { vote_avergate } from "../../utils/formatters";
import type { IconProps } from "../../interfaces/movie";

import Button from "../ui/Button";

interface Gender {
  id: number;
  name: string;
}

interface InfoPanelProps {
  title: string;
  description: string;
  genres?: Gender[];
  age?: string;
  time?: string;
  score: number;
}

export default function InfoPanel({
  title,
  description,
  genres = [],
  age,
  time,
  score,
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

  const Tag = ({ text }: { text: string }) => (
    <span className=" rounded-xl px-2 py-[0.15rem] bg-white/15">{text}</span>
  );

  return (
    <div className="absolute bottom-0 flex flex-col gap-2 mb-3 px-20">
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
      <p className="text-sm max-w-xl">{description}</p>
      <div className="flex  items-center gap-2">
        <Button
          Icon={Play}
          iconFill="black"
          iconColor="black"
          shape="circle"
          play
        ></Button>
        <Button Icon={Plus} shape="circle"></Button>
        <Button Icon={Download} shape="circle"></Button>
        <button className="rounded-md px-2 py-[0.15rem] border-1 border-white/30 text-[0.7rem] bg-black/5">
          Similars
        </button>
      </div>
    </div>
  );
}
