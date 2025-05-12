import { PropsWithChildren } from "react";

export default function GlobalDialogHeaderTitle({
  children,
}: PropsWithChildren) {
  return <p className="text-lg font-semibold">{children}</p>;
}
