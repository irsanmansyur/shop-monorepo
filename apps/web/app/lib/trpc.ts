import type { AppRouter } from "@packages/trpc/shared";
import { createTRPCReact } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>();
