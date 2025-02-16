import CustomCheckBox from "@/components/core/CustomCheckBox";

type MediaExistenceInCollectionProps = {
  onClick: () => void;
  collectionName: string;
  doesGivenMediaExist: boolean;
};

export default function MediaExistenceInCollection({
  onClick,
  collectionName,
  doesGivenMediaExist,
}: MediaExistenceInCollectionProps) {
  return (
    <button
      className="flex items-center justify-between w-full px-5 py-5 hover:bg-socialPrimaryHover"
      onClick={onClick}
    >
      <p className="font-medium text-mainWhite line-clamp-1">
        {collectionName}
      </p>
      <CustomCheckBox
        isChecked={doesGivenMediaExist}
        className="h-full shrink-0"
      />
    </button>
  );
}
