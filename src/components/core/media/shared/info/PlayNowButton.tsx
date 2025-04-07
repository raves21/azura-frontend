import { cn } from "@/lib/utils";
import { LoaderCircle, Play } from "lucide-react";

type Props = {
  className?: string;
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export default function PlayNowButton({
  isDisabled,
  isLoading,
  onClick,
  className,
}: Props) {
  return (
    <button
      onClick={() => onClick}
      disabled={isDisabled}
      className={cn(
        "hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 px-4 py-4 rounded-full disabled:bg-fuchsia-800 disabled:text-gray-400 mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2 bg-mainAccent",
        className
      )}
    >
      {isLoading ? (
        <LoaderCircle className="stroke-gray-400 animate-spin" size={20} />
      ) : (
        <Play size={20} />
      )}
      <p
        className={cn("hidden font-medium mobile-m:block", {
          "text-gray-400": isLoading || isDisabled,
        })}
      >
        Play Now
      </p>
    </button>
  );
}
