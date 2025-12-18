import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";
import type { IResponse } from "../../types/response.type";

function useFetch<
  TQueryFnData = unknown, // API data (response.data)
  TError = unknown,
  TData = IResponse<TQueryFnData>, // transformed data (after select)
>(
  queryKey: QueryKey,
  queryFn: () => Promise<IResponse<TQueryFnData>>,
  options?: Omit<UseQueryOptions<IResponse<TQueryFnData>, TError, TData>, "queryKey" | "queryFn">,
) {
  return useQuery<IResponse<TQueryFnData>, TError, TData>({
    queryKey,
    queryFn,
    ...options,
  });
}

export default useFetch;
