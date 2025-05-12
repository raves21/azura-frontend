import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

export default function GlobalDialogHeader({ className, children }: Props) {
  return (
    <header
      className={cn(
        "relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40",
        className
      )}
    >
      {children}
    </header>
  );
}
