import DetachedModeSession from "@/components/core/shared/sessions/detachedModeSessions/DetachedModeSession";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_auth/detached-mode/")({
  component: () => <DetachedMode />,
});

function DetachedMode() {
  const detachedModeUserInfo = useAuthStore(
    (state) => state.detachedModeUserInfo
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!detachedModeUserInfo) {
      navigate({
        to: "/login",
      });
    }
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center gap-5 w-full flex-wrap">
        <h1 className="text-2xl mobile-m:text-3xl font-bold text-mainAccent text-center w-fit">
          Logging in
        </h1>
        <LoaderCircle className="animate-spin size-8 mobile-m:size-10 stroke-mainAccent" />
      </div>
    );
  }

  if (detachedModeUserInfo) {
    const { sessions, user: userInfo } = detachedModeUserInfo.data;

    return (
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col text-center gap-4 px-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-center">
            Your account has reached the maximum session limit.
          </h1>
          <p className="mt-3 text-gray-400 text-sm sm:text-base text-center">
            If you wish to login, feel free to logout any of your account's
            sessions below.
          </p>
        </div>
        <div className="overflow-x-auto mx-auto text-sm sm:text-base scroll-container-small-thumb w-[95dvw] sm:w-fit px-4 bg-socialPrimary py-3 rounded-lg">
          <table className="w-full text-left rounded-md mb-3 sm:mb-0">
            <tbody>
              {sessions.map((session, i) => (
                <DetachedModeSession
                  userInfo={userInfo}
                  setIsLoggingIn={setIsLoggingIn}
                  session={session}
                  key={session.id}
                  className={i !== sessions.length - 1 ? "border-b" : ""}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
