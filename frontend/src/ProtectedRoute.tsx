import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useCurrentUserProviderContext } from "./context/CurrentUserProviderContext";

interface Props {
  access: "authenticated" | "guest";
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectRouted({ access, children, redirectTo }: Props) {
  const { data,isLoading, isPending,isError } = useCurrentUserProviderContext();
  const user = isError ? null :data?.data 
 
  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-base-content">Loading...</p>
      </div>
    );
  }

  // Authenticated routes (requires login)
  if (access === "authenticated") {
    if (!user) {
      return <Navigate to={redirectTo || "/intro"} replace />;
    }
    return <>{children}</>;
  }

  // Guest routes (requires user NOT to be logged in)
  if (access === "guest") {
    if (user) {
      return <Navigate to={redirectTo || "/"}  replace />;
    }
    return <>{children}</>;
  }

  // Default fallback
  return null;
}
