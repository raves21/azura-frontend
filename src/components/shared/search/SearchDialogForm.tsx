import { PropsWithChildren } from "react";

type SearchDialogFormProps = PropsWithChildren & {
  search: string;
  handleEnterPress: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchDialogForm({
  search,
  children,
  handleEnterPress,
}: SearchDialogFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (search.trim().length >= 1) {
          handleEnterPress(e);
        }
      }}
    >
      {children}
      <input type="submit" className="hidden" />
    </form>
  );
}
