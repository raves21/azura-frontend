import Collections from "@/components/shared/social/mainContent/collection/Collections";
import { createFileRoute } from "@tanstack/react-router";
import { tempCollections } from "@/utils/variables/temp";

export const Route = createFileRoute(
  "/_protected/social/$userName/collections/"
)({
  component: () => <CollectionsPage />,
});

function CollectionsPage() {
  return <Collections collections={tempCollections} />;
}
