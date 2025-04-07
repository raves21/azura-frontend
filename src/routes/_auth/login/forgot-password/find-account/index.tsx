import { createFileRoute } from "@tanstack/react-router";
import FindAccountForm from "../../../../../components/core/auth/login/forgotPassword/findAccount/FindAccountForm";

export const Route = createFileRoute(
  "/_auth/login/forgot-password/find-account/"
)({
  component: () => <FindAccountPage />,
});

function FindAccountPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-mainWhite">Find your acccount</h1>
      <p className="text-gray-500">
        Please enter your email to search for your account.
      </p>
      <FindAccountForm />
    </div>
  );
}
