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
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/utils/stores/authStore";
import { ForgotPasswordStep } from "@/utils/types/auth/auth";
import { findAccountFormSchema } from "@/utils/variables/formSchemas";
import { FindAccountFormData } from "@/utils/types/auth/forms";

export default function FindAccountForm() {
  const router = useRouter();
  const { setForgotPasswordStep } = useAuthStore();

  const form = useForm<FindAccountFormData>({
    resolver: zodResolver(findAccountFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FindAccountFormData) {
    setForgotPasswordStep(ForgotPasswordStep.VERIFY_EMAIL);
    router.navigate({
      to: "/login/forgot-password/verify-email",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-mainWhite w-[370px] flex flex-col"
      >
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Email"
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
            onClick={() => router.navigate({ to: "/login" })}
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="grid w-1/2 h-full py-2 mt-8 font-medium transition-colors border rounded-lg bg-mainAccent hover:bg-fuchsia-700 place-items-center border-mainAccent hover:border-fuchsia-700"
          >
            Find
          </button>
        </div>
      </form>
    </Form>
  );
}
