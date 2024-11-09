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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be 6 digits.",
  }),
});

type CodeVerificationFormProps = {
  backButtonAction: () => void;
  verificationSuccessNavigationLink: string;
};

export default function CodeVerificationForm({
  backButtonAction,
  verificationSuccessNavigationLink,
}: CodeVerificationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    router.navigate({
      to: verificationSuccessNavigationLink,
    });
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-mainWhite">Email Verification</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
