import SideMenuSheetButton from "./SideMenuSheetButton";
import { Settings } from "lucide-react";

export default function SettingsButton() {
  return (
    <SideMenuSheetButton>
      <Settings className="size-6 stroke-mainWhite" />
      <p>Settings</p>
    </SideMenuSheetButton>
  );
}
