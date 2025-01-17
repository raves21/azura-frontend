import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

type PlayNowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const PlayNowButton = forwardRef<HTMLButtonElement, PlayNowButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 px-4 py-4 rounded-full disabled:bg-fuchsia-800 disabled:text-gray-400 mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2 bg-mainAccent",
          className
        )}
      >
        <Play size={20} />
        <p className="hidden font-medium mobile-m:block">Play Now</p>
      </button>
    );
  }
);

export default PlayNowButton
