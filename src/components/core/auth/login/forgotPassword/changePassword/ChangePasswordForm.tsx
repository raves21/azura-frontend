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
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { useChangePassword } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";

type Props = {
  afterChangePasswordSuccessAction: (values: ChangePasswordFormData) => void;
};

export default function ChangePasswordForm({
  afterChangePasswordSuccessAction,
}: Props) {
  const navigate = useNavigate();
  const { findAccountFoundUser } = useAuthStore();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { mutateAsync: changePassword, isPending: isChangingPassword } =
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
      if (!findAccountFoundUser) throw new Error("User not found.");
      await changePassword({
        userId: findAccountFoundUser.id,
        newPassword: values.newPassword.trim(),
      });
      afterChangePasswordSuccessAction(values);
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
            disabled={isChangingPassword}
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg disabled:bg-gray-900 disabled:border-fuchsia-800/80 disabled:hover:border-fuchsia-800/80 hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            disabled={isChangingPassword}
            type="submit"
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Confirm</p>
            {isChangingPassword && (
              <div className="size-4 loader border-mainWhite border-[3px]" />
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}
