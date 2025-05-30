import { z } from "zod";
import { db } from "../client/index";
import { publicProcedure, router } from "../trpc";
import { searchConditionPrisma } from "../helpers";

export const productRouter = router({
  all: publicProcedure
    .input(
      z
        .object({
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          page: z.number().optional(),
          limit: z.number().optional(),
          search: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const page = input?.page && input.page > 0 ? input.page : 1;
      const limit = input?.limit && input.limit > 0 ? input.limit : 10;
      const skip = (page - 1) * limit;
      const searching = searchConditionPrisma(input?.search, ["name"]);
      console.log(searching);
      const where = {
        isActive: true,
        ...(input?.minPrice !== undefined || input?.maxPrice !== undefined
          ? {
              price: {
                ...(input?.minPrice !== undefined && {
                  gte: input.minPrice,
                }),
                ...(input?.maxPrice !== undefined && {
                  lte: input.maxPrice,
                }),
              },
            }
          : {}),
        ...searching,
      };

      const [items, total] = await Promise.all([
        db.product.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        db.product.count({ where }),
      ]);

      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }),
  getOne: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return db.product.findFirst({
        where: {
          slug: input.slug,
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
});
