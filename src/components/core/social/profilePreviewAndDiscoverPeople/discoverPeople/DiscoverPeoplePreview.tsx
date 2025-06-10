import { useDiscoverPeoplePreview } from "@/services/social/api/queries";
import UserListItem from "../../shared/UserListItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";

export default function DiscoverPeoplePreview() {
  const {
    data: discoverPeoplePreview,
    isLoading: isDiscoverPeopleLoading,
    error: discoverPeopleError,
  } = useDiscoverPeoplePreview();

  if (isDiscoverPeopleLoading) {
    return (
      <div className="flex flex-col w-full gap-3 overflow-hidden rounded-lg bg-socialPrimary">
        <div className="px-5 pt-5 pb-3 text-lg font-semibold text-transparent">
          &nbsp;
        </div>
        <div className="px-5 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex w-full py-3">
              <div className="flex items-center gap-3">
                <Skeleton className="object-cover bg-gray-800 rounded-full size-11" />
                <div className="space-y-1 text-sm max-w-28">
                  <Skeleton className="font-semibold bg-gray-800 line-clamp-1">
                    Sample User
                  </Skeleton>
                  <Skeleton className="bg-gray-800 line-clamp-1">
                    @sampleuser
                  </Skeleton>
                </div>
              </div>
              <Skeleton className="ml-auto h-[40px] text-xs font-semibold bg-gray-800 rounded-full px-6">
                Follow
              </Skeleton>
            </div>
          ))}
        </div>
        <div className="w-full py-4 text-transparent" />
      </div>
    );
  }

  if (discoverPeopleError) {
    return (
      <div className="w-full gap-3 rounded-lg bg-socialPrimary font-medium text-md h-[300px] grid place-items-center">
        Error!
      </div>
    );
  }

  if (discoverPeoplePreview) {
    return (
      <div className="flex flex-col w-full gap-3 rounded-lg justfiy-center bg-socialPrimary">
        <p className="px-5 pt-5 pb-3 text-lg font-semibold">Discover People</p>
        {discoverPeoplePreview.length === 0 ? (
          <p className="self-center my-6 text-base font-md text-socialTextSecondary">
            No users yet.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              {discoverPeoplePreview.slice(0, 5).map((userPreview) => (
                <UserListItem
                  isDiscoverPeopleSection={true}
                  key={userPreview.id}
                  avatar={userPreview.avatar}
                  bio={userPreview.bio}
                  handle={userPreview.handle}
                  id={userPreview.id}
                  isFollowedByCurrentUser={userPreview.isFollowedByCurrentUser}
                  username={userPreview.username}
                />
              ))}
            </div>
            {discoverPeoplePreview.length > 5 && (
              <Link
                to="/social/discover-people"
                className="text-center w-full py-4 text-blue-500 rounded-bl-lg rounded-br-lg hover:bg-socialPrimaryHover"
              >
                Show More
              </Link>
            )}
          </>
        )}
      </div>
    );
  }
}
