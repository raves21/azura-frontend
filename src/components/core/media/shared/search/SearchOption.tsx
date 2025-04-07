import { cn } from "@/lib/utils";

type Props = {
  option: string;
  selectedOption: string;
  onSelectOption: (option: string) => void;
};

export default function SearchOption({
  onSelectOption,
  option,
  selectedOption,
}: Props) {
  return (
    <button
      onClick={() => onSelectOption(option)}
      className={cn("grid flex-grow py-4 place-items-center", {
        "bg-mainAccent text-mainWhite font-semibold transition-colors duration-300":
          selectedOption === option,
      })}
    >
      {option}
    </button>
  );
}
