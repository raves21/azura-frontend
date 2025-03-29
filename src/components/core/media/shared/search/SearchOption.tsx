import { cn } from "@/lib/utils";

type SearchOptionProps = {
  option: string;
  selectedOption: string;
  onSelectOption: (option: string) => void;
};

export default function SearchOption({
  onSelectOption,
  option,
  selectedOption,
}: SearchOptionProps) {
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
