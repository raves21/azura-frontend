import { useEffect } from "react";
import { DependencyList } from "react";

type Args = {
  isValidationFail: boolean;
  deps?: DependencyList;
  onValidationError: () => void;
};

export function useHandleSearchParamsValidationFailure({
  isValidationFail,
  deps = [],
  onValidationError,
}: Args) {
  useEffect(() => {
    if (isValidationFail) {
      onValidationError();
    }
  }, [...deps]);
}
