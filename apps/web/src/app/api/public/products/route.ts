import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      prices: true,
      organization: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
