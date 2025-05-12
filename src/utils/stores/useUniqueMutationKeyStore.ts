import { create } from "zustand";

type Store = {
  uniqueMutationKey: string;
  setUniqueMutationKey: (uniqueId: string) => void;
};

//EXPLANATION:
//mutation state (isSuccess, isPending, isError) cannot be shared across components. To access
//mutation state in other components (Component X) other than the main component where useMutation was used (Component A),
//we need to use "useMutationState". All we need to do is provide the same mutationKey and voila! You can now listen
//to the mutation's state wherever in the component tree. The problem with this is that if your mutationKey is a
//static, unchanging value, if the mutationState of Component X becomes (e.g: success), the moment the mutation is
//invoked again in Component A, Component X's mutationState remains 'success' even if Component A's mutationState is
//currently pending. They are not synced since the only thing that 'syncs' them is the mutationKey which is a static value.
//If mutationKey is ['login'], after the first successful mutation, that mutationKey will forever remain in a state
//of 'success' in Component X. Even if you call mutation.reset in Component A, it will have no effect because Component A
//contains the actual useMutation instance, and Component B does not have any context of that instance, it only listens to
//its mutationState through the mutationKey.

//SOLUTION:
//The solution I came up with is to generate a random mutation key for every invoke of the useMutation. Both
//Component X and Component A must use this random mutation key and after the mutation resolves (success or error),
//its value should be set to another random string (in this case, crypto.randomUUId) so that it will always remain random.
//We can achieve this by making a globally accessible unique mutation key that can be get and can be set from anywhere in
//the codebase. Now Component X's and Component A's mutation state is always synced through the dynamic, unique, mutationKey.

export const useUniqueMutationKeyStore = create<Store>((set) => ({
  uniqueMutationKey: crypto.randomUUID(),
  setUniqueMutationKey: (uniqueMutationKey: string) =>
    set({ uniqueMutationKey }),
}));
