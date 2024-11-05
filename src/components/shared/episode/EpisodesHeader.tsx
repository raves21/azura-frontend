import { PropsWithChildren } from "react";

export default function EpisodesHeader({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold md:text-xl text-mainWhite">
        Episodes
      </p>
      {children}
    </div>
  );
}
