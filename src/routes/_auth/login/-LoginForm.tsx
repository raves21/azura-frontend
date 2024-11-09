import { z } from "zod";
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
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/shared/ErrorDialog";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LoginResponse } from "@/utils/types/auth/auth";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/utils/stores/authStore";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is badly formatted.",
  }),
  password: z.string().min(1, {
    message: "This field is required.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const queryClient = useQueryClient();
  const { toggleOpenDialog } = useGlobalStore();
  const router = useRouter();
  const { setForgotPassword } = useAuthStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
        values,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.isDetachedMode) {
        //this means the user has reached its maximum session count
        router.navigate({
          to: "/detached-mode",
          replace: true,
        });
      } else {
        const accessToken = data.data.accessToken;
        queryClient.setQueryData(["accessToken"], accessToken);
        router.navigate({
          to: "/anime",
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);
      toggleOpenDialog(
        <ErrorDialog
          statusCode={error instanceof AxiosError ? Number(error.code) : 500}
          message={
            error instanceof Error ? error.message : "An unknown error occured."
          }
        />
      );
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-mainWhite w-[370px] flex flex-col"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between w-full text-base">
                    <p className="text-gray-500 ">Email</p>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="user@email.com"
                      {...field}
                      className="text-base font-medium bg-gray-800 border-none text-mainWhite"
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
                  <FormLabel className="flex justify-between w-full text-base">
                    <p className="text-gray-500">Password</p>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="*************"
                      {...field}
                      className="text-base font-medium bg-gray-800 border-none text-mainWhite"
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
          {isWrongCredentials && (
            <Link className="self-center mt-2 text-mainAccent">
              Forgot password?
            </Link>
          )}
          <button
            disabled={isLoggingIn}
            className="grid w-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent disabled:bg-fuchsia-900 disabled:border-fuchsia-900 disabled:text-gray-300 hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          <Link
            onClick={() => setForgotPassword(true)}
            to="/login/forgot-password/verify-email"
            className="self-center mt-4 text-gray-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </form>
      </Form>
    </div>
  );
}
