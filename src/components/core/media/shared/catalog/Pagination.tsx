import usePagination from "@mui/material/usePagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, ButtonHTMLAttributes } from "react";

//PAGINATION BUTTON

type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
};

//TODO: make this a Link instead of a button
const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, children, isSelected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-gray-700 font-medium size-10 text-sm mobile-m:size-12 mobile-m:text-base grid place-items-center transition-colors duration-100 rounded-full hover:border-mainAccent hover:bg-mainAccent",
          { "bg-mainAccent": isSelected },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

//PAGINATION COMPONENT

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
  className?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  className
}: PaginationProps) {
  const { items } = usePagination({
    onChange: handlePageChange,
    count: totalPages,
    page: currentPage
  });

  return (
    <nav className={className}>
      <ul className="flex flex-wrap items-center justify-center w-full gap-2 px-2">
        {items.map((item, index) => {
          const { page, selected, type } = item;
          let child = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            child = "…";
          } else if (type === "page") {
            child = (
              <PaginationButton
                type="button"
                isSelected={selected}
                onClick={item.onClick}
                disabled={item.disabled || selected}
              >
                {page}
              </PaginationButton>
            );
          } else {
            if (
              (type === "previous" && currentPage === 1) ||
              (type === "next" && currentPage === totalPages)
            ) {
              child = null;
            } else {
              child = (
                <PaginationButton
                  type="button"
                  isSelected={selected}
                  onClick={item.onClick}
                  disabled={item.disabled || selected}
                >
                  {type === "previous" ? (
                    <ChevronLeft className="size-6 stroke-white" />
                  ) : (
                    <ChevronRight className="size-6 stroke-white" />
                  )}
                </PaginationButton>
              );
            }
          }

          return <li key={index}>{child}</li>;
        })}
      </ul>
    </nav>
  );
}
