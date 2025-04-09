import { useManageCollectionStore } from "@/utils/stores/useManageCollectionStore";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import CollectionPhoto from "../../CollectionPhoto";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function ManageCollectionPhotoPage() {
  const [
    collectionPhoto,
    collectionPreviewPosters,
    setCollectionPhoto,
    setManageCollectionPage,
  ] = useManageCollectionStore(
    useShallow((state) => [
      state.collectionPhoto,
      state.collectionPreviewPosters,
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

  function handleConfirmCollectionPhoto(
    collectionPhotoURLInput: string | null
  ) {
    if (isImageError) {
      setCollectionPhoto(null);
    } else {
      setCollectionPhoto(collectionPhotoURLInput);
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
          {collectionPhoto && (
            <CollectionPhoto
              className="absolute size-full"
              type="photo"
              photo={collectionPhoto}
            />
          )}
          {collectionPreviewPosters && (
            <CollectionPhoto
              className="absolute size-full"
              type="previewPosters"
              previewPosters={collectionPreviewPosters}
            />
          )}
          <div
            className={cn("absolute size-full rounded-md", {
              "border-mainAccent border-4":
                !collectionPhotoURLInput || isImageError || isImageLoading,
            })}
          >
            {isImageLoading && (
              <div className="absolute flex items-center justify-center gap-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-full bg-socialPrimary">
                <p className="font-medium text-md">Loading</p>
                <LoaderCircle className="animate-spin size-5 stroke-mainAccent" />
              </div>
            )}
            {collectionPhotoURLInput && (
              <img
                src={collectionPhotoURLInput}
                className="absolute object-cover size-full rounded-md"
                onError={handleImageLoadError}
                onLoad={handleImageLoadSuccess}
              />
            )}
            {collectionPhotoURLInput && isImageError && (
              <div className="absolute grid place-items-center size-full bg-socialPrimary">
                Error Image
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-6">
          <p className="text-sm text-center text-socialTextSecondary">
            <span className="text-yellow-400">NOTE:</span> If the preview shows
            &quot;Error Image&quot;, that means the URL you provided was invalid
            or the image source prohibits hotlinking. If that happens, please
            try again with a different image URL.
          </p>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Image-Address/URL</p>
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
        disabled={isImageError}
        onClick={() => handleConfirmCollectionPhoto(collectionPhotoURLInput)}
        className="grid py-2 mb-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite"
      >
        Confirm Photo
      </button>
    </div>
  );
}
