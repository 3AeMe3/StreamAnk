import type { LucideIcon } from "lucide-react";

export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genres?: Genre[];
  genre_ids?: number[];
  media_type?: "movie" | "tv";
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  adult: boolean;
  video: boolean;
  runtime?: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface IconProps {
  Icon: LucideIcon;
  children?: React.ReactNode;
  iconFill?: string;
  iconColor?: string;
}
export interface TagProps {
  text: string;
}
