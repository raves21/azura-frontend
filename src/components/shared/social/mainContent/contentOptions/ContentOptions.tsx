import { useState } from "react";
import ContentOption from "./ContentOption";
import { TContentOption } from "@/utils/types/social/shared";

type ContentOptionsProps = {
  contentOptions: TContentOption[];
  defaultOption: TContentOption;
};

export default function ContentOptions({
  contentOptions,
  defaultOption,
}: ContentOptionsProps) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  return (
    <div className="flex w-full overflow-hidden font-semibold rounded-lg bg-socialPrimary">
      {contentOptions.map((option, i) => (
        <ContentOption
          key={i}
          linkProps={option.linkProps}
          option={option}
          onSelectOption={() => setSelectedOption(option)}
          selectedOption={selectedOption}
        />
      ))}
    </div>
  );
}
