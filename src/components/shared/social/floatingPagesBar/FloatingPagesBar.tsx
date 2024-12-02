import { LinkProps } from "@tanstack/react-router";
import FloatingPagesBarItem from "./FloatingPagesBarItem";

type PageName = "Home" | "Profile" | "Notifications";

export type TFloatingPagesBarItem = {
  name: PageName;
  linkProps: LinkProps;
};

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
      to: "/social/profile/$userName",
      params: {
        userName: "elonmusk",
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

export default function FloatingPagesBar() {
  return (
    <div className="fixed flex z-[200] overflow-hidden border rounded-full bg-socialPrimary bottom-5 border-socialTextSecondary">
      {floatingPagesBarItems.map((floatingPagesBarItem) => (
        <FloatingPagesBarItem
          name={floatingPagesBarItem.name}
          linkProps={floatingPagesBarItem.linkProps}
        />
      ))}
    </div>
  );
}
