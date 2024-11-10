import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/custom-input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { codeVerificationFormSchema } from "@/utils/variables/formSchemas";
import { CodeVerificationFormData } from "@/utils/types/auth/forms";

type CodeVerificationFormProps = {
  backButtonAction: () => void;
  verifyButtonAction: (values: CodeVerificationFormData) => void;
};

export default function CodeVerificationForm({
  backButtonAction,
  verifyButtonAction,
}: CodeVerificationFormProps) {
  const form = useForm<CodeVerificationFormData>({
    resolver: zodResolver(codeVerificationFormSchema),
    defaultValues: {
      code: "",
    },
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Email Verification</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(verifyButtonAction)}
          className="space-y-6 w-min"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center gap-3">
                <FormMessage className="text-base" />
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    containerClassName="gap-1"
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-base text-center text-gray-500">
                  Please enter the code sent to your email.
                </FormDescription>
              </FormItem>
            )}
          />
          <p className="text-center text-gray-500">
            Didn't get the code?{" "}
            <span className="hover:underline text-mainAccent hover:cursor-pointer ">
              Resend code
            </span>
          </p>
          <div className="flex w-full gap-3">
            <button
              onClick={backButtonAction}
              type="button"
              className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
            >
              Back
            </button>
            <button
              type="submit"
              className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700"
            >
              Verify
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
