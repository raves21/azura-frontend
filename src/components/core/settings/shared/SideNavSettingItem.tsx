import { cn } from "@/lib/utils";
import { ReactNode } from "@tanstack/react-router";

type Props = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  isSelected: boolean;
};

export default function SideNavSettingItem({
  icon,
  label,
  onClick,
  isSelected,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center pl-3 rounded-lg py-3 gap-4 transition-colors",
        {
          "bg-mainAccent/30": isSelected,
        }
      )}
    >
      {icon}
      <p className="font-semibold text-lg">{label}</p>
    </button>
  );
}
