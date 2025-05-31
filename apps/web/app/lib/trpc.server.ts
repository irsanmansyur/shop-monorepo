import { appRouter } from "@packages/trpc/shared";

export const trpcServer = appRouter.createCaller({});
