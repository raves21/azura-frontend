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
import { Link } from "@tanstack/react-router";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { userDetailsFormSchema } from "@/utils/variables/formSchemas";
import { UserDetailsFormData } from "@/utils/types/auth/forms";
import { cn } from "@/lib/utils";

export default function UserDetailsForm() {
  const [setSignUpStep, setSignUpValues, signUpValues] = useAuthStore(
    useShallow((state) => [
      state.setSignUpStep,
      state.setSignUpValues,
      state.signUpValues,
    ])
  );

  const form = useForm<UserDetailsFormData>({
    resolver: zodResolver(userDetailsFormSchema),
    defaultValues: {
      username: signUpValues.username,
      handle: signUpValues.handle,
      email: signUpValues.email,
    },
  });

  async function onSubmit(values: UserDetailsFormData) {
    setSignUpValues({
      ...values,
      password: signUpValues.password,
    });
    setSignUpStep(SignUpStep.PASSWORD_CONFIRMATION);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full ">
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Username"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center justify-between w-full">
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Handle"
                    {...field}
                    className="pl-8 font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
                <p
                  className={cn(
                    "absolute font-medium text-slate-500 bottom-[9px] transition-colors left-[11px]",
                    { "text-mainWhite": !!form.watch().handle.trim() }
                  )}
                >
                  @
                </p>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full ">
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
        <div className="flex self-center mt-4 font-light">
          <p>Already have an account?&nbsp;</p>
          <Link
            to="/login"
            className="font-normal text-mainAccent hover:underline"
          >
            Login
          </Link>
          <p>&nbsp;here</p>
        </div>
        <button className="grid w-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700">
          Next
        </button>
      </form>
    </Form>
  );
}
