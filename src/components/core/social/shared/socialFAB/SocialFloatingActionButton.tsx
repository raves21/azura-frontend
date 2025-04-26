import { cn } from "@/lib/utils";
import { useMatchRoute } from "@tanstack/react-router";
import { Navigation2, X } from "lucide-react";
import { useState } from "react";
import SocialFloatingActionButtonOptions from "./SocialFloatingActionButtonOptions";

export default function SocialFloatingActionButton() {
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });

  const [isActive, setIsActive] = useState(false);
  const [animationStatus, setAnimationStatus] = useState<"intro" | "exit">(
    "exit"
  );

  return (
    <>
      {isActive && (
        <div
          onClick={() => {
            setIsActive(false);
            setAnimationStatus("exit");
          }}
          className="fixed h-dvh w-dvw z-[1000]"
        />
      )}
      <div
        className={cn(
          "fixed right-4 z-[99] bottom-24 text-mainWhite font-montserrat",
          {
            "bottom-[165px]": isPostInfoPage,
          },
          { "z-[1100]": isActive }
        )}
      >
        <button
          onClick={() => {
            setIsActive((prev) => !prev);
            if (isActive) {
              setAnimationStatus("exit");
            }
          }}
          className="rounded-full absolute bottom-0 right-0 p-3 bg-mainAccent z-[1100]"
        >
          {isActive ? (
            <X className="stroke-mainWhite size-5" />
          ) : (
            <Navigation2 className="stroke-mainWhite size-5" />
          )}
        </button>
        <SocialFloatingActionButtonOptions
          isActive={isActive}
          setIsActive={setIsActive}
          animationStatus={animationStatus}
          setAnimationStatus={setAnimationStatus}
        />
      </div>
    </>
  );
}
