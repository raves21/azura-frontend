import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useHandleClickOutside } from "@/utils/hooks/useHandleClickOutside";

type DropdownFilterProps<T> = {
  menuItems: T[];
  menuItemLabelNames?: Record<string, string>;
  onSelectItem: (item: T) => void;
  currentlySelected: T | null;
};

export default function FilterDropdown<T>({
  menuItems,
  onSelectItem,
  currentlySelected,
  menuItemLabelNames,
}: DropdownFilterProps<T>) {
  const dropdownMenuListRef = useRef<HTMLDivElement | null>(null);
  const parentDivRef = useRef<HTMLDivElement | null>(null);
  const [dropdownMenuListHeight, setDropdownMenuListHeight] = useState<
    number | undefined
  >(0);
  const [isOpen, setIsOpen] = useState(false);
  useHandleClickOutside(parentDivRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={parentDivRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 lg:px-5 py-2 border border-gray-400 rounded-full z-[100]"
      >
        <p className="font-medium text-mainAccent">
          {currentlySelected
            ? menuItemLabelNames
              ? menuItemLabelNames[currentlySelected as string]
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
          "absolute w-fit z-10 overflow-x-hidden top-[50px] right-0 max-h-[300px] rounded-lg bg-black overflow-y-auto",
          dropdownMenuListHeight! < 300 && "hide-scrollbar"
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
              "w-full px-3 py-2 text-gray-400 text-start hover:text-mainAccent whitespace-nowrap",
              {
                "text-mainAccent":
                  (menuItemLabelNames &&
                    menuItemLabelNames[currentlySelected as string] === menuItem) ||
                  currentlySelected === menuItem,
              }
            )}
          >
            {`${menuItemLabelNames ? menuItemLabelNames[menuItem as string] : menuItem}`}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
