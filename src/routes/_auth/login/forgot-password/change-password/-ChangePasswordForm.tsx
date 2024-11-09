import { z } from "zod";
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

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, {
        message: "This field is required.",
      })
      .superRefine((password, ctx) => {
        if (password.length < 8) {
          ctx.addIssue({
            code: "custom",
            message: "Minimum of 8 characters.",
          });
        }
      }),
    confirmNewPassword: z.string().min(1, {
      message: "This field is required.",
    }),
  })
  .refine((values) => values.confirmNewPassword === values.newPassword, {
    message: "Passwords doesn't match.",
    path: ["confirmNewPassword"],
  });

export default function ChangePasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    //
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-mainWhite w-[370px] flex flex-col"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full">
                  <p className="text-gray-500">New Password</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="*************"
                    {...field}
                    className="font-medium bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between w-full">
                  <p className="text-gray-500">Confirm new Password</p>
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="*************"
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
            Confirm
          </button>
        </div>
      </form>
    </Form>
  );
}
