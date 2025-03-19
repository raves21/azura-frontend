import { useManageCollectionStore } from "@/utils/stores/useManageCollectionStore";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import CollectionPhoto from "../CollectionPhoto";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type ManageCollectionPhotoProps = {
  previewPosters: string[];
};

export default function ManageCollectionPhotoPage({
  previewPosters,
}: ManageCollectionPhotoProps) {
  const [collectionPhoto, setCollectionPhoto, setManageCollectionPage] =
    useManageCollectionStore(
      useShallow((state) => [
        state.collectionPhoto,
        state.setCollectionPhoto,
        state.setManageCollectionPage,
      ])
    );

  const [collectionPhotoURLInput, setCollectionPhotoURLInput] = useState<
    string | null
  >(collectionPhoto);

  const [isImageError, setIsImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  function handleImageLoadSuccess() {
    setIsImageError(false);
    setIsImageLoading(false);
  }

  function handleImageLoadError() {
    setIsImageError(true);
    setIsImageLoading(false);
  }

  function handleConfirmAvatar(avatarURL: string | null) {
    if (isImageError) {
      setCollectionPhoto(null);
    } else {
      setCollectionPhoto(avatarURL);
    }
    setManageCollectionPage("manageCollectionDetails");
  }

  function handleURLInputChange(inputText: string) {
    if (!inputText) {
      setCollectionPhotoURLInput(null);
      setIsImageLoading(false);
    } else {
      setCollectionPhotoURLInput(inputText);
      setIsImageLoading(true);
      setIsImageError(false);
    }
  }

  return (
    <div className="flex flex-col px-4 size-full">
      <div className="flex w-full gap-3 h-[70%] my-auto">
        <div className="relative grid w-1/2 overflow-hidden rounded-md size-auto aspect-square place-items-center">
          {collectionPhoto && !previewPosters ? (
            <CollectionPhoto
              className="absolute size-full"
              type="photo"
              photo={collectionPhoto}
            />
          ) : (
            <CollectionPhoto
              className="absolute size-full"
              type="previewPosters"
              previewPosters={previewPosters}
            />
          )}
          <div
            className={cn(
              "absolute size-full",
              !collectionPhotoURLInput || isImageError || isImageLoading
                ? "border-mainAccent"
                : "border-socialPrimary"
            )}
          >
            {isImageLoading && (
              <div className="absolute flex items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 size-full bg-socialPrimary">
                <p className="font-medium text-md">Loading</p>
                <LoaderCircle className="animate-spin size-5 stroke-mainAccent" />
              </div>
            )}
            {collectionPhotoURLInput && (
              <img
                src={collectionPhotoURLInput}
                className="absolute object-cover size-full"
                onError={handleImageLoadError}
                onLoad={handleImageLoadSuccess}
              />
            )}
            {isImageError && (
              <div className="absolute grid place-items-center size-full bg-socialPrimary">
                Error Image
              </div>
            )}
            {(!collectionPhotoURLInput || isImageError) && (
              <div className="absolute grid -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 place-items-center size-full bg-socialPrimary">
                {/* {!avatarURLInputText ? "No Image" : "Error Image"} */}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-3">
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
              value={collectionPhotoURLInput || ""}
              placeholder="e.g: https://some-image-url.jpg"
              onChange={(e) => handleURLInputChange(e.currentTarget.value)}
              className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 bg-socialPrimary focus:outline-none"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => setCollectionPhoto(collectionPhotoURLInput)}
        className="grid py-2 mb-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        Confirm Photo
      </button>
    </div>
  );
}
