import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

type AddToListButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const AddToListButton = forwardRef<HTMLButtonElement, AddToListButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "hover:scale-[1.02] transition-transform duration-200 flex items-center gap-2 px-4 py-4 bg-black rounded-full mobile-m:px-4 mobile-m:py-3 lg:px-5 lg:py-2",
          className
        )}
      >
        <Bookmark size={20} />
        <p className="hidden font-medium mobile-m:block">Collections</p>
      </button>
    );
  }
);

export default AddToListButton
