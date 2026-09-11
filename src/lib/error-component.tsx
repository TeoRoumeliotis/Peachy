import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "Κάτι πήγε στραβά. Δοκίμασε να ξαναφορτώσεις.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-cream px-6 text-center text-ink">
      <h1 className="text-lg font-semibold tracking-tight">Κάτι πήγε στραβά</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
    </main>
  );
}
