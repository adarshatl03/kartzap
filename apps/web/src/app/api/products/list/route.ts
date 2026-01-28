import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getActiveOrganization } from "@/server/auth/organization";

export async function GET() {
  const org = await getActiveOrganization();

  if (!org) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const products = await prisma.product.findMany({
    where: {
      organizationId: org.id,
      isActive: true,
    },
    include: {
      prices: true,
    },
  });

  return NextResponse.json(products);
}
