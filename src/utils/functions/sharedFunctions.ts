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
