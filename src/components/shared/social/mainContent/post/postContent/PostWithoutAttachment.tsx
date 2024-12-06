type PostWithoutAttachmentProps = {
  content: string | null;
};

export default function PostWithoutAttachment({
  content,
}: PostWithoutAttachmentProps) {
  return <p className="text-gray-300">{content}</p>;
}
