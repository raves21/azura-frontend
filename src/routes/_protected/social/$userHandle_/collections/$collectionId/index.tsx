import BackButton from "@/components/shared/BackButton";
import CollectionActions from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionActions";
import CollectionInfoHeader from "@/components/shared/social/mainContent/collection/collectionInfoHeader/CollectionInfoHeader";
import CollectionItems from "@/components/shared/social/mainContent/collection/collectionItem/CollectionItems";
import { useCustomScrollRestoration } from "@/utils/hooks/useCustomScrollRestoration";
import { tempCollectionItems, tempCollections } from "@/utils/variables/temp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/social/$userHandle/collections/$collectionId/"
)({
  component: () => <CollectionInfoPage />,
});

function CollectionInfoPage() {
  useCustomScrollRestoration();
  return (
    <section className="flex flex-col w-full gap-8 p-3 mb-20 rounded-lg sm:p-5 bg-socialPrimary">
      <BackButton
        linkProps={{
          to: "/social/$userHandle/collections",
          params: {
            userHandle: "elonmusk",
          },
        }}
      />
      <CollectionInfoHeader collection={tempCollections[1]} />
      <CollectionActions />
      <CollectionItems collectionItems={tempCollectionItems} />
    </section>
  );
}
