import { cn } from "@/lib/utils";

type Props = {
  image: string | undefined;
  className?: string;
  variant: "infoPage" | "watchPage";
};

export default function InfoSectionBackgroundImage({
  image,
  className,
  variant,
}: Props) {
  if (variant === "infoPage") {
    return (
      <div
        className={cn(
          "absolute inset-0 w-dvw left-1/2 ml-[-50vw] max-h-[500px] md:max-h-[600px]",
          className
        )}
      >
        <div className="absolute bg-black/65 size-full backdrop-blur-[1px]"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] via-transparent to-transparent size-full"></div>
        <img src={image} className="object-cover size-full" />
      </div>
    );
  } else {
    return (
      <div className="absolute inset-0 size-full max-h-[500px] rounded-[inherit]">
        <div className="absolute bg-black/60 size-full backdrop-blur-[1px] rounded-[inherit]"></div>
        <div className="absolute bg-gradient-to-r from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-l from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-b from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <div className="absolute bg-gradient-to-t from-darkBg from-[percentage:0%_1%] rounded-[inherit] via-transparent to-transparent size-full"></div>
        <img src={image} className="object-cover rounded-[inherit] size-full" />
      </div>
    );
  }
}
