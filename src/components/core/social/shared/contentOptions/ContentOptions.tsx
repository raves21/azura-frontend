import ContentOption from "./ContentOption";
import { TContentOption } from "@/utils/types/social/shared";

type Props = {
  contentOptions: TContentOption[];
  selectedOption: TContentOption;
  setSelectedOption: (option: TContentOption) => void;
};

export default function ContentOptions({
  contentOptions,
  selectedOption,
  setSelectedOption,
}: Props) {
  return (
    <div className="flex w-full overflow-hidden font-semibold rounded-lg bg-socialPrimary">
      {contentOptions.map((option, i) => (
        <ContentOption
          key={i}
          linkProps={option.linkProps || {}}
          option={option}
          onSelectOption={(option) => setSelectedOption(option)}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
}
