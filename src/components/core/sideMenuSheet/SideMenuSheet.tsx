import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";

export default function MenuSheet() {
  return (
    <div className="flex flex-col px-3 py-5 size-full bg-darkBg">
      <div className="w-full mt-auto">
        <SettingsButton />
        <LogoutButton />
      </div>
    </div>
  );
}
