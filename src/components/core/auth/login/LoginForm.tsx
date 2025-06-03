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
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { Link } from "@tanstack/react-router";
import { loginFormSchema } from "@/utils/variables/formSchemas";
import { LoginFormData } from "@/utils/types/auth/forms";
import { useLogin } from "@/services/auth/api/mutations";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();

  async function onSubmit(values: LoginFormData) {
    try {
      await login({
        email: values.email.trim(),
        password: values.password.trim(),
      });
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
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between w-full ">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between w-full ">
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="off"
                    placeholder="Password"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex self-center mt-4 font-light">
          <p>Don't have an account?&nbsp;</p>
          <Link
            to="/signup"
            className="font-normal text-mainAccent hover:underline"
          >
            Sign Up
          </Link>
          <p>&nbsp;here</p>
        </div>
        <button
          disabled={isLoggingIn}
          className="grid w-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent disabled:bg-fuchsia-900 disabled:border-fuchsia-900 disabled:text-gray-300 hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <Link
          to="/login/forgot-password/find-account"
          className="self-center mt-4 text-gray-500 hover:underline"
        >
          Forgot your password?
        </Link>
      </form>
    </Form>
  );
}
