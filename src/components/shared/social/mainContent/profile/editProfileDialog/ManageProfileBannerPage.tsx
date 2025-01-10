import { useState } from "react";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useShallow } from "zustand/react/shallow";

export default function ManageProfileBannerPage() {
  const [
    editProfileBanner,
    editProfileAvatar,
    setEditProfileBanner,
    setEditProfilePage
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileBanner,
      state.editProfileAvatar,
      state.setEditProfileBanner,
      state.setEditProfilePage
    ])
  );

  const [bannerURLInputText, setBannerURLInputText] =
    useState(editProfileBanner);
  const [isImageError, setIsImageError] = useState(false);

  function handleConfirmBanner(bannerURL: string | null) {
    if (isImageError) {
      setEditProfileBanner(null);
    } else {
      setEditProfileBanner(bannerURL);
    }
    setEditProfilePage("editProfilePage");
  }

  return (
    <>
      <div className="flex flex-col flex-grow gap-[93px] overflow-y-auto">
        <div className="relative w-full h-48 shrink-0">
          <div className="absolute size-full">
            {bannerURLInputText && (
              <img
                onError={() => {
                  setIsImageError(true);
                }}
                onLoad={() => {
                  setIsImageError(false);
                }}
                src={bannerURLInputText}
                className="object-cover size-full"
              />
            )}
            {(!bannerURLInputText || isImageError) && (
              <div className="absolute grid -translate-x-1/2 -translate-y-1/2 border-b size-full top-1/2 left-1/2 border-mainAccent place-items-center text-md">
                {!bannerURLInputText ? "No Image" : "Error Image"}
              </div>
            )}
          </div>
          <div className="absolute -bottom-[38%] left-4 size-[120px] rounded-full  border-4 overflow-hidden box-content border-socialPrimary">
            <img
              src={editProfileAvatar ?? "/no-image-2.jpg"}
              alt="avatar"
              className="object-cover size-full"
            />
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
              <p className="font-medium">Banner Image-Address/URL</p>
              <p className="text-sm font-light text-socialTextSecondary"></p>
            </div>
            <input
              value={bannerURLInputText || ""}
              placeholder="e.g: https://some-image-url.jpg"
              onChange={(e) => setBannerURLInputText(e.target.value)}
              className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 bg-socialPrimary focus:outline-none"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleConfirmBanner(bannerURLInputText)}
        className="grid py-2 m-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        Confirm Banner
      </button>
    </>
  );
}
