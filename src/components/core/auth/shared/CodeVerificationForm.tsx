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
import { useSendOTC, useVerifyOTC } from "@/services/auth/api/mutations";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "../../shared/ErrorDialog";
import { Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { codeVerificationFormSchema } from "@/utils/variables/formSchemas";
import { CodeVerificationFormData } from "@/utils/types/auth/forms";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

type Props = {
  backButtonAction: () => void;
  afterSubmitSuccessAction: (values: CodeVerificationFormData) => void;
  email: string;
  type: "auth" | "accountSettings";
};

export default function CodeVerificationForm({
  backButtonAction,
  afterSubmitSuccessAction,
  email,
  type,
}: Props) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const navigate = useNavigate();
  const {
    mutateAsync: sendOTC,
    isPending: isSendingOTC,
    error: sendOTCError,
  } = useSendOTC({});

  const { mutateAsync: verifyOTC, isPending: isVerifyingOTC } = useVerifyOTC();

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
  const formCode = form.getValues().code;
  useEffect(() => {
    setVerificationErrorMessage(null);
  }, [formCode]);

  //for handling resend OTC error
  useEffect(() => {
    if (sendOTCError) {
      toggleOpenDialog(
        <ErrorDialog
          error={sendOTCError}
          customMessage="There was an error in resending the code. Please try again later."
          okButtonAction={() => {
            if (type === "auth") {
              navigate({ to: "/login" });
            } else {
              navigate({ to: "/settings" });
            }
            toggleOpenDialog(null);
          }}
        />
      );
    }
  }, [sendOTCError]);

  async function onSubmit(values: CodeVerificationFormData) {
    try {
      await verifyOTC({ email, otc: values.code });
      afterSubmitSuccessAction(values);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        //I want to make 410 and 400 error as a formMessage error instead of
        //making it an ErrorDialog. 400 for incorrect OTC, 410 for expired OTC
        if (![400, 410].includes(error.response.status)) {
          toggleOpenDialog(
            <ErrorDialog
              error={error}
              okButtonAction={() => {
                if (type === "auth") {
                  navigate({ to: "/login" });
                } else {
                  navigate({ to: "/settings" });
                }
                toggleOpenDialog(null);
              }}
            />
          );
        } else {
          if (error.response.status === 400) {
            setVerificationErrorMessage("The code you entered is incorrect.");
          }
          if (error.response.status === 410) {
            setVerificationErrorMessage("The code you entered is expired.");
          }
        }
      } else {
        toggleOpenDialog(<ErrorDialog error={error} />);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl mobile-l:text-4xl font-bold text-mainWhite">
        Email Verification
      </h1>
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
                      <InputOTPSlot
                        index={0}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={1}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={2}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={4}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={5}
                        className="w-8 mobile-m:w-10 mobile-l:w-12 sm:w-14"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                {!isSendingOTC && !sendOTCError && (
                  <FormDescription className="text-base text-center text-gray-500">
                    {`Please enter the code sent to your email`}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          {!isSendingOTC && !sendOTCError ? (
            <div className="flex items-center justify-center gap-3">
              <Check className="size-4 stroke-green-500" />
              <p className="text-green-500">Code Sent!</p>
            </div>
          ) : isSendingOTC ? (
            <div className="flex items-center justify-center gap-3">
              <div className="border loader size-4 border-mainWhite" />
              <p className="text-mainAccent">Resending Code</p>
            </div>
          ) : null}
          {!isSendingOTC && !sendOTCError && (
            <p className="text-center text-gray-500">
              Didn't get the code?{" "}
              <span
                onClick={async () => {
                  await sendOTC(email);
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
              disabled={isSendingOTC || isVerifyingOTC}
              type="submit"
              className="flex items-center justify-center w-1/2 gap-3 py-2 font-medium transition-colors border rounded-lg disabled:border-fuchsia-800 disabled:bg-fuchsia-800 bg-mainAccent hover:bg-fuchsia-700 border-mainAccent hover:border-fuchsia-700"
            >
              {isVerifyingOTC ? (
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
