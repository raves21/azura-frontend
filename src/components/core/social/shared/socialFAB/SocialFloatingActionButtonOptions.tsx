import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { LinkProps, Navigate, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { House, User2, Bell, TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import TrendingDrawer from "../../trending/TrendingDrawer";
import { useShallow } from "zustand/react/shallow";

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  animationStatus: "intro" | "exit";
  setAnimationStatus: React.Dispatch<React.SetStateAction<"intro" | "exit">>;
};

type OptionClickNavigate = {
  type: "navigate";
  navigateLinkProps: LinkProps;
};

type OptionClickOpenDialog = {
  type: "openDialog";
  dialogComponent: ReactNode;
};

type OptionClickOpenDrawer = {
  type: "openDrawer";
  drawerComponent: ReactNode;
};

type HandleOptionClickArgs =
  | OptionClickNavigate
  | OptionClickOpenDialog
  | OptionClickOpenDrawer;

export default function SocialFloatingActionButtonOptions({
  isActive,
  setIsActive,
  animationStatus,
  setAnimationStatus,
}: Props) {
  const navigate = useNavigate();
  const [toggleOpenDrawer, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [state.toggleOpenDrawer, state.toggleOpenDialog])
  );
  const { data: currentUser } = useCurrentUser();

  function handleOptionClick({ ...args }: HandleOptionClickArgs) {
    setIsActive(false);
    setAnimationStatus("exit");
    if (args.type === "navigate") {
      navigate(args.navigateLinkProps);
    } else if (args.type === "openDialog") {
      toggleOpenDialog(args.dialogComponent);
    } else {
      toggleOpenDrawer(args.drawerComponent);
    }
  }

  if (!currentUser) return <Navigate to="/" replace />;

  return (
    <>
      <motion.button
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: { to: "/social" },
          })
        }
        animate={{
          bottom: isActive ? 60 : 0,
        }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        className={cn(
          "rounded-full absolute bottom-0 right-0 p-3 bg-socialPrimary",
          { "border-mainAccent border": isActive }
        )}
      >
        <p
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-14 py-2 px-4 bg-gray-700 rounded-full text-xs opacity-0 transition-opacity duration-300",
            { "opacity-100": animationStatus === "intro" }
          )}
        >
          Home
        </p>
        <House className="stroke-mainWhite size-5" />
      </motion.button>
      <motion.button
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: {
              to: "/social/$userHandle",
              params: { userHandle: currentUser.handle },
            },
          })
        }
        animate={{
          bottom: isActive ? 120 : 0,
        }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        className={cn(
          "rounded-full absolute bottom-0 right-0 p-3 bg-socialPrimary",
          { "border-mainAccent border": isActive }
        )}
      >
        <p
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-14 py-2 px-4 bg-gray-700 rounded-full text-xs opacity-0 transition-opacity duration-300",
            { "opacity-100": animationStatus === "intro" }
          )}
        >
          Profile
        </p>
        <User2 className="stroke-mainWhite size-5" />
      </motion.button>
      <motion.button
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: { to: "/social/notifications" },
          })
        }
        animate={{
          bottom: isActive ? 180 : 0,
        }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        className={cn(
          "rounded-full absolute bottom-0 right-0 p-3 bg-socialPrimary",
          { "border-mainAccent border": isActive }
        )}
      >
        <p
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-14 py-2 px-4 bg-gray-700 rounded-full text-xs opacity-0 transition-opacity duration-300",
            { "opacity-100": animationStatus === "intro" }
          )}
        >
          Notifications
        </p>
        <Bell className="stroke-mainWhite size-5" />
      </motion.button>
      <motion.button
        onClick={() =>
          handleOptionClick({
            type: "openDrawer",
            drawerComponent: <TrendingDrawer />,
          })
        }
        animate={{
          bottom: isActive ? 240 : 0,
        }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
        onAnimationComplete={() =>
          isActive ? setAnimationStatus("intro") : undefined
        }
        className={cn(
          "rounded-full absolute bottom-0 right-0 p-3 bg-socialPrimary md:hidden",
          { "border-mainAccent border": isActive }
        )}
      >
        <p
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-14 py-2 px-4 bg-gray-700 rounded-full text-xs opacity-0 transition-opacity duration-300",
            { "opacity-100": animationStatus === "intro" }
          )}
        >
          Trending
        </p>
        <TrendingUp className="stroke-mainWhite size-5" />
      </motion.button>
    </>
  );
}
