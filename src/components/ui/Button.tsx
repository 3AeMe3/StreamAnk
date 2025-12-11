import { type LucideIcon } from "lucide-react";

interface ButtonProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onHandleClick?: () => void;
  shape?: "rounded" | "circle";

  Icon?: LucideIcon;
  iconSize?: number;
  iconColor?: string;
  iconFill?: string;
  play?: boolean;
  children?: React.ReactNode;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Button({
  text,
  size = "sm",
  onHandleClick,
  Icon,
  iconSize = 12,
  iconColor,
  iconFill = "transparent",
  shape,
  play,
  children,
}: ButtonProps) {
  const isCircle = shape === "circle";
  return (
    <button
      onClick={onHandleClick}
      className={`flex cursor-pointer items-center justify-center gap-1 border-1 border-white/25 bg-black/20 backdrop-blur-sm hover:scale-105 ${
        play && "bg-white"
      } ${isCircle ? "rounded-full" : "rounded-xl"} ${
        isCircle ? "aspect-square p-2" : "gap-2 px-2 py-[3px]"
      } ${sizeMap[size]}`}
    >
      {Icon && <Icon size={iconSize} color={iconColor} fill={iconFill} />}

      {text}
      {children}
    </button>
  );
}
