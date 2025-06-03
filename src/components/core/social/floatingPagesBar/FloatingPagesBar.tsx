import { LinkProps, Navigate, useMatchRoute } from "@tanstack/react-router";
import FloatingPagesBarItem from "./FloatingPagesBarItem";
import { useCurrentUser } from "@/services/auth/api/queries";

type PageName = "Home" | "Profile" | "Notifications";

export type TFloatingPagesBarItem = {
  name: PageName;
  linkProps: LinkProps;
  isCurrentRoute: boolean;
};

export default function FloatingPagesBar() {
  const { data: currentUser } = useCurrentUser();
  if (!currentUser) return <Navigate to="/login" replace />;

  const matchRoute = useMatchRoute();
  const isSocialHomeRoute = !!(
    matchRoute({ to: "/social" }) ||
    matchRoute({ to: "/social/discover-people" }) ||
    matchRoute({ to: "/social/search", fuzzy: true })
  );

  const isSocialUserProfileRoute = !!(
    !matchRoute({to: "/social/notifications"}) &&
    !matchRoute({to: "/social/discover-people"}) &&
    matchRoute({ to: "/social/$userHandle"}) ||
    matchRoute({to: "/social/$userHandle/collections", fuzzy: true}) ||
    matchRoute({to: "/social/$userHandle/followers"}) ||
    matchRoute({to: "/social/$userHandle/following"}) &&
    !matchRoute({ to: "/social/$userHandle/posts/$postId" })
  );
  const isSocialNotificationsRoute = !!matchRoute({
    to: "/social/notifications",
  });

  const floatingPagesBarItems: TFloatingPagesBarItem[] = [
    {
      name: "Home",
      linkProps: {
        to: "/social",
      },
      isCurrentRoute: isSocialHomeRoute,
    },
    {
      name: "Profile",
      linkProps: {
        to: "/social/$userHandle",
        params: {
          userHandle: currentUser.handle,
        },
      },
      isCurrentRoute: isSocialUserProfileRoute,
    },
    {
      name: "Notifications",
      linkProps: {
        to: "/social/notifications",
      },
      isCurrentRoute: isSocialNotificationsRoute,
    },
  ];

  return (
    <div className="hidden transition-colors box-content hover:border-mainAccent fixed lg:flex z-[200] overflow-hidden border rounded-full bg-socialPrimary bottom-5 border-socialTextSecondary">
      {floatingPagesBarItems.map((floatingPagesBarItem) => (
        <FloatingPagesBarItem
          key={floatingPagesBarItem.name}
          name={floatingPagesBarItem.name}
          linkProps={floatingPagesBarItem.linkProps}
          isCurrentRoute={floatingPagesBarItem.isCurrentRoute}
        />
      ))}
    </div>
  );
}
