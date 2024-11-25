import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SideMenuSheetButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const SideMenuSheetButton = forwardRef<
  HTMLButtonElement,
  SideMenuSheetButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "flex font-medium items-center w-full gap-4 py-5 rounded-lg pl-5 mt-auto transition-colors hover:bg-mainAccent text-mainWhite",
        className
      )}
    >
      {props.children}
    </button>
  );
});

export default SideMenuSheetButton;
