import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export function AuthGuard({ children }: PropsWithChildren) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const isAtLoginPage = router.asPath === "/login";

  useEffect(() => {
    if (!isLoggedIn && !isAtLoginPage) {
      router.push("/login");
    }
  }, [isLoggedIn, isAtLoginPage, router]);

  return (
    <>
      {(isLoggedIn || isAtLoginPage) && children}
    </>
  );
}