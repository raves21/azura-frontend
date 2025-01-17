import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type InfoDetailsProps = PropsWithChildren & {
  className?: string;
  isMobile?: boolean;
};

export default function InfoDetails({
  className,
  children,
  isMobile,
}: InfoDetailsProps) {
  return (
    <div
      className={cn(
        "w-full space-y-2",
        { "hidden lg:block": !isMobile, "lg:hidden": isMobile },
        className
      )}
    >
      {isMobile && (
        <p className="mb-1 text-lg font-semibold lg:hidden">Details</p>
      )}
      {children}
    </div>
  );
}
