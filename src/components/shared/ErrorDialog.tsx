import { useGlobalStore } from "@/utils/stores/globalStore";
import { AxiosError } from "axios";

type ErrorDialogProps = {
  error: unknown;
  customMessage?: string;
  okButtonAction?: () => void;
};

export default function ErrorDialog({
  error,
  customMessage,
  okButtonAction,
}: ErrorDialogProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  let errorMessage: string;
  if (customMessage) {
    errorMessage = customMessage;
  } else if (error instanceof AxiosError) {
    errorMessage = error.response?.data.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "An unknown error occured.";
  }

  let statusCode: number | null;
  if (error instanceof AxiosError && error.response) {
    statusCode = error.response.status;
  } else if (error instanceof Error) {
    statusCode = 500;
  } else {
    statusCode = null;
  }

  return (
    <div className="min-w-[300px] max-w-[500px] text-center flex flex-col items-center justify-center gap-10 py-8 text-white bg-gray-800 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl font-semibold text-mainAccent">
          <span className="text-white">Error</span> {statusCode}
        </h1>
        <p className="px-10">{errorMessage}</p>
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
