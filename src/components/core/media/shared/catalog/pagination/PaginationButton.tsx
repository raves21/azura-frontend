import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
};

//TODO: make this a Link instead of a button
const PaginationButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, isSelected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-gray-700 font-medium size-10 text-sm mobile-m:size-12 mobile-m:text-base grid place-items-center transition-colors duration-100 rounded-full hover:border-mainAccent hover:bg-mainAccent",
          { "bg-mainAccent": isSelected },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default PaginationButton;
