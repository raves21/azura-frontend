import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useHandleClickOutside } from "@/utils/hooks/useHandleClickOutside";

type Props<T> = {
  menuItems: T[];
  menuItemLabelNames?: string[];
  onSelectItem: (item: T) => void;
  currentlySelected: T | null;
  menuContentMaxHeight: number;
  menuContentClassName?: string;
  menuItemClassName?: string;
  dropdownTriggerClassName?: string;
  showMenuContentBorder?: boolean;
  fitMenuContent?: boolean;
};

export default function CustomDropdown<T>({
  menuItems,
  onSelectItem,
  currentlySelected,
  menuItemLabelNames,
  dropdownTriggerClassName,
  menuContentClassName,
  menuItemClassName,
  menuContentMaxHeight,
  showMenuContentBorder,
  fitMenuContent = false,
}: Props<T>) {
  const dropdownMenuListRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dropdownMenuListHeight, setDropdownMenuListHeight] = useState<
    number | undefined
  >(0);
  const [isOpen, setIsOpen] = useState(false);

  //for closing the dropdown if user clicks anywhere outside of it
  useHandleClickOutside({
    ref: containerRef,
    callBack: () => setIsOpen(false),
  });

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 text-mainAccent px-4 lg:px-5 py-2 border border-gray-400 rounded-full z-[100]",
          dropdownTriggerClassName
        )}
      >
        <p className="font-medium">
          {currentlySelected
            ? menuItemLabelNames
              ? menuItemLabelNames[menuItems.indexOf(currentlySelected)]
              : `${currentlySelected}`
            : "Any"}
        </p>
        <ChevronDown
          className={`size-4 md:size-6 stroke-gray-400 ${isOpen && "rotate-180"} duration-300 transition-transform`}
        />
      </button>
      <motion.div
        initial={{
          height: 0,
          maxHeight: menuContentMaxHeight,
        }}
        ref={dropdownMenuListRef}
        animate={{
          height: isOpen ? "auto" : "0",
        }}
        transition={{
          duration: 0.2,
        }}
        onAnimationComplete={() => {
          if (dropdownMenuListRef.current && isOpen) {
            setDropdownMenuListHeight(
              dropdownMenuListRef.current.getBoundingClientRect().height
            );
          }
        }}
        className={cn(
          "absolute z-40 overflow-x-hidden top-[50px] right-0 rounded-lg bg-black overflow-y-auto",
          { "w-full": !fitMenuContent },
          { "hide-scrollbar": dropdownMenuListHeight! < menuContentMaxHeight },
          { "border border-gray-400": isOpen && showMenuContentBorder },
          menuContentClassName
        )}
      >
        {menuItems.map((menuItem, i) => (
          <button
            key={i}
            onClick={() => {
              onSelectItem(menuItem);
              setIsOpen(false);
            }}
            className={cn(
              "w-full px-3 py-2 text-gray-400 text-start lg:hover:text-mainAccent whitespace-nowrap",
              menuItemClassName,
              {
                "text-mainAccent": currentlySelected === menuItem,
              }
            )}
          >
            {`${menuItemLabelNames ? menuItemLabelNames[i] : menuItem}`}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
