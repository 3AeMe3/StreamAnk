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
  iconFill,
  shape,
}: ButtonProps) {
  const isCircle = shape === "circle";
  return (
    <button
      onClick={onHandleClick}
      className={`  flex justify-center items-center backdrop-blur-xl  gap-1 border-1 border-white/30 bg-black/30 ${
        isCircle ? "rounded-full" : "rounded-xl"
      } ${isCircle ? "aspect-square p-2 bg-white" : "px-2 py-[3px] gap-2"}   ${
        sizeMap[size]
      }`}
    >
      {Icon && <Icon size={iconSize} color={iconColor} fill={iconFill} />}

      {text}
    </button>
  );
}
