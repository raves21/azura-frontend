import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  showEpisodesLabel?: boolean;
  className?: string;
} & PropsWithChildren;

export default function EpisodesHeader({
  children,
  className,
  showEpisodesLabel = true,
}: Props) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {showEpisodesLabel && (
        <p className="text-lg font-semibold md:text-xl text-mainWhite">
          Episodes
        </p>
      )}
      {children}
    </div>
  );
}
