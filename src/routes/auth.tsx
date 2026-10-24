import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";

type Mode = "signin" | "signup";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode | undefined } => ({
    mode: s["mode"] === "signup" ? "signup" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Flight Price Notifier" },
      { name: "description", content: "Sign in or create your Flight Price Notifier account." },
      { property: "og:title", content: "Sign in — Flight Price Notifier" },
      { property: "og:description", content: "Sign in or create your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/app", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) navigate({ to: "/app", replace: true });
    else setError("請到信箱確認帳號後再登入。Check your email to confirm.");
  }

  const isSignup = mode === "signup";
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader right={<Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>} />
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-sm px-4 py-20">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-glow">
            <h1 className="text-2xl font-bold">{isSignup ? "Sign up / 註冊" : "Sign in / 登入"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignup ? "Create your account with email." : "Welcome back."}
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? "..." : isSignup ? "Create account" : "Sign in"}
              </Button>
            </form>
            <button
              type="button"
              onClick={() => { setMode(isSignup ? "signin" : "signup"); setError(null); }}
              className="mt-6 w-full text-center text-sm text-muted-foreground hover:text-foreground"
            >
              {isSignup ? "Already have an account? Sign in" : "No account yet? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
