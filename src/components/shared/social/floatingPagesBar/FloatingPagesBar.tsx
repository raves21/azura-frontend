import { LinkProps, Navigate } from "@tanstack/react-router";
import FloatingPagesBarItem from "./FloatingPagesBarItem";
import { useAuthStore } from "@/utils/stores/authStore";

type PageName = "Home" | "Profile" | "Notifications";

export type TFloatingPagesBarItem = {
  name: PageName;
  linkProps: LinkProps;
};

export default function FloatingPagesBar() {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;

  const floatingPagesBarItems: TFloatingPagesBarItem[] = [
    {
      name: "Home",
      linkProps: {
        to: "/social",
      },
    },
    {
      name: "Profile",
      linkProps: {
        to: "/social/$userHandle",
        params: {
          userHandle: currentUser.handle,
        },
      },
    },
    {
      name: "Notifications",
      linkProps: {
        to: "/social",
      },
    },
  ];

  return (
    <div className="hidden fixed lg:flex z-[200] overflow-hidden border rounded-full bg-socialPrimary bottom-5 border-socialTextSecondary">
      {floatingPagesBarItems.map((floatingPagesBarItem) => (
        <FloatingPagesBarItem
          key={floatingPagesBarItem.name}
          name={floatingPagesBarItem.name}
          linkProps={floatingPagesBarItem.linkProps}
        />
      ))}
    </div>
  );
}
