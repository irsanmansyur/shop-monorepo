import { z } from "zod";
import { productRouter } from "./routers/product";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  }),
  product: productRouter,
});

export type AppRouter = typeof appRouter;
