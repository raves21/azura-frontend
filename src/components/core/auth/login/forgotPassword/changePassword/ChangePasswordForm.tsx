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
import { changePasswordFormSchema } from "@/utils/variables/formSchemas";
import { ChangePasswordFormData } from "@/utils/types/auth/forms";
import {
  useChangePassword,
  useForgotPasswordChangePassword,
} from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { UserBasicInfo } from "@/utils/types/auth/auth";

type Props = {
  afterSubmitSuccessAction: (values: ChangePasswordFormData) => void;
  user: UserBasicInfo;
  type: "forgotPassword" | "accountSettingChangePassword";
};

export default function ChangePasswordForm({
  user,
  afterSubmitSuccessAction,
  type,
}: Props) {
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const {
    mutateAsync: forgotPassChangePass,
    isPending: isForgotPassChangePassPending,
  } = useForgotPasswordChangePassword();

  const { mutateAsync: changePassword, isPending: isChangePasswordPending } =
    useChangePassword();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordFormData) {
    try {
      if (type === "forgotPassword") {
        await forgotPassChangePass({
          userId: user.id,
          newPassword: values.newPassword.trim(),
        });
      } else {
        await changePassword({ newPassword: values.newPassword });
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
        className="text-mainWhite w-[370px] flex flex-col"
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
                  <Input
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
                  <Input
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
            onClick={() => navigate({ to: "/login" })}
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
