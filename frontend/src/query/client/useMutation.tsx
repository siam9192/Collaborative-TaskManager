import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { IResponse } from "../../types/response.type";

function useMutate<TData = unknown, TVariables = void, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<IResponse<TData>>,
  options?: Omit<UseMutationOptions<IResponse<TData>, TError, TVariables>, "mutationFn">,
) {
  return useMutation<IResponse<TData>, TError, TVariables>({
    mutationFn,
    ...options,
  });
}

export default useMutate;
