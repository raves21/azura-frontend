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
import { useOTC } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "../ErrorDialog";
import { Check } from "lucide-react";
import { useAuthStore } from "@/utils/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { codeVerificationFormSchema } from "@/utils/variables/formSchemas";
import { CodeVerificationFormData } from "@/utils/types/auth/forms";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

type CodeVerificationFormProps = {
  backButtonAction: () => void;
  verifyButtonAction: (values: CodeVerificationFormData) => void;
  isVerifying: boolean;
  verificationError: AxiosError | null;
};

export default function CodeVerificationForm({
  backButtonAction,
  verifyButtonAction,
  isVerifying,
  verificationError,
}: CodeVerificationFormProps) {
  const { signUpValues } = useAuthStore();
  const email = signUpValues.email;
  const { toggleOpenDialog } = useGlobalStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: otc,
    isFetching: isOTCLoading,
    error: OTCError,
  } = useOTC(email);

  const [verificationErrorMessage, setVerificationErrorMessage] = useState<
    string | null
  >(null);

  const form = useForm<CodeVerificationFormData>({
    resolver: zodResolver(codeVerificationFormSchema),
    defaultValues: {
      code: "",
    },
  });

  //this is for clearing the error message for every input completion
  //so that the error message that was there before will be cleared.
  useEffect(() => {
    setVerificationErrorMessage(null);
  }, [form.getValues().code]);

  //this is for setting the verification error message.
  //this will only trigger when clicking the verify button, since
  //a new verificationError (if any) from the useVerifyOTC will be passed in this component.
  useEffect(() => {
    if (verificationError && verificationError.response) {
      if (verificationError.response.status === 400) {
        setVerificationErrorMessage("The code you entered is incorrect.");
      }
      if (verificationError.response.status === 410) {
        setVerificationErrorMessage("The code you entered is expired.");
      }
    }
  }, [verificationError]);

  if (OTCError) {
    toggleOpenDialog(
      <ErrorDialog
        message="There was an error in resending the code. Please try again later."
        okButtonAction={() => router.navigate({ to: "/login" })}
      />
    );
  }

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
                <FormMessage className="text-base">
                  {verificationErrorMessage}
                </FormMessage>
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
                {!isOTCLoading && !OTCError && (
                  <FormDescription className="text-base text-center text-gray-500">
                    {`Please enter the code sent to your email`}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          {!isOTCLoading && !OTCError && otc ? (
            <div className="flex items-center justify-center gap-3">
              <Check className="size-4 stroke-green-500" />
              <p className="text-green-500">Code Sent!</p>
            </div>
          ) : isOTCLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="border loader size-4 border-mainWhite" />
              <p className="text-mainAccent">Resending Code</p>
            </div>
          ) : null}
          {!isOTCLoading && !OTCError && otc && (
            <p className="text-center text-gray-500">
              Didn't get the code?{" "}
              <span
                onClick={() => {
                  queryClient.refetchQueries(
                    {
                      queryKey: ["otc", email],
                    },
                    {
                      throwOnError: true,
                    }
                  );
                }}
                className="hover:underline text-mainAccent hover:cursor-pointer "
              >
                Resend code
              </span>
            </p>
          )}
          <div className="flex w-full gap-3 pt-8">
            <button
              onClick={backButtonAction}
              type="button"
              className="grid w-1/2 h-full py-2 font-medium transition-colors bg-gray-800 border rounded-lg hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
            >
              Back
            </button>
            <button
              disabled={isOTCLoading || isVerifying}
              type="submit"
              className="flex items-center justify-center w-1/2 gap-3 py-2 font-medium transition-colors border rounded-lg disabled:border-fuchsia-800 disabled:bg-fuchsia-800 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-fuchsia-700"
            >
              {isVerifying ? (
                <>
                  <p>Verifying...</p>
                  <div className="loader border-mainWhite border-[3px] size-4" />
                </>
              ) : (
                <p>Verify</p>
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
