import AccountSettingSelection from "@/components/core/account/AccountSettingSelection";
import AccountSettingSelectionItem from "@/components/core/account/AccountSettingSelectionItem";
import DeleteAccountButton from "@/components/core/account/deleteAccount/DeleteAccountButton";
import ChangeEmailSetting from "@/components/core/account/profile/ChangeEmailSetting";
import ChangeHandleSetting from "@/components/core/account/profile/ChangeHandleSetting";
import ChangePasswordSetting from "@/components/core/account/profile/ChangePasswordSetting";
import ChangeProfileSettings from "@/components/core/account/profile/ChangeProfileSettings";
import Sessions from "@/components/core/account/sessions/Sessions";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Rows3, Trash, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_protected/account/")({
  component: () => <SettingsPage />,
});

type AccountSettingsSelection = "profile" | "sessions" | "deleteAccount";

function SettingsPage() {
  const [selected, setSelected] = useState<AccountSettingsSelection>("profile");
  const sessionsSettingRef = useRef<HTMLDivElement | null>(null);
  const deleteAccountSettingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <section className="w-full pt-[110px] sm:pt-[120px] flex">
      <div className="fixed hidden lg:block w-[350px] space-y-4">
        <p className="text-gray-400 font-medium">Account Settings</p>
        <div className="flex flex-col">
          <button
            onClick={() => {
              setSelected("profile");
              window.scrollTo(0, 0);
            }}
            className={cn(
              "flex items-center pl-3 rounded-lg py-3 gap-4 transition-colors",
              {
                "bg-mainAccent/30": selected === "profile",
              }
            )}
          >
            <User2 className="size-6 stroke-mainWhite" />
            <p className="font-semibold text-lg">Profile</p>
          </button>
          <button
            onClick={() => {
              setSelected("sessions");
              sessionsSettingRef.current?.scrollIntoView();
            }}
            className={cn(
              "flex items-center pl-3 rounded-lg py-3 gap-4 transition-colors",
              {
                "bg-mainAccent/30": selected === "sessions",
              }
            )}
          >
            <Rows3 className="size-6 stroke-mainWhite" />
            <p className="font-semibold text-lg">Sessions</p>
          </button>
          <button
            onClick={() => {
              setSelected("deleteAccount");
              deleteAccountSettingRef.current?.scrollIntoView();
            }}
            className={cn(
              "flex items-center pl-3 rounded-lg py-3 gap-4 transition-colors",
              {
                "bg-mainAccent/30": selected === "deleteAccount",
              }
            )}
          >
            <Trash className="size-6 stroke-mainWhite" />
            <p className="font-semibold text-lg">Delete Account</p>
          </button>
        </div>
      </div>
      <div className="w-full lg:ml-[400px] flex flex-col pb-24">
        <AccountSettingSelection title="Profile">
          <AccountSettingSelectionItem
            title="Public Information"
            description="Configure your public information"
          >
            <ChangeProfileSettings />
          </AccountSettingSelectionItem>
          <AccountSettingSelectionItem title="Handle">
            <ChangeHandleSetting />
          </AccountSettingSelectionItem>
          <AccountSettingSelectionItem title="Email">
            <ChangeEmailSetting />
          </AccountSettingSelectionItem>
          <AccountSettingSelectionItem title="Password">
            <ChangePasswordSetting />
          </AccountSettingSelectionItem>
        </AccountSettingSelection>
        <AccountSettingSelection
          ref={sessionsSettingRef}
          title="Sessions"
          className="sm:pt-24 pt-20"
        >
          <AccountSettingSelectionItem title="Your active sessions">
            <Sessions />
          </AccountSettingSelectionItem>
        </AccountSettingSelection>
        <AccountSettingSelection
          ref={deleteAccountSettingRef}
          title="Delete Account"
          className="sm:pt-24 pt-20"
        >
          <AccountSettingSelectionItem
            className="flex-col items-start 1440:flex-row"
            title="Delete your account"
            description="This action is permanent and cannot be undone. You gotta think this through buddy."
          >
            <DeleteAccountButton />
          </AccountSettingSelectionItem>
        </AccountSettingSelection>
      </div>
    </section>
  );
}
