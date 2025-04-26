import { useState } from "react";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useShallow } from "zustand/react/shallow";
import { LoaderCircle } from "lucide-react";

export default function ManageBannerPage() {
  const [
    editProfileBanner,
    editProfileAvatar,
    setEditProfileBanner,
    setEditProfilePage,
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileBanner,
      state.editProfileAvatar,
      state.setEditProfileBanner,
      state.setEditProfilePage,
    ])
  );

  const [bannerURLInputText, setBannerURLInputText] =
    useState(editProfileBanner);
  const [isImageError, setIsImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  function handleConfirmBanner(bannerURL: string | null) {
    if (isImageError) {
      setEditProfileBanner(null);
    } else {
      setEditProfileBanner(bannerURL);
    }
    setEditProfilePage("editProfilePage");
  }

  function handleImageLoadError() {
    setIsImageError(true);
    setIsImageLoading(false);
  }

  function handleImageLoadSuccess() {
    setIsImageError(false);
    setIsImageLoading(false);
  }

  function handleURLInputChange(inputText: string) {
    if (inputText === "") {
      setBannerURLInputText(null);
      setIsImageLoading(false);
    } else {
      setBannerURLInputText(inputText);
      setIsImageLoading(true);
      setIsImageError(false);
    }
  }

  return (
    <>
      <div className="flex flex-col flex-grow gap-[93px] overflow-y-auto">
        <div className="relative w-full h-28 sm:h-44 md:h-48 shrink-0">
          <div className="absolute size-full">
            {isImageLoading && (
              <div className="absolute flex items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2 border-b size-full top-1/2 left-1/2 border-mainAccent text-md">
                <p className="font-medium text-md">Loading</p>
                <LoaderCircle className="animate-spin size-5 stroke-mainAccent" />
              </div>
            )}
            {bannerURLInputText && (
              <img
                onError={handleImageLoadError}
                onLoad={handleImageLoadSuccess}
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
          <div className="absolute -bottom-[38%] left-4 sm:size-24 size-20 lg:size-28 rounded-full  border-4 overflow-hidden box-content border-socialPrimary">
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
              onChange={(e) => handleURLInputChange(e.currentTarget.value)}
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
