import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type CustomCheckBox = {
  isChecked: boolean;
  onClick?: () => void;
  className?: string;
  checkFillClassName?: string;
};

export default function CustomCheckBox({
  isChecked,
  onClick,
  className,
  checkFillClassName,
}: CustomCheckBox) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-square h-7 relative rounded-md border-[0.5px] overflow-hidden",
        isChecked ? "border-mainAccent" : "border-mainWhite",
        className
      )}
    >
      {isChecked && (
        <div
          className={cn(
            "absolute size-full bg-mainAccent grid place-items-center",
            checkFillClassName
          )}
        >
          <Check className="size-[70%] stroke-mainWhite" />
        </div>
      )}
    </div>
  );
}
