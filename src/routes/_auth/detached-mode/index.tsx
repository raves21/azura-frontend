import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/detached-mode/")({
  component: () => <DetachedMode />,
});

function DetachedMode() {
  return (
    <div className="grid h-screen bg-darkBg place-items-center text-mainWhite">
      detached mode
    </div>
  );
}
