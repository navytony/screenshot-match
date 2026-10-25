import { Link } from "react-router";
import { Radar, BellRing, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useReveal } from "@/hooks/use-reveal";
import { useDocumentTitle } from "@/hooks/use-document-title";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線 (Always-on route watching)",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知 (Target-price email alerts)",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX,
    title: "隨時取消 (Cancel anytime)",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export default function Index() {
  useDocumentTitle("Flight Price Notifier — 機票降價通知");
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        right={
          <Button asChild variant="hero" size="sm">
            <Link to="/sign-in">Sign in / 登入</Link>
          </Button>
        }
      />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
          <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-36">
            <p className="reveal mb-6 inline-block rounded-full border border-border bg-card px-4 py-1 text-xs text-muted-foreground">
              TPE → NRT · HND · ICN
            </p>
            <h1 className="reveal text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient">Flight Price</span> Notifier
            </h1>
            <p className="reveal mt-6 text-xl font-medium sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="reveal mt-3 text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="reveal mt-10">
              <Button asChild variant="hero" size="lg">
                <Link to="/sign-up">免費開始 · Get started</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="reveal rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <f.icon className="h-5 w-5 text-primary-glow" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
