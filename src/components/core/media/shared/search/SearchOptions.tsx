import { cn } from "@/lib/utils";
import SearchOption from "./SearchOption";

type SearchOptionsProps = {
  searchOptions: string[];
  selectedSearchOption: string;
  setSelectedSearchOption: (option: string) => void;
  className?: string;
};

export default function SearchOptions({
  searchOptions,
  selectedSearchOption,
  setSelectedSearchOption,
  className,
}: SearchOptionsProps) {
  return (
    <div
      className={cn(
        "flex w-full overflow-hidden text-sm font-medium text-gray-300 bg-gray-800 rounded-t-lg mobile-m:text-md md:text-base",
        className
      )}
    >
      {searchOptions.map((option, i) => {
        return (
          <SearchOption
            key={i}
            onSelectOption={(option) => setSelectedSearchOption(option)}
            option={option}
            selectedOption={selectedSearchOption}
          />
        );
      })}
    </div>
  );
}
