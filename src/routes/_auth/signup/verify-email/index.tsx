import { createFileRoute, useRouter } from "@tanstack/react-router";
import CodeVerificationForm from "@/components/core/auth/shared/CodeVerificationForm";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useCreateAccount, useLogin } from "@/services/auth/authQueries";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useAuthStore } from "@/utils/stores/useAuthStore";

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
  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  useEffect(() => {
    if (signUpStep !== SignUpStep.VERIFY_EMAIL) {
      router.navigate({
        to: "/login",
      });
    }
  }, []);

  if (isCreatingAccount) {
    return (
      <h1 className="text-3xl font-bold text-mainAccent">
        Creating account...
      </h1>
    );
  }

  if (isLoggingIn) {
    return (
      <h1 className="text-3xl font-bold text-mainAccent">Logging in...</h1>
    );
  }

  return (
    <CodeVerificationForm
      email={signUpValues.email}
      backButtonAction={() => {
        router.history.back();
        setSignUpStep(SignUpStep.PASSWORD_CONFIRMATION);
      }}
      afterVerificationSuccessAction={async () => {
        try {
          await createAccount({
            username: signUpValues.username,
            email: signUpValues.email,
            handle: signUpValues.handle,
            password: signUpValues.password,
          });
          await login({
            email: signUpValues.email,
            password: signUpValues.password,
          });
        } catch (error) {
          toggleOpenDialog(
            <ErrorDialog
              error={error}
              okButtonAction={() => {
                router.navigate({ to: "/login" });
                toggleOpenDialog(null);
              }}
            />
          );
        }
      }}
    />
  );
}
