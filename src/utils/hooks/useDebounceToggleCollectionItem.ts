import {
  useAddCollectionItem,
  useDeleteCollectionItem,
} from "@/services/social/queries/socialQueries";
import { useCallback, useRef } from "react";
import { ToggleCollectionItemProperties } from "../types/media/shared";

//mutateAsync will only run: 1 second after the last click
const DEBOUNCE_DELAY = 1000;

export function useDebounceToggleCollectionItem() {
  const { mutateAsync: addCollectionItem } = useAddCollectionItem();
  const { mutateAsync: deleteCollectionItem } = useDeleteCollectionItem();
  const timeOutRef = useRef<NodeJS.Timeout>();

  const toggleCollectionItemDebounced = useCallback(
    ({
      collectionId,
      coverImage,
      description,
      mediaId,
      mediaType,
      posterImage,
      rating,
      status,
      title,
      year,
      type,
    }: ToggleCollectionItemProperties & { type: "add" | "remove" }) => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }

      timeOutRef.current = setTimeout(async () => {
        if (type === "add") {
          await addCollectionItem({
            collectionId,
            coverImage,
            description,
            mediaId,
            mediaType,
            posterImage,
            rating,
            status,
            title,
            year,
          });
        } else {
          await deleteCollectionItem({
            collectionId,
            mediaId,
            mediaType,
          });
        }
      }, DEBOUNCE_DELAY);
    },
    []
  );

  return { toggleCollectionItemDebounced };
}
