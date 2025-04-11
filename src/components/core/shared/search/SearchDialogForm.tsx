import { PropsWithChildren } from "react";

type SearchDialogFormProps = PropsWithChildren & {
  searchInput: string;
  handleEnterPress: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchDialogForm({
  searchInput,
  children,
  handleEnterPress
}: SearchDialogFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (searchInput.trim().length >= 1) {
          handleEnterPress(e);
        }
      }}
    >
      {children}
      <input type="submit" className="hidden" />
    </form>
  );
}
