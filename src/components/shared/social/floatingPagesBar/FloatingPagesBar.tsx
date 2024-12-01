import FloatingPagesItem from "./FloatingPagesItem";

export type PageType = "home" | "profile" | "notifications";
const pages: PageType[] = ["home", "profile", "notifications"];

export default function FloatingPagesBar() {
  return (
    <div className="fixed flex overflow-hidden border rounded-full bg-socialPrimary bottom-5 border-socialTextSecondary">
      {pages.map((page) => {
        if (page === "home") {
          return (
            <FloatingPagesItem
              linkProps={{
                to: "/social",
              }}
              pageType={page}
            />
          );
        } else if (page === "profile") {
          return (
            <FloatingPagesItem
              linkProps={{
                to: `/social/profile/$userName`,
                params: {
                  userName: "elonmusk",
                },
              }}
              pageType={page}
            />
          );
        } else {
          return (
            <FloatingPagesItem
              linkProps={{
                to: "/social",
              }}
              pageType={page}
            />
          );
        }
      })}
    </div>
  );
}
