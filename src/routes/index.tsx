import { createFileRoute } from "@tanstack/react-router";
import { PeachyApp } from "@/components/peachy/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PeachyApp />;
}
