import { matchRoutes } from "react-router";
import { describe, expect, it, vi } from "vitest";

// Route modules import the Supabase client; matching routes never touches it.
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { routes } = await import("@/routes");

const leafPath = (url: string) => matchRoutes(routes, url)?.at(-1)?.route.path;

describe("App routing", () => {
  it.each(["/", "/app", "/sign-in", "/sign-up"])("matches a page for %s", (url) => {
    expect(leafPath(url)).toBe(url);
  });

  it("falls back to the not-found page for unknown paths", () => {
    expect(leafPath("/does-not-exist")).toBe("*");
  });
});
