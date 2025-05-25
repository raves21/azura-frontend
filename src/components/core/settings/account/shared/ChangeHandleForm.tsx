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
import { useNavigate } from "@tanstack/react-router";
import { changeHandleFormSchema } from "@/utils/variables/formSchemas";
import { ChangeHandleFormData } from "@/utils/types/auth/forms";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import ErrorDialog from "@/components/core/shared/ErrorDialog";
import { useAccountSettingStore } from "@/utils/stores/useAccountSettingStore";
import { useChangeHandle, useVerifyHandle } from "@/services/auth/authQueries";
import {
  getCurrentUser,
  setCurrentUser,
} from "@/services/auth/sharedFunctions";
import AsyncConfirmationDialog from "@/components/core/shared/confirmationDialog/AsyncConfirmationDialog";
import { cn } from "@/lib/utils";
import { useUniqueMutationKeyStore } from "@/utils/stores/useUniqueMutationKeyStore";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeHandleForm() {
  const navigate = useNavigate();
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const setChangeHandleStep = useAccountSettingStore(
    (state) => state.setChangeHandleStep
  );

  const uniqueMutationKey = useUniqueMutationKeyStore(
    (state) => state.uniqueMutationKey
  );
  const { mutateAsync: changeHandle } = useChangeHandle({
    key: `accountSettingChangeHandle-${uniqueMutationKey}`,
  });
  const { mutateAsync: verifyHandle, isPending: isVerifyingHandle } =
    useVerifyHandle();

  const form = useForm<ChangeHandleFormData>({
    resolver: zodResolver(changeHandleFormSchema),
    defaultValues: {
      handle: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: ChangeHandleFormData) {
    try {
      await verifyHandle(values.handle);
      toggleOpenDialog(
        <AsyncConfirmationDialog
          confirmAction={async () => await changeHandle(values.handle)}
          header="Change Social handle"
          message={`Are you sure you want to change your social handle to ${values.handle}?`}
          mutationKey={[`accountSettingChangeHandle-${uniqueMutationKey}`]}
          afterConfirmSuccessAction={() => {
            setChangeHandleStep(null);
            const currentUser = getCurrentUser();
            if (!currentUser) return;
            setCurrentUser({
              ...currentUser,
              handle: values.handle,
            });
            toast({ description: "Successfully changed handle." });
            navigate({ to: "/settings", replace: true });
          }}
        />
      );
    } catch (error) {
      toggleOpenDialog(<ErrorDialog error={error} />);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-mainWhite w-full mobile-m:w-[300px] mobile-l:w-[370px] flex flex-col"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="flex items-center justify-between w-full">
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Handle"
                    {...field}
                    maxLength={15}
                    className="pl-8 font-medium w-full bg-gray-800 border-none text-mainWhite"
                  />
                </FormControl>
                <p
                  className={cn(
                    "absolute font-medium text-slate-500 bottom-[9px] transition-colors left-[11px]",
                    { "text-blue-500": !!form.watch().handle.trim() }
                  )}
                >
                  @
                </p>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <button
            disabled={isVerifyingHandle}
            type="button"
            onClick={() => {
              setChangeHandleStep(null);
              navigate({ to: "/settings", replace: true });
            }}
            className="grid w-1/2 h-full py-2 disabled:text-gray-300 mt-8 font-medium transition-colors bg-gray-800 border rounded-lg disabled:bg-gray-900 disabled:border-fuchsia-800/80 disabled:hover:border-fuchsia-800/80 hover:bg-gray-900 place-items-center border-mainAccent/80 hover:border-fuchsia-700/80"
          >
            Cancel
          </button>
          <button
            disabled={isVerifyingHandle}
            type="submit"
            className="flex items-center justify-center disabled:text-gray-300 w-1/2 h-full gap-3 py-2 mt-8 font-medium transition-colors border rounded-lg disabled:bg-fuchsia-700 bg-mainAccent hover:bg-fuchsia-800 border-mainAccent hover:border-fuchsia-700"
          >
            <p>Proceed</p>
            {isVerifyingHandle && (
              <div className="size-4 loader border-gray-300 border-[3px]" />
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}
