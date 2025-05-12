import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  description?: string;
  className?: string;
} & PropsWithChildren;

export default function AccountSettingSelectionItem({
  description,
  title,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "w-full p-6 bg-socialPrimary flex flex-col gap-5 rounded-lg lg:rounded-xl",
        className
      )}
    >
      <div className="flex flex-col gap-2 w-full xl:w-[600px]">
        <p className="text-lg mobile-l:text-xl font-bold">{title}</p>
        {description && (
          <p className="text-normal mobile-l:text-lg font-medium text-socialTextSecondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
