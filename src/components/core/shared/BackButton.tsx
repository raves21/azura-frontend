import { cn } from "@/lib/utils";
import { LinkProps, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Circle } from "lucide-react";

type Props = {
  linkProps?: LinkProps;
  className?: string;
  arrowIconClassName?: string;
};

export default function BackButton({
  linkProps,
  className,
  arrowIconClassName,
}: Props) {
  const navigate = useNavigate();
  const router = useRouter();

  return (
    <button
      onClick={() => (linkProps ? navigate(linkProps) : router.history.go(-1))}
      className={cn("relative w-min group", className)}
    >
      <ArrowLeft
        className={cn(
          "transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent",
          arrowIconClassName
        )}
      />
      <Circle className="fill-gray-700/20 stroke-none size-[190%] group-hover:opacity-100 opacity-0 transition-opacity rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
