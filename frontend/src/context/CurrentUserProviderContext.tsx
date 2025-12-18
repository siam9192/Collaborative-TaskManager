import { createContext, useContext, type ReactNode } from "react";
import { userGetCurrentUserQuery } from "../query/services/user.service";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CurrentUser } from "../types/user.type";
import type { IResponse } from "../types/response.type";
const context = createContext<UseQueryResult<IResponse<CurrentUser>, unknown> | null>(null);

function CurrentUserProviderContext({ children }: { children: ReactNode }) {
  const queryResult = userGetCurrentUserQuery();

  return <context.Provider value={queryResult}>{children}</context.Provider>;
}

export default CurrentUserProviderContext;

export function useCurrentUserProviderContext() {
  const ctx = useContext(context);
  if (!ctx) throw new Error("Wrap with CurrentUserProviderContext ");
  return ctx;
}
