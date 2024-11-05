import { motion } from "framer-motion";
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DescriptionProps = {
  description: string | undefined;
  descriptionHeight: number;
  descriptionRef: React.MutableRefObject<HTMLDivElement | null>;
  readMore: boolean;
  setReadMore: (value: React.SetStateAction<boolean>) => void;
  className?: string;
  showDescriptionLabel: boolean
};

export default function Description({
  descriptionHeight,
  descriptionRef,
  readMore,
  setReadMore,
  className,
  description,
  showDescriptionLabel
}: DescriptionProps) {
  return (
    <div
      className={cn(
        "relative gap-3 mt-2 w-[75%]",
        className
      )}
    >
      {showDescriptionLabel && <p className="mb-3 text-lg font-semibold lg:hidden">Description</p>}
      <motion.div
        initial={{
          height: "80px",
        }}
        animate={{
          height: readMore ? "auto" : "80px",
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          maskImage:
            readMore || descriptionHeight <= 80
              ? ""
              : "linear-gradient(to bottom, white 1%, transparent)",
          WebkitMaskImage:
            readMore || descriptionHeight <= 80
              ? ""
              : "linear-gradient(to bottom, white 1%, transparent)",
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
            height: readMore ? `${descriptionHeight}px` : "80px",
          }}
          transition={{
            duration: 0.2,
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
