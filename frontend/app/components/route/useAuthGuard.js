
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMe } from "../../hooks/useAuthMutations";

export function useAuthGuard(requiredRoles = []) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (isLoading) return;

    // ❌ Not logged in
    if (isError || !data?.user) {
      if (pathname !== "/") {
        router.replace("/");
      }
      return;
    }

    const role = data.user.role;

    // ❌ Role not allowed → redirect to OWN home
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else if (role === "employee") {
        router.replace("/employee");
      } else if (role === "user")  {
        router.replace("/serviced");
      }
    }
  }, [isLoading, isError, data, pathname, router, requiredRoles]);

  return {
    loading: isLoading,
    user: data?.user ?? null,
  };
}
