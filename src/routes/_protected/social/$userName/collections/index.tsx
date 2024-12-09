import Collections from "@/components/shared/social/mainContent/collection/Collections";
import { createFileRoute } from "@tanstack/react-router";
import { tempCollections } from "@/utils/variables/temp";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";

export const Route = createFileRoute(
  "/_protected/social/$userName/collections/"
)({
  component: () => <CollectionsPage />,
});

function CollectionsPage() {
  useCustomScrollRestoration("userProfilePage");
  return <Collections collections={tempCollections} />;
}
