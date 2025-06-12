import { useCurrentUser } from "@/services/auth/api/queries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { LinkProps, Navigate, useNavigate } from "@tanstack/react-router";
import {
  House,
  User2,
  Bell,
  TrendingUp,
  Users,
  CirclePlus,
} from "lucide-react";
import { ReactNode } from "react";
import TrendingDrawer from "../../trending/TrendingDrawer";
import { useShallow } from "zustand/react/shallow";
import SocialFabOption from "./SocialFabOption";
import ManagePostDialog from "../../mainContent/post/managePost/managePostDialog/ManagePostDialog";
import useWindowBreakpoints from "@/utils/hooks/useWindowBreakpoints";
import { useManagePostStore } from "@/utils/stores/useManagePostStore";

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

export default function SocialFabOptions({
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

  const { isTabletUp } = useWindowBreakpoints();

  const resetManagePostStore = useManagePostStore((state) => state.resetState);

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
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={60}
        icon={<House className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="Home"
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: { to: "/social" },
          })
        }
        setAnimationStatus={setAnimationStatus}
      />
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={120}
        icon={<User2 className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="Profile"
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: {
              to: "/social/$userHandle",
              params: { userHandle: currentUser.handle },
            },
          })
        }
        setAnimationStatus={setAnimationStatus}
      />
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={180}
        icon={<Bell className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="Notifications"
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: {
              to: "/social/notifications",
            },
          })
        }
        setAnimationStatus={setAnimationStatus}
      />
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={240}
        icon={<TrendingUp className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="Trending"
        className="md:hidden"
        onClick={() =>
          handleOptionClick({
            type: "openDrawer",
            drawerComponent: <TrendingDrawer />,
          })
        }
        setAnimationStatus={setAnimationStatus}
      />
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={isTabletUp ? 240 : 300}
        icon={<Users className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="Discover People"
        onClick={() =>
          handleOptionClick({
            type: "navigate",
            navigateLinkProps: { to: "/social/discover-people" },
          })
        }
        setAnimationStatus={setAnimationStatus}
      />
      <SocialFabOption
        animationStatus={animationStatus}
        bottomValue={isTabletUp ? 300 : 360}
        icon={<CirclePlus className="stroke-mainWhite size-5" />}
        isActive={isActive}
        label="New Post"
        onClick={() => {
          resetManagePostStore();
          handleOptionClick({
            type: "openDialog",
            dialogComponent: <ManagePostDialog type="create" />,
          });
        }}
        setAnimationStatus={setAnimationStatus}
      />
    </>
  );
}
