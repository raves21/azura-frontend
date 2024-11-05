import { PropsWithChildren } from "react";

export default function SearchDialogContainer({ children }: PropsWithChildren) {
  return <div className="px-2 w-dvw sm:px-8 md:max-w-[800px]">{children}</div>;
}
