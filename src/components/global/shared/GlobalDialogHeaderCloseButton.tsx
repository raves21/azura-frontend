import { X } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function GlobalDialogHeaderCloseButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
    >
      <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
    </button>
  );
}
