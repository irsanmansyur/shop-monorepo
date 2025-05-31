import { appRouter } from "@packages/trpc/server/context";
export const trpcServer = appRouter.createCaller({});
