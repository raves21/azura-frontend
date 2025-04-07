// import { X } from "lucide-react"
import { cn } from "@/lib/utils";

type Props = {
  className: string;
  label: string;
};

export default function AppliedFilterPill({ className, label }: Props) {
  return (
    <div
      className={cn(
        "px-4 py-2 flex rounded-full whitespace-nowrap text-xs md:text-sm lg:text-base items-center justify-center",
        className
      )}
    >
      <p>{label}</p>
    </div>
  );
}
