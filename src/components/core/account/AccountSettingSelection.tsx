import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";

type Props = {
  title: string;
  className?: string;
} & PropsWithChildren &
  HTMLAttributes<HTMLDivElement>;

const AccountSettingSelection = forwardRef<HTMLDivElement, Props>(
  ({ title, children, className }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-8 w-full", className)}>
      <h2 className="font-bold text-3xl sm:text-4xl pb-4 border-b border-socialTextSecondary">
        {title}
      </h2>
      {children}
    </div>
  )
);

export default AccountSettingSelection;
