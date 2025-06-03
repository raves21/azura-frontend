import { useSessions } from "@/services/auth/api/queries";
import AccountSettingSession from "./AccountSettingSession";
import SessionSkeleton from "@/components/core/loadingSkeletons/auth/SessionSkeleton";

export default function AccountSettingSessions() {
  const {
    data: sessions,
    isPending: isSessionsPending,
    error: sessionsError,
  } = useSessions();

  if (isSessionsPending) {
    return (
      <table className="w-full text-left rounded-md mt-5">
        <tbody>
          <SessionSkeleton className="border-b" />
          <SessionSkeleton />
        </tbody>
      </table>
    );
  }

  if (sessionsError) {
    return (
      <div className="py-14 text-center font-medium text-lg">
        An error occured.
      </div>
    );
  }

  if (sessions) {
    const sessionsCurrentSessionFirst = sessions.sort((a, b) => {
      return (
        Number(b.isCurrentSession === true) -
        Number(a.isCurrentSession === true)
      );
    });
    return (
      <div className="overflow-x-auto scroll-container-small-thumb">
        <table className="w-full text-left rounded-md mt-5 mb-3 sm:mb-0">
          <tbody>
            {sessionsCurrentSessionFirst.map((session, i) => (
              <AccountSettingSession
                session={session}
                key={session.id}
                className={
                  i !== sessionsCurrentSessionFirst.length - 1 ? "border-b" : ""
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
