import { createFileRoute, useRouter } from "@tanstack/react-router";
import CodeVerificationForm from "@/components/shared/auth/CodeVerificationForm";
import { useAuthStore } from "@/utils/stores/authStore";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useLogin, useOTC, useVerifyOTC } from "@/services/auth/authQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/shared/ErrorDialog";
import axios, { AxiosError } from "axios";
// import { codeVerificationFormSchema } from "@/utils/variables/formSchemas";

export const Route = createFileRoute("/_auth/signup/verify-email/")({
  component: () => <VerifyEmailPage />,
});

function VerifyEmailPage() {
  const [signUpStep, setSignUpStep, signUpValues] = useAuthStore(
    useShallow((state) => [
      state.signUpStep,
      state.setSignUpStep,
      state.signUpValues,
    ])
  );
  const router = useRouter();
  const { data: otc } = useOTC(signUpValues.email);
  const {
    mutateAsync: verifyOTC,
    isPending: isVerifyingOTC,
    isSuccess: isVerifyOTCSuccess,
    error: OTCVerificationError,
  } = useVerifyOTC();
  // const {
  //   mutateAsync: login,
  //   isPending: isLoggingIn
  // } = useLogin();
  const { toggleOpenDialog } = useGlobalStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (signUpStep !== SignUpStep.VERIFY_EMAIL) {
      router.navigate({
        to: "/login",
      });
    }
  }, []);

  // if (isLoggingIn) {
  //   return (
  //     <h1 className="text-3xl font-bold text-mainAccent">Logging in...</h1>
  //   );
  // }

  if (isVerifyOTCSuccess) {
    return (
      <h1 className="text-3xl font-bold text-mainAccent">
        CODE VERIFICIATION SUCCESS.
      </h1>
    );
  }

  return (
    <CodeVerificationForm
      verificationError={OTCVerificationError as AxiosError}
      isVerifying={isVerifyingOTC}
      backButtonAction={() => {
        router.history.back();
        setSignUpStep(SignUpStep.PASSWORD_CONFIRMATION);
      }}
      verifyButtonAction={async (values) => {
        if (!otc) return;
        try {
          await verifyOTC({ email: signUpValues.email, otc: values.code });
          // const loginResponse = await login({
          //   email: signUpValues.email,
          //   password: signUpValues.password,
          // });
          // if (loginResponse.isDetachedMode) {
          //   router.navigate({
          //     to: "/detached-mode",
          //   });
          // } else {
          //   queryClient.setQueryData(
          //     ["accessToken"],
          //     loginResponse.data.accessToken
          //   );
          //   router.navigate({
          //     to: "/anime",
          //   });
          // }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (![400, 410].includes(error.response.status)) {
              toggleOpenDialog(
                <ErrorDialog
                  statusCode={error.status}
                  message={error.message}
                />
              );
            }
          } else {
            toggleOpenDialog(<ErrorDialog />);
          }
        }
      }}
    />
  );
}
