import { cn } from "@/lib/utils";
import { LinkProps, Link } from "@tanstack/react-router";
import { TContentOption } from "@/utils/types/social/shared";
import { isEqual } from "radash";

type ContentOptionProps = {
  option: TContentOption;
  selectedOption: TContentOption;
  linkProps: LinkProps;
  onSelectOption: () => void;
};

export default function ContentOption({
  option,
  selectedOption,
  linkProps,
  onSelectOption,
}: ContentOptionProps) {
  return (
    <Link
      {...linkProps}
      onClick={onSelectOption}
      className={cn(
        "grid flex-grow py-3 place-items-center",
        isEqual(option, selectedOption)
          ? "decoration-mainAccent underline underline-offset-4"
          : "hover:bg-socialPrimaryHover"
      )}
    >
      {option.name}
    </Link>
  );
}
