import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function SessionSkeleton({ className }: Props) {
  return (
    <tr className={cn("border-gray-700", className)}>
      <td className="px-3 py-4">
        <Skeleton className="bg-gray-700">Lorem, ipsum.</Skeleton>
      </td>
      <td className="px-3 py-4">
        <Skeleton className="bg-gray-700">Asdfadsds</Skeleton>
      </td>
      <td className="px-3 py-4">
        <Skeleton className="bg-gray-700">Asdfadsds</Skeleton>
      </td>
      <td className="px-3 py-4">
        <Skeleton className="bg-gray-700">Asdfadsds</Skeleton>
      </td>
      <td className="px-3 py-4 text-center text-blue-500 font-semibold">
        <Skeleton className="bg-gray-700">Loremmm</Skeleton>
      </td>
    </tr>
  );
}
