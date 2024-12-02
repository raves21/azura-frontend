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
import { SignUpStep } from "@/utils/types/auth/auth";
import { useAuthStore } from "@/utils/stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { passwordConfirmationFormSchema } from "@/utils/variables/formSchemas";
import { PasswordConfirmationFormData } from "@/utils/types/auth/forms";
import { useSendOTC } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/globalStore";
import ErrorDialog from "@/components/shared/ErrorDialog";
import { AxiosError } from "axios";

export default function PasswordConfirmationForm() {
  const [setSignUpStep, setSignUpValues, signUpValues] = useAuthStore(
    useShallow((state) => [
      state.setSignUpStep,
      state.setSignUpValues,
      state.signUpValues,
    ])
  );

  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const navigate = useNavigate();
  const { mutateAsync: sendOTC, isPending: isSendingOTC } = useSendOTC();

  const form = useForm<PasswordConfirmationFormData>({
    resolver: zodResolver(passwordConfirmationFormSchema),
    defaultValues: {
      password: signUpValues.password,
      confirmPassword: signUpValues.password,
    },
  });

  async function onSubmit(values: PasswordConfirmationFormData) {
    try {
      //send otc
      await sendOTC(signUpValues.email);
      setSignUpValues({
        ...signUpValues,
        password: values.password,
      });
      setSignUpStep(SignUpStep.VERIFY_EMAIL);
      navigate({
        to: "/signup/verify-email",
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toggleOpenDialog(<ErrorDialog error={error} />);
      } else {
        toggleOpenDialog(
          <ErrorDialog
            error={error}
            customMessage="There was an error in sending the email verification code. Please try again later."
          />
        );
      }
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
            disabled={isSendingOTC}
            type="submit"
            className="flex items-center justify-center w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Next</p>
            {isSendingOTC && (
              <div className="size-4 loader border-mainWhite border-[3px]" />
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}
