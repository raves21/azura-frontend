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
import { LinkProps, useNavigate } from "@tanstack/react-router";
import { changePasswordFormSchema } from "@/utils/variables/formSchemas";
import { ChangePasswordFormData } from "@/utils/types/auth/forms";
import {
  useChangePassword,
  useForgotPasswordChangePassword,
} from "@/services/auth/api/mutations";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { ForgotPasswordStep, UserBasicInfo } from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  afterSubmitSuccessAction: (values: ChangePasswordFormData) => void;
  user: UserBasicInfo;
  type: "forgotPassword" | "accountSettingChangePassword";
  cancelButtonLinkProps: LinkProps;
};

export default function ChangePasswordForm({
  user,
  afterSubmitSuccessAction,
  type,
  cancelButtonLinkProps,
}: Props) {
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    mutateAsync: forgotPassChangePass,
    isPending: isForgotPassChangePassPending,
  } = useForgotPasswordChangePassword();

  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePassword();

  const setForgotPasswordStep = useAuthStore(
    (state) => state.setForgotPasswordStep
  );
  const setChangePasswordStep = useAccountSettingStore(
    (state) => state.setChangePasswordStep
  );

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: ChangePasswordFormData) {
    try {
      if (type === "forgotPassword") {
        await forgotPassChangePass({
          userId: user.id,
          newPassword: values.newPassword.trim(),
        });
      } else {
        await changePassword({ newPassword: values.newPassword });
        toast({ description: "Successfully changed password." });
      }
      afterSubmitSuccessAction(values);
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="off"
                    placeholder="New Password"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="off"
                    placeholder="Confirm new Password"
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
            disabled={isForgotPassChangePassPending || isChangePasswordPending}
            type="button"
            onClick={() => {
              if (type === "accountSettingChangePassword") {
                setChangePasswordStep("verifyEmail");
              } else {
                setForgotPasswordStep(ForgotPasswordStep.FIND_ACCOUNT);
              }
              navigate(cancelButtonLinkProps);
            }}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg disabled:bg-gray-900 disabled:border-fuchsia-800/80 disabled:hover:border-fuchsia-800/80 hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            disabled={isForgotPassChangePassPending || isChangePasswordPending}
            type="submit"
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Confirm</p>
            {isForgotPassChangePassPending ||
              (isChangePasswordPending && (
                <div className="size-4 loader border-mainWhite border-[3px]" />
              ))}
          </button>
        </div>
      </form>
    </Form>
  );
}
