import GlobalDialogHeader from "@/components/global/shared/GlobalDialogHeader";
import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import GlobalDialogHeaderTitle from "@/components/global/shared/GlobalDialogHeaderTitle";
import { useVerifyPassword } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

type Props = {
  afterSubmitSuccessAction: () => void;
};

export default function PasswordVerificationDialog({
  afterSubmitSuccessAction,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const [passwordInputText, setPasswordInputText] = useState("");

  const { mutateAsync: verifyPassword, isPending: isVerifyingPassword } =
    useVerifyPassword();

  async function onSubmit(password: string) {
    try {
      await verifyPassword(password);
      toggleOpenDialog(null);
      afterSubmitSuccessAction();
    } catch (error) {
      toggleOpenDialog(null);
      setTimeout(() => {
        toggleOpenDialog(<ErrorDialog error={error} />);
      }, 150);
    }
  }

  return (
    <div className="h-[300px] w-[95dvw] mobile-l:w-[400px] bg-socialPrimary rounded-lg flex flex-col text-mainWhite">
      <GlobalDialogHeader>
        <GlobalDialogHeaderTitle>Verify Password</GlobalDialogHeaderTitle>
        <GlobalDialogHeaderCloseButton onClick={() => toggleOpenDialog(null)} />
      </GlobalDialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(passwordInputText.trim());
        }}
        className="flex-grow flex flex-col p-4"
      >
        <div className="flex flex-col flex-grow gap-3 mt-7">
          <p className="font-medium">Enter Password</p>
          <PasswordInput
            disabled={isVerifyingPassword}
            onChange={(e) => setPasswordInputText(e.target.value)}
            className="rounded-lg pl-3 py-[10px] bg-gray-700 focus:border-mainWhite"
            placeholder="*************"
          />
        </div>
        <button
          type="submit"
          disabled={isVerifyingPassword || !passwordInputText}
          className="rounded-lg bg-mainAccent py-2 font-medium flex justify-center items-center gap-2 disabled:bg-fuchsia-700 disabled:text-gray-400"
        >
          <p>{isVerifyingPassword ? "Verifying" : "Verify"}</p>
          {isVerifyingPassword && (
            <LoaderCircle className="group-disabled:stroke-gray-400 animate-spin size-[22px] stroke-gray-400" />
          )}
        </button>
      </form>
    </div>
  );
}
