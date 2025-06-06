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
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { findAccountFormSchema } from "@/utils/variables/formSchemas";
import { FindAccountFormData } from "@/utils/types/auth/forms";
import { useFindUserByEmail, useSendOTC } from "@/services/auth/api/mutations";
import { useShallow } from "zustand/react/shallow";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";

export default function FindAccountForm() {
  const navigate = useNavigate();
  const [setForgotPasswordStep, setFindAccountFoundUser] = useAuthStore(
    useShallow((state) => [
      state.setForgotPasswordStep,
      state.setFindAccountFoundUser,
    ])
  );
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const form = useForm<FindAccountFormData>({
    resolver: zodResolver(findAccountFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: findUserByEmail, isPending: isFindingUserByEmail } =
    useFindUserByEmail();

  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );

  const { mutateAsync: sendOTC, isPending: isSendingOTC } = useSendOTC({
    key: `findAccountSendOTC-${uniqueMutationKey}`,
  });

  async function onSubmit(values: FindAccountFormData) {
    try {
      const foundUser = await findUserByEmail({ email: values.email.trim() });
      toggleOpenDialog(
        <AsyncConfirmationDialog
          header="Account found."
          message={`Account with email "${foundUser.email}" found. Do you want to proceed on changing this account's password?`}
          confirmAction={() => sendOTC(foundUser.email)}
          mutationKey={[`findAccountSendOTC-${uniqueMutationKey}`]}
          confirmActionName="Proceed"
          confirmButtonColorMainAccent={true}
          afterConfirmSuccessAction={() => {
            setFindAccountFoundUser(foundUser);
            setForgotPasswordStep(ForgotPasswordStep.VERIFY_EMAIL);
            navigate({
              to: "/login/forgot-password/verify-email",
            });
          }}
        />
      );
    } catch (error) {
      toggleOpenDialog(<ErrorDialog error={error} />);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-mainWhite w-full mobile-m:w-[300px] mobile-l:w-[370px] flex flex-col text-sm sm:text-base"
      >
        <div>
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
                    placeholder="Email"
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
            onClick={() => navigate({ to: "/login" })}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            disabled={isFindingUserByEmail || isSendingOTC}
            type="submit"
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Find</p>
            {isFindingUserByEmail || isSendingOTC ? (
              <div className="size-4 loader border-mainWhite border-[3px]" />
            ) : null}
          </button>
        </div>
      </form>
    </Form>
  );
}
