import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/social/")({
  component: () => <SocialPage />,
});

function SocialPage() {
  return (
    <div className="flex flex-col w-1/2">
      <div className="flex flex-col bg-gray-900 rounded-lg">
        <div className="flex items-center gap-3 p-5">
          <img
            src="/sample-user-pfp.png"
            className="object-cover rounded-full size-10"
          />
          <button className="flex-grow p-3 bg-gray-800 rounded-lg hover:bg-[#323b4a] text-start">
            What's happening?
          </button>
        </div>
      </div>
    </div>
  );
}
