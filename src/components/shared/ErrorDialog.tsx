import { useGlobalStore } from "@/utils/stores/useGlobalStore";

type ErrorDialogProps = {
  statusCode?: number;
  message?: string;
  okButtonAction?: () => void;
};

export default function ErrorDialog({
  statusCode,
  message,
  okButtonAction,
}: ErrorDialogProps) {
  const { toggleOpenDialog } = useGlobalStore();

  return (
    <div className="max-w-[400px] text-center flex flex-col items-center justify-center gap-10 py-8 text-white bg-gray-800 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-semibold text-mainAccent">
          <span className="text-white">Error</span>{" "}
          {statusCode ? statusCode : 500}
        </h1>
        <p className="px-10">
          {message
            ? message
            : "There was an error in the server. Please try again."}
        </p>
      </div>
      <button
        onClick={
          okButtonAction ? () => okButtonAction() : () => toggleOpenDialog(null)
        }
        className="grid px-20 py-3 font-semibold text-white rounded-lg bg-mainAccent place-items-center"
      >
        OK
      </button>
    </div>
  );
}
