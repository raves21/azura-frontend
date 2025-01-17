import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type InfoPageVariant = {
  variant: "infoPage";
};

type WatchPageVariant = {
  variant: "watchPage";
  episodeListMaxHeight?: number;
};

type EpisodesContainerProps = PropsWithChildren &
  (InfoPageVariant | WatchPageVariant);

export default function EpisodesContainer({
  children,
  variant,
  ...props
}: EpisodesContainerProps) {
  const watchPageProps =
    variant === "watchPage" ? (props as WatchPageVariant) : null;

  return (
    <div
      style={{
        maxHeight:
          variant === "watchPage" && window.innerWidth >= 1024
            ? watchPageProps?.episodeListMaxHeight
            : "auto",
      }}
      className={cn(
        "flex flex-col w-full pt-8 space-y-6 text-sm lg:text-base",
        { "lg:w-[550px] lg:pt-0": variant === "watchPage" },
        { "mb-16": variant === "infoPage" }
      )}
    >
      {children}
    </div>
  );
}
