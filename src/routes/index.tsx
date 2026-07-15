import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/components/stitch-zero/Landing";

export const Route = createFileRoute("/")({
  component: Landing,
});
