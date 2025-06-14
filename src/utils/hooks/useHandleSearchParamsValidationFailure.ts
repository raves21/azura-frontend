import { useEffect } from "react";
import { DependencyList } from "react";

type Args = {
  isValidationFail: boolean;
  deps?: DependencyList;
  onValidationFail: () => void;
};

export function useHandleSearchParamsValidationFailure({
  isValidationFail,
  deps = [],
  onValidationFail,
}: Args) {
  useEffect(() => {
    if (isValidationFail) {
      onValidationFail();
    }
  }, [...deps]);
}
