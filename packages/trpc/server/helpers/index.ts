import { Prisma } from "@prisma/client";

/**
 * Helper untuk membangun kondisi pencarian di Prisma ORM.
 * @param q - Query string untuk pencarian.
 * @param attributes - Daftar kolom yang akan dicari berdasarkan `q`.
 * @returns Kondisi `OR` Prisma untuk digunakan di where clause.
 */
export function searchConditionPrisma<T extends string>(
  q?: string,
  attributes?: T[],
): Prisma.Enumerable<Prisma.ProductWhereInput> | undefined {
  if (!q || !attributes || attributes.length === 0) {
    return undefined;
  }

  return {
    OR: attributes.map((attribute) => ({
      [attribute]: {
        contains: q,
        mode: "insensitive", // Agar pencarian case-insensitive
      },
    })),
  } as Prisma.ProductWhereInput;
}
