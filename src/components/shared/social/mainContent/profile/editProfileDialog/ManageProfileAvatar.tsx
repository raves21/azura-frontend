import { useState } from "react";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

export default function ManageProfileAvatar() {
  const [
    editProfileBanner,
    editProfileAvatar,
    setEditProfileAvatar,
    setEditProfilePage
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileBanner,
      state.editProfileAvatar,
      state.setEditProfileAvatar,
      state.setEditProfilePage
    ])
  );

  const [avatarURLInputText, setAvatarURLInputText] =
    useState(editProfileAvatar);
  const [isImageError, setIsImageError] = useState(false);

  function handleConfirmAvatar(avatarURL: string | null) {
    if (isImageError) {
      setEditProfileAvatar(null);
    } else {
      setEditProfileAvatar(avatarURL);
    }
    setEditProfilePage("editProfilePage");
  }

  return (
    <>
      <div className="flex flex-col flex-grow gap-[93px] overflow-y-auto">
        <div className="relative w-full h-48 shrink-0">
          <div className="absolute size-full">
            <img
              src={editProfileBanner ?? "/no-image-2.jpg"}
              className="object-cover size-full"
            />
          </div>
          <div
            className={cn(
              "absolute -bottom-[38%] left-4 size-[120px] rounded-full overflow-hidden border-4 box-content",
              !avatarURLInputText || isImageError
                ? "border-mainAccent"
                : "border-socialPrimary"
            )}
          >
            {avatarURLInputText && (
              <img
                src={avatarURLInputText}
                className="absolute object-cover size-full"
                onError={() => setIsImageError(true)}
                onLoad={() => setIsImageError(false)}
              />
            )}
            {(!avatarURLInputText || isImageError) && (
              <div className="absolute grid -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 place-items-center size-full bg-socialPrimary">
                {!avatarURLInputText ? "No Image" : "Error Image"}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 px-5 mb-8">
          <p className="text-sm text-center text-socialTextSecondary">
            <span className="text-yellow-400">NOTE:</span> If the preview shows
            &quot;Error Image&quot;, that means the URL you provided was invalid
            or the image source prohibits hotlinking. If that happens, please
            try again with a different image.
          </p>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Avatar Image-Address/URL</p>
              <p className="text-sm font-light text-socialTextSecondary"></p>
            </div>
            <input
              value={avatarURLInputText || ""}
              placeholder="e.g: https://some-image-url.jpg"
              onChange={(e) => {
                if (e.currentTarget.value === "") {
                  setAvatarURLInputText(null);
                } else {
                  setAvatarURLInputText(e.target.value);
                }
              }}
              className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 bg-socialPrimary focus:outline-none"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleConfirmAvatar(avatarURLInputText)}
        className="grid py-2 m-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        Confirm Avatar
      </button>
    </>
  );
}
