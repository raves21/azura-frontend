import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";

type DescriptionProps = {
  description: string | undefined;
  className?: string;
  adjustHeightBasedOnWidth?: boolean;
  showDescriptionLabel: boolean;
};

export default function Description({
  className,
  description,
  adjustHeightBasedOnWidth,
  showDescriptionLabel
}: DescriptionProps) {
  const [readMore, setReadMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const windowWidth = useWindowWidth();

  useEffect(
    () => {
      if (descriptionRef.current) {
        setDescriptionHeight(
          descriptionRef.current.getBoundingClientRect().height
        );
      }
    },
    adjustHeightBasedOnWidth ? [windowWidth] : []
  );

  return (
    <div className={cn("relative gap-3 mt-2 w-[75%]", className)}>
      {showDescriptionLabel && (
        <p className="mb-3 text-lg font-semibold lg:hidden">Description</p>
      )}
      <motion.div
        initial={{
          height: "80px"
        }}
        animate={{
          height: readMore ? "auto" : "80px"
        }}
        transition={{
          duration: 0.2
        }}
        style={{
          maskImage:
            readMore || descriptionHeight <= 80
              ? ""
              : "linear-gradient(to bottom, white 1%, transparent)",
          WebkitMaskImage:
            readMore || descriptionHeight <= 80
              ? ""
              : "linear-gradient(to bottom, white 1%, transparent)"
        }}
        className="relative overflow-hidden text-gray-400"
      >
        <p ref={descriptionRef}>
          {`${description ? description.replace(/<[^>]*>/g, "") : "No Description"}`}
        </p>
      </motion.div>
      {descriptionHeight > 80 && (
        <motion.div
          animate={{
            height: readMore ? `${descriptionHeight}px` : "80px"
          }}
          transition={{
            duration: 0.2
          }}
          className="absolute w-full -bottom-3"
        >
          <button
            onClick={() => setReadMore(!readMore)}
            className="absolute left-0 flex gap-3 -bottom-6"
          >
            <p className="text-gray-400">
              {readMore ? "Read Less" : "Read More"}
            </p>
            <ChevronDown
              stroke="#9ca3af"
              className={`${readMore && "rotate-180"} duration-500 transition-transform`}
            />
          </button>
        </motion.div>
      )}
    </div>
  );
}
