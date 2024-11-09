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
import { Link } from "@tanstack/react-router";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/authStore";
import { useShallow } from "zustand/react/shallow";

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .regex(/^[A-Za-z0-9_]+$/, {
      message: "Letters, digits, or underscores only.",
    })
    .max(30, {
      message: "Maximum of 30 characters.",
    }),
  handle: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .regex(/^[A-Za-z0-9._]+$/, {
      message: "Letters, digits, period, or underscores only.",
    })
    .max(15, {
      message: "Maximum of 15 characters.",
    }),
  email: z.string().email({
    message: "Email is badly formatted.",
  }),
});

export default function UserDetailsForm() {
  const [setSignUpStep, setSignUpValues, signUpValues] = useAuthStore(
    useShallow((state) => [
      state.setSignUpStep,
      state.setSignUpValues,
      state.signUpValues,
    ])
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: signUpValues.username,
      handle: signUpValues.handle,
      email: signUpValues.email,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                  <p className="text-gray-500">Username</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="user123"
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
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full ">
                  <p className="text-gray-500">Handle</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute top-[7px] left-[10px] text-gray-400">
                      @
                    </span>
                    <Input
                      autoComplete="off"
                      placeholder="azuratopfan29"
                      {...field}
                      className="font-medium bg-gray-800 border-none pl-[31px] text-mainWhite"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full ">
                  <p className="text-gray-500">Email</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="user@email.com"
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
        <button className="grid w-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent disabled:bg-fuchsia-900 disabled:border-fuchsia-9hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700">
          Next
        </button>
      </form>
    </Form>
  );
}
