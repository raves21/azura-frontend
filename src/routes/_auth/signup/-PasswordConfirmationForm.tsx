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
import { Link, useRouter } from "@tanstack/react-router";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { passwordConfirmationFormSchema } from "@/utils/variables/formSchemas";
import { PasswordConfirmationFormData } from "@/utils/types/auth/forms";

export default function PasswordConfirmationForm() {
  const [setSignUpStep, setSignUpValues, signUpValues] = useAuthStore(
    useShallow((state) => [
      state.setSignUpStep,
      state.setSignUpValues,
      state.signUpValues,
    ])
  );

  const router = useRouter();

  const form = useForm<PasswordConfirmationFormData>({
    resolver: zodResolver(passwordConfirmationFormSchema),
    defaultValues: {
      password: signUpValues.password,
      confirmPassword: signUpValues.password,
    },
  });

  function onSubmit(values: PasswordConfirmationFormData) {
    setSignUpValues({
      ...signUpValues,
      password: values.password,
    });
    setSignUpStep(SignUpStep.VERIFY_EMAIL);
    router.navigate({
      to: "/signup/verify-email",
    });
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full">
                  <p className="text-gray-500">Password</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="*************"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full">
                  <p className="text-gray-500">Confirm Password</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="*************"
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
              setSignUpStep(SignUpStep.USER_DETAILS);
              setSignUpValues({
                ...signUpValues,
                password: form.getValues().password,
              });
            }}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Back
          </button>
          <button
            type="submit"
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700"
          >
            Next
          </button>
        </div>
      </form>
    </Form>
  );
}
