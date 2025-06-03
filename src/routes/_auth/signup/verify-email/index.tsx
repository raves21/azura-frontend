import { createFileRoute, useRouter } from "@tanstack/react-router";
import CodeVerificationForm from "@/components/core/auth/shared/CodeVerificationForm";
import { SignUpStep } from "@/utils/types/auth/auth";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useCreateAccount, useLogin } from "@/services/auth/api/mutations";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useAuthStore } from "@/utils/stores/useAuthStore";
import { LoaderCircle } from "lucide-react";

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
      <div className="flex items-center justify-center gap-5 w-full flex-wrap">
        <h1 className="text-2xl mobile-m:text-3xl font-bold text-mainAccent text-center w-fit">
          Creating account
        </h1>
        <LoaderCircle className="animate-spin size-8 mobile-m:size-10 stroke-mainAccent" />
      </div>
    );
  }

  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center gap-5 w-full flex-wrap">
        <h1 className="text-2xl mobile-m:text-3xl font-bold text-mainAccent text-center w-fit">
          Logging in
        </h1>
        <LoaderCircle className="animate-spin size-8 mobile-m:size-10 stroke-mainAccent" />
      </div>
    );
  }

  return (
    <CodeVerificationForm
      type="auth"
      email={signUpValues.email}
      backButtonAction={() => {
        router.history.back();
        setSignUpStep(SignUpStep.PASSWORD_CONFIRMATION);
      }}
      afterSubmitSuccessAction={async () => {
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
