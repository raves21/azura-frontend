import BackButton from "@/components/shared/BackButton";
import CollectionActions from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionActions";
import CollectionInfoHeader from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionInfoHeader";
import CollectionItems from "@/components/shared/social/mainContent/collection/collectionItem/CollectionItems";
import { tempCollectionItems } from "@/utils/variables/temp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/social/$userName/collections/$collectionId/"
)({
  component: () => <CollectionInfoPage />,
});

function CollectionInfoPage() {
  return (
    <section className="flex flex-col w-full gap-8 p-5 mb-20 rounded-lg bg-socialPrimary">
      <BackButton
        linkProps={{
          to: "/social/$userName/collections",
          params: {
            userName: "elonmusk",
          },
        }}
      />
      <CollectionInfoHeader />
      <CollectionActions />
      <CollectionItems collectionItems={tempCollectionItems} />
    </section>
  );
}
