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
  currentUserUsername,
  maxLength,
}: {
  currentUserUsername: string;
  maxLength: number;
}): string {
  if (
    currentUserUsername.length <= currentUserUsername.slice(0, maxLength).length
  ) {
    return currentUserUsername;
  }
  return currentUserUsername.slice(0, maxLength) + "...";
}

export function drawRandomURL({ urlList }: { urlList: string[] }): string {
  //💀💀 LOAD BALANCER HAHSQHAHAHHAHAHAH
  const randomURL = urlList[Math.floor(Math.random() * urlList.length)];
  return randomURL;
}

export function simpleHash(str: string | undefined) {
  if (!str) return "";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
