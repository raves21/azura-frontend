import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { changeEmailFormSchema } from "@/utils/variables/formSchemas";
import { ChangeEmailFormData } from "@/utils/types/auth/forms";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import {
  useCheckEmailAvailability,
  useSendOTC,
} from "@/services/auth/api/mutations";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { useShallow } from "zustand/react/shallow";
import { Loader2 } from "lucide-react";
import ErrorDialog from "@/components/core/shared/ErrorDialog";

export default function ChangeEmailForm() {
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [setChangeEmailStep, setNewEmail] = useAccountSettingStore(
    useShallow((state) => [state.setChangeEmailStep, state.setNewEmail]),
  );

  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey,
  );
  const { mutateAsync: sendOTC } = useSendOTC({
    key: `accountSettingChangeEmailPage-${uniqueMutationKey}`,
  });

  const {
    mutateAsync: checkEmailAvailibility,
    status: checkEmailAvailibilityStatus,
  } = useCheckEmailAvailability();

  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ChangeEmailFormData) {
    try {
      await checkEmailAvailibility(values.email);
      toggleOpenDialog(
        <AsyncConfirmationDialog
          confirmAction={async () => await sendOTC(values.email)}
          afterConfirmSuccessAction={() => {
            setNewEmail(values.email);
            setChangeEmailStep("verifyEmail");
            navigate({ to: "/settings/change-email/verify-email" });
          }}
          header="Confirm Email change"
          message={`Are you sure you want to change your email to ${values.email}? A code will be sent to this email for verification.`}
          mutationKey={[`accountSettingChangeEmailPage-${uniqueMutationKey}`]}
        />,
      );
    } catch (error) {
      toggleOpenDialog(<ErrorDialog error={error} />);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-mainWhite w-full mobile-m:w-[300px] mobile-l:w-[370px] flex flex-col"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="New Email"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={() => {
              setChangeEmailStep(null);
              navigate({ to: "/settings", replace: true });
            }}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg disabled:bg-gray-900 disabled:border-fuchsia-800/80 disabled:hover:border-fuchsia-800/80 hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={["pending"].includes(checkEmailAvailibilityStatus)}
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            {checkEmailAvailibilityStatus === "pending" ? (
              <>
                <Loader2 className="animate-spin stroke-white size-5" />
                <p>Proceed</p>
              </>
            ) : (
              <p>Proceed</p>
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}
