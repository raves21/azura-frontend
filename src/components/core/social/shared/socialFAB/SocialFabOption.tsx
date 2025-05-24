import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "@tanstack/react-router";

type Props = {
  onClick: () => void;
  isActive: boolean;
  animationStatus: "intro" | "exit";
  setAnimationStatus: React.Dispatch<React.SetStateAction<"intro" | "exit">>;
  icon: ReactNode;
  label: string;
  bottomValue: number;
  className?: string;
};

export default function SocialFabOption({
  animationStatus,
  icon,
  isActive,
  onClick,
  setAnimationStatus,
  label,
  bottomValue,
  className,
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      animate={{
        bottom: isActive ? bottomValue : 0,
      }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      onAnimationComplete={() =>
        isActive ? setAnimationStatus("intro") : undefined
      }
      className={cn(
        "rounded-full absolute bottom-0 right-0 p-3 bg-socialPrimary",
        { "border-mainAccent border": isActive },
        className
      )}
    >
      <p
        className={cn(
          "absolute top-1/2 whitespace-nowrap -translate-y-1/2 right-14 py-2 px-4 bg-gray-700 rounded-full text-xs opacity-0 transition-opacity duration-300",
          { "opacity-100": animationStatus === "intro" }
        )}
      >
        {label}
      </p>
      {icon}
    </motion.button>
  );
}
