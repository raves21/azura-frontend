type CollectionNameAndDescriptionProps = {
  name: string;
  description: string;
};

export default function CollectionNameAndDescription({
  name,
  description,
}: CollectionNameAndDescriptionProps) {
  return (
    <div className="space-y-4">
      <p className="text-4xl font-bold line-clamp-2">{name}</p>
      <p className="text-sm font-medium text-socialTextSecondary line-clamp-3">
        {description ? description : "No description"}
      </p>
    </div>
  );
}
