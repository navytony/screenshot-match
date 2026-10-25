import { Navigate, useSearchParams, type RouteObject } from "react-router";

import { RootLayout, RootErrorPage } from "@/components/RootLayout";
import { RequireAuth } from "@/components/RequireAuth";
import Index from "@/pages/Index";
import AuthPage from "@/pages/Auth";
import AppPage from "@/pages/AppPage";
import NotFound from "@/pages/NotFound";

/** Old `/auth?mode=signup` links keep working by forwarding to the new pages. */
function LegacyAuthRedirect() {
  const [params] = useSearchParams();
  return <Navigate to={params.get("mode") === "signup" ? "/sign-up" : "/sign-in"} replace />;
}

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/sign-in", element: <AuthPage mode="signin" /> },
      { path: "/sign-up", element: <AuthPage mode="signup" /> },
      { path: "/auth", element: <LegacyAuthRedirect /> },
      {
        element: <RequireAuth />,
        children: [{ path: "/app", element: <AppPage /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
