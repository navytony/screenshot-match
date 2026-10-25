import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useOutletContext } from "react-router";

import { supabase } from "@/integrations/supabase/client";

type AuthState =
  { status: "loading" } | { status: "signed-out" } | { status: "signed-in"; user: User };

/** Client-side gate for signed-in pages. Child routes read the user with `useAuthUser()`. */
export function RequireAuth() {
  const [state, setState] = useState<AuthState>({ status: "loading" });
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setState(data.user ? { status: "signed-in", user: data.user } : { status: "signed-out" });
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") navigate("/sign-in", { replace: true });
      else if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user)
        setState({ status: "signed-in", user: session.user });
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  if (state.status === "loading") return null;
  if (state.status === "signed-out") return <Navigate to="/sign-in" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}

type AuthContext = { user: User };

export function useAuthUser(): User {
  return useOutletContext<AuthContext>().user;
}
