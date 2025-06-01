import type { AppRouter } from "@packages/trpc/shared";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API + "/api/trpc",
    }),
  ],
});
