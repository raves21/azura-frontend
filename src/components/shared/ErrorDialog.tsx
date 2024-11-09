import { useGlobalStore } from "@/utils/stores/useGlobalStore";

type ErrorDialogProps = {
  statusCode: number;
  message: string;
};

export default function ErrorDialog({ statusCode, message }: ErrorDialogProps) {
  const { toggleOpenDialog } = useGlobalStore();

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-24 py-8 text-white bg-gray-800 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-semibold text-mainAccent">
          <span className="text-white">Error</span> {statusCode}
        </h1>
        <p>{message}</p>
      </div>
      <button
        onClick={() => toggleOpenDialog(null)}
        className="grid w-full py-3 font-semibold text-white rounded-lg bg-mainAccent place-items-center"
      >
        OK
      </button>
    </div>
  );
}
