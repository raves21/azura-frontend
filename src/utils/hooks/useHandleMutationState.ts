import { MutationKey, useMutationState } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  mutationKey: MutationKey;
  onSuccess?: () => void;
  onPending?: () => void;
  onError?: (error: Error) => void;
};

export function useHandleMutationState({
  mutationKey,
  onError,
  onPending,
  onSuccess,
}: Props) {
  const mutationStatus = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.status,
  });

  const mutationError = useMutationState({
    filters: { mutationKey },
    select: (mutation) => mutation.state.error,
  });

  const isPending = mutationStatus[0] === "pending";
  const isSuccess = mutationStatus[0] === "success";
  const isError = mutationStatus[0] === "error";
  const error = mutationError[0];

  useEffect(() => {
    if (isPending && onPending) {
      onPending();
    }
    if (isError && error && onError) {
      onError(error);
    }
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isPending, isSuccess, isError, mutationError]);

  return { isPending, isSuccess, isError };
}
