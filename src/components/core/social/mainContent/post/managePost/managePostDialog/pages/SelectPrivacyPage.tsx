import { cn } from "@/lib/utils";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";
import { EntityPrivacy } from "@/utils/types/social/shared";
import { Users, Globe, Lock, Circle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function SelectPrivacyPage() {
  const [selectedPrivacy, setSelectedPrivacy, setManagePostPage] =
    useManagePostStore(
      useShallow((state) => [
        state.selectedPrivacy,
        state.setSelectedPrivacy,
        state.setManagePostPage,
      ])
    );

  const [selectionSelectedPrivacy, setSelectionSelectedPrivacy] =
    useState<EntityPrivacy>(selectedPrivacy);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    const defaultCreatePostPrivacyPreference = localStorage.getItem(
      "defaultCreatePostPrivacyPreference"
    ) as EntityPrivacy;
    if (selectionSelectedPrivacy === defaultCreatePostPrivacyPreference) {
      setIsCheckboxChecked(true);
    } else {
      setIsCheckboxChecked(false);
    }
  }, [selectionSelectedPrivacy]);

  return (
    <div className="flex flex-col justify-between p-4 size-full">
      <div className="flex flex-col">
        <button
          onClick={() => setSelectionSelectedPrivacy("PUBLIC")}
          className="flex items-center justify-between w-full px-3 py-6 rounded-lg hover:bg-gray-800 "
        >
          <div className="flex items-center gap-3">
            <div className="box-content grid p-3 bg-gray-700 rounded-full place-items-center">
              <Globe className="size-6 stroke-mainWhite" />
            </div>
            <div className="flex flex-col text-start">
              <p className="font-semibold">Public</p>
              <p className="text-sm text-socialTextSecondary">
                Anyone on Azura
              </p>
            </div>
          </div>
          <Circle
            className={cn(
              "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
              {
                "bg-mainAccent stroke-2 stroke-socialPrimary":
                  selectionSelectedPrivacy === "PUBLIC",
              }
            )}
          />
        </button>
        <button
          onClick={() => setSelectionSelectedPrivacy("FRIENDS_ONLY")}
          className="flex items-center justify-between w-full px-3 py-6 rounded-lg hover:bg-gray-800 "
        >
          <div className="flex items-center gap-3">
            <div className="box-content grid p-3 bg-gray-700 rounded-full place-items-center">
              <Users className="size-6 stroke-mainWhite" />
            </div>
            <div className="flex flex-col text-start">
              <p className="font-semibold">Friends</p>
              <p className="text-sm text-socialTextSecondary">
                People you follow and follows you
              </p>
            </div>
          </div>
          <Circle
            className={cn(
              "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
              {
                "bg-mainAccent stroke-2 stroke-socialPrimary":
                  selectionSelectedPrivacy === "FRIENDS_ONLY",
              }
            )}
          />
        </button>
        <button
          onClick={() => setSelectionSelectedPrivacy("ONLY_ME")}
          className="flex items-center justify-between w-full px-3 py-6 rounded-lg hover:bg-gray-800 "
        >
          <div className="flex items-center gap-3">
            <div className="box-content grid p-3 bg-gray-700 rounded-full place-items-center">
              <Lock className="size-6 stroke-mainWhite" />
            </div>
            <p className="font-semibold">Only me</p>
          </div>
          <Circle
            className={cn(
              "rounded-full size-6 stroke-1 stroke-socialTextSecondary",
              {
                "bg-mainAccent stroke-2 stroke-socialPrimary":
                  selectionSelectedPrivacy === "ONLY_ME",
              }
            )}
          />
        </button>
      </div>
      <div
        onClick={() => {
          localStorage.setItem(
            "defaultCreatePostPrivacyPreference",
            selectionSelectedPrivacy
          );
          setIsCheckboxChecked(true);
        }}
        className={cn("flex items-center gap-3", {
          "hover:cursor-pointer": !isCheckboxChecked,
        })}
      >
        <div
          className={cn(
            "size-5 rounded-md grid place-items-center border border-mainWhite",
            {
              "bg-mainAccent/80 border-mainAccent/80": isCheckboxChecked,
            }
          )}
        >
          {isCheckboxChecked && (
            <Check className="stroke-[3px] stroke-mainWhite size-[60%]" />
          )}
        </div>
        <p
          className={`${isCheckboxChecked ? "text-socialTextSecondary" : "text-mainWhite"} text-md`}
        >
          Set as default audience
        </p>
      </div>
      <button
        onClick={() => {
          setSelectedPrivacy(selectionSelectedPrivacy);
          setManagePostPage("managePost");
        }}
        className="grid py-2 font-semibold transition-colors bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        Done
      </button>
    </div>
  );
}
