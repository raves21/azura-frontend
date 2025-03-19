import { useEffect } from "react";
import { DependencyList } from "react";

type UseHandleSearchValidationFailureArgs = {
  isValidationFail: boolean;
  deps?: DependencyList;
  onValidationError: () => void;
};

export function useHandleSearchValidationFailure({
  isValidationFail,
  deps = [],
  onValidationError
}: UseHandleSearchValidationFailureArgs) {
  useEffect(() => {
    if (isValidationFail) {
      onValidationError();
    }
  }, [...deps]);
}
