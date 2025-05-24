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
import AsyncConfirmationDialog from "../../shared/confirmationDialog/AsyncConfirmationDialog";
import { useSendOTC } from "@/services/auth/authQueries";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { useShallow } from "zustand/react/shallow";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeEmailForm() {
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [setChangeEmailStep, setNewEmail] = useAccountSettingStore(
    useShallow((state) => [state.setChangeEmailStep, state.setNewEmail])
  );

  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: sendOTC } = useSendOTC({
    key: `accountSettingChangeEmailPage-${uniqueMutationKey}`,
  });

  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: ChangeEmailFormData) {
    toggleOpenDialog(
      <AsyncConfirmationDialog
        confirmAction={async () => await sendOTC(values.email)}
        afterConfirmSuccessAction={() => {
          setNewEmail(values.email);
          setChangeEmailStep("verifyEmail");
          toast({ description: "Successfully changed email." });
          navigate({ to: "/account/change-email/verify-email" });
        }}
        header="Confirm Email change"
        message={`Are you sure you want to change your email to ${values.email}? A code will be sent to this email for verification.`}
        mutationKey={[`accountSettingChangeEmailPage-${uniqueMutationKey}`]}
      />
    );
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
              navigate({ to: "/account", replace: true });
            }}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg disabled:bg-gray-900 disabled:border-fuchsia-800/80 disabled:hover:border-fuchsia-800/80 hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Proceed</p>
          </button>
        </div>
      </form>
    </Form>
  );
}
