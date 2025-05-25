import { PropsWithChildren } from "react";

type Props = {
  label: string;
} & PropsWithChildren;

export default function SideNavSetting({ label, children }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-gray-400 font-medium">{label}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
