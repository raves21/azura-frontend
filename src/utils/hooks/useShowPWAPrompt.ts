import { useEffect } from "react";
import moment from "moment";
import { useGlobalStore } from "../stores/useGlobalStore";
import { ReactNode } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

// 1. First-time visitors (always show the dialog).
// 2. Returning visitors (only show once per month).
// 3. Not annoying users (10% chance per month).

export function useShowPWAPrompt(installPWAPrompt: ReactNode) {
  const [toggleOpenDialog, setIsDialogClickableOutside] = useGlobalStore(
    useShallow((state) => [
      state.toggleOpenDialog,
      state.setIsDialogClickableOutside,
    ])
  );

  useEffect(() => {
    const key = "dateLastViewedPWAPrompt";
    const stored = localStorage.getItem(key);
    const lastPrompted = stored ? moment(stored) : null;
    const now = moment();

    const isOneMonthPassed = !lastPrompted || now.diff(lastPrompted, "months") >= 1;
    const isOnPWA = window.matchMedia("(display-mode: standalone)").matches;

    if (isOneMonthPassed) {
      const random = Math.random() <= 0.5
      const shouldShow = !lastPrompted || random; //50% chance
      if (shouldShow && !isOnPWA) {
        setIsDialogClickableOutside(false)
        toggleOpenDialog(installPWAPrompt);
        localStorage.setItem(key, now.toISOString());
      }
    }
  }, []);
}
