import { useEffect, useState } from "react";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { useShallow } from "zustand/react/shallow";

export default function ManageProfileBannerPage() {
  const [
    editProfileBanner,
    editProfileAvatar
    // setEditProfileBanner
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileBanner,
      state.editProfileAvatar
      // state.setEditProfileBanner
    ])
  );

  const [bannerImagePreview, setBannerImagePreview] =
    useState(editProfileBanner);
  const [bannerURLInputText, setBannerURLInputText] =
    useState(editProfileBanner);

  useEffect(() => {
    setBannerImagePreview(bannerURLInputText);
  }, [bannerURLInputText]);

  return (
    <div className="flex flex-col flex-grow gap-24 overflow-y-auto">
      <div className="relative w-full h-48 shrink-0">
        <div className="absolute size-full">
          {bannerImagePreview ? (
            <img src={bannerImagePreview} className="object-cover size-full" />
          ) : (
            <div className="grid border-b size-full border-socialTextSecondary place-items-center text-md">
              No Image
            </div>
          )}
          <p className="absolute text-gray-300 -translate-x-1/2 -bottom-8 left-1/2 text-md">
            Preview
          </p>
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
          <span className="text-yellow-400">NOTE:</span> If the preview image
          does not change, the image URL you provided was invalid. If that
          happens, please try again with a different image URL.
        </p>
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <p className="font-medium">Banner Image-Address/URL</p>
            <p className="text-sm font-light text-socialTextSecondary"></p>
          </div>
          <input
            placeholder="e.g: https://some-image-url.jpg"
            onChange={(e) => setBannerURLInputText(e.target.value)}
            className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 bg-socialPrimary focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
