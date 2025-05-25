import { ReactNode } from "react";
import { useGlobalStore } from "../stores/useGlobalStore";

const toggleOpenDrawer = useGlobalStore.getState().toggleOpenDrawer;
const toggleOpenDialogSecondary =
  useGlobalStore.getState().toggleOpenDialogSecondary;
const toggleOpenDialog = useGlobalStore.getState().toggleOpenDialog;
const toggleOpenSheet = useGlobalStore.getState().toggleOpenSheet;

type OpenDialogOrDrawerArgs = {
  content: ReactNode;
  isTabletUp: boolean;
  isSecondaryDialog?: boolean;
};

export function toggleDialogOrDrawer({
  content,
  isSecondaryDialog,
  isTabletUp,
}: OpenDialogOrDrawerArgs) {
  if (isTabletUp) {
    isSecondaryDialog
      ? toggleOpenDialogSecondary(content)
      : toggleOpenDialog(content);
  } else {
    toggleOpenDrawer(content);
  }
}

export function closeAllPopups() {
  toggleOpenDrawer(null);
  toggleOpenSheet(null);
  toggleOpenDialog(null);
  toggleOpenDialogSecondary(null);
}

export function closeAllDialogs() {
  toggleOpenDialog(null);
  toggleOpenDialogSecondary(null);
}

type ReplaceDialogContentArgs = {
  isSecondaryDialog?: boolean;
  content: ReactNode | null;
};

export function replaceDialogContent({
  isSecondaryDialog = false,
  content,
}: ReplaceDialogContentArgs) {
  if (isSecondaryDialog) {
    toggleOpenDialogSecondary(null);
    setTimeout(() => {
      toggleOpenDialogSecondary(content);
    }, 150);
  } else {
    toggleOpenDialog(null);
    setTimeout(() => {
      toggleOpenDialog(content);
    }, 150);
  }
}

export function getUsernamePreview({
  maxLength,
}: {
  maxLength: number;
}): string {
  if ("lucie too bi".length <= "lucie too bi".slice(0, maxLength).length) {
    return "lucie too bi";
  }
  return "lucie too bi".slice(0, maxLength) + "...";
}

export function drawRandomURL({ urlList }: { urlList: string[] }): string {
  //💀💀 LOAD BALANCER HAHSQHAHAHHAHAHAH
  const randomURL = urlList[Math.floor(Math.random() * urlList.length)];
  return randomURL;
}

export function getBackendURL() {
  const RANDOM_BACKEND_URL = drawRandomURL({
    urlList: [
      `${import.meta.env.VITE_BACKEND_BASE_URL_1}`,
      `${import.meta.env.VITE_BACKEND_BASE_URL_2}`,
    ],
  });

  const url = !!Number(import.meta.env.VITE_IS_PROD)
    ? RANDOM_BACKEND_URL
    : import.meta.env.VITE_BACKEND_BASE_URL;
  return url;
}
