import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuthUser } from "@/components/RequireAuth";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function AppPage() {
  useDocumentTitle("Dashboard — Flight Price Notifier");
  const user = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        right={
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        }
      />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Hi <span className="text-gradient break-all">{user.email}</span>
        </h1>
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-8">
          <p className="text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
