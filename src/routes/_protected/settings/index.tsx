import SettingContent from "@/components/core/settings/shared/SettingContent";
import SettingContentItem from "@/components/core/settings/shared/SettingContentItem";
import DeleteAccountButton from "@/components/core/settings/account/deleteAccount/DeleteAccountButton";
import ChangeEmailSetting from "@/components/core/settings/account/profile/ChangeEmailSetting";
import ChangeHandleSetting from "@/components/core/settings/account/profile/ChangeHandleSetting";
import ChangePasswordSetting from "@/components/core/settings/account/profile/ChangePasswordSetting";
import ChangeProfileSettings from "@/components/core/settings/account/profile/ChangeProfileSettings";
import SideNavSetting from "@/components/core/settings/shared/SideNavSetting";
import SideNavSettingItem from "@/components/core/settings/shared/SideNavSettingItem";
import AccountSettingSessions from "@/components/core/shared/sessions/accountSettingSessions/AccountSettingSessions";
import { createFileRoute } from "@tanstack/react-router";
import { User2, Rows3, Trash, Settings2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import DefaultMovieTVServerSetting from "@/components/core/settings/preferences/DefaultMovieTVServerSetting";
import DefaultAnimeServerSetting from "@/components/core/settings/preferences/DefaultAnimeServerSetting";

export const Route = createFileRoute("/_protected/settings/")({
  component: () => <SettingsPage />,
});

type AccountSettingsSelection =
  | "profile"
  | "sessions"
  | "deleteAccount"
  | "preferences";

function SettingsPage() {
  const [selected, setSelected] =
    useState<AccountSettingsSelection>("preferences");
  const sessionsSettingRef = useRef<HTMLDivElement | null>(null);
  const deleteAccountSettingRef = useRef<HTMLDivElement | null>(null);
  const profileSettingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <section className="w-full pt-[110px] sm:pt-[120px] flex">
      <div className="fixed hidden lg:flex lg:flex-col lg:gap-12 w-[350px]">
        <SideNavSetting label="General">
          <SideNavSettingItem
            icon={<Settings2 className="size-6 stroke-mainWhite" />}
            onClick={() => {
              setSelected("preferences");
              window.scrollTo(0, 0);
            }}
            isSelected={selected === "preferences"}
            label="Preferences"
          />
        </SideNavSetting>
        <SideNavSetting label="Account">
          <SideNavSettingItem
            icon={<User2 className="size-6 stroke-mainWhite" />}
            onClick={() => {
              setSelected("profile");
              profileSettingRef.current?.scrollIntoView();
            }}
            isSelected={selected === "profile"}
            label="Profile"
          />
          <SideNavSettingItem
            icon={<Rows3 className="size-6 stroke-mainWhite" />}
            onClick={() => {
              setSelected("sessions");
              sessionsSettingRef.current?.scrollIntoView();
            }}
            isSelected={selected === "sessions"}
            label="Sessions"
          />
          <SideNavSettingItem
            icon={<Trash className="size-6 stroke-mainWhite" />}
            onClick={() => {
              setSelected("deleteAccount");
              deleteAccountSettingRef.current?.scrollIntoView();
            }}
            isSelected={selected === "deleteAccount"}
            label="Delete Account"
          />
        </SideNavSetting>
      </div>
      <div className="w-full lg:ml-[400px] flex flex-col pb-24">
        <SettingContent title="Preferences">
          <SettingContentItem
            title="Default TV/Movie Server"
            description="Select your preferred default video server for watching Movies/TV Shows"
          >
            <DefaultMovieTVServerSetting />
          </SettingContentItem>
          <SettingContentItem
            title="Default Anime Server"
            description="Select your preferred default video server for watching Anime"
          >
            <DefaultAnimeServerSetting />
          </SettingContentItem>
        </SettingContent>
        <SettingContent
          title="Profile"
          ref={profileSettingRef}
          className="sm:pt-24 pt-20"
        >
          <SettingContentItem
            title="Public Information"
            description="Configure your public information"
          >
            <ChangeProfileSettings />
          </SettingContentItem>
          <SettingContentItem title="Username">
            <ChangeHandleSetting />
          </SettingContentItem>
          <SettingContentItem title="Email">
            <ChangeEmailSetting />
          </SettingContentItem>
          <SettingContentItem title="Password">
            <ChangePasswordSetting />
          </SettingContentItem>
        </SettingContent>
        <SettingContent
          ref={sessionsSettingRef}
          title="Sessions"
          className="sm:pt-24 pt-20"
        >
          <SettingContentItem title="Your active sessions">
            <AccountSettingSessions />
          </SettingContentItem>
        </SettingContent>
        <SettingContent
          ref={deleteAccountSettingRef}
          title="Delete Account"
          className="sm:pt-24 pt-20"
        >
          <SettingContentItem
            className="flex-col items-start 1440:flex-row"
            title="Delete your account"
            description="This action is permanent and cannot be undone. You gotta think this through buddy."
          >
            <DeleteAccountButton />
          </SettingContentItem>
        </SettingContent>
      </div>
    </section>
  );
}
