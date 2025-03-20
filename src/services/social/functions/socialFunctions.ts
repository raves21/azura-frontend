import { PreviewMedia } from "@/utils/types/social/social";
import moment from "moment";

export function formatToRelativeTime(date: string) {
  return moment(date).fromNow();
}

export function getPreviewPosters(previewMedias: PreviewMedia[]){
  return previewMedias.map((previewMedia) => previewMedia.posterImage).filter(Boolean) as string[]
}