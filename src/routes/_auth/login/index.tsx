import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../../../components/core/auth/login/LoginForm";
import { useEffect } from "react";
import { useAuthStore } from "@/utils/stores/useAuthStore";

export const Route = createFileRoute("/_auth/login/")({
  component: () => <LoginPage />,
});

function LoginPage() {
  const resetState = useAuthStore((state) => state.resetState);

  useEffect(() => {
    resetState();
  }, []);

  return (
    <>
      <h1 className="text-3xl mobile-l:text-4xl font-bold text-mainWhite">
        Login
      </h1>
      <LoginForm />
    </>
  );
}
