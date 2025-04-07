import { cn } from "@/lib/utils";

type Props = {
  label: string;
  info: string | undefined | null;
  className?: string;
  labelClassName?: string;
  infoClassName?: string;
};

export default function InfoItem({
  label,
  info,
  className,
  labelClassName,
  infoClassName,
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <p className={cn("text-gray-400", labelClassName)}>{label}</p>
      <p className={cn("", infoClassName)}>{info || "N/A"}</p>
    </div>
  );
}
