import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type Props = {
  onClick: () => void;
  className?: string
};

export default function GlobalDialogHeaderCloseButton({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn("group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary", className)}
    >
      <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
    </button>
  );
}
