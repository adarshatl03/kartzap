import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { requireAdmin } from "@/server/auth/require-admin";
import { getActiveOrganization } from "@/server/auth/organization";

export async function GET() {
  try {
    await requireAdmin();

    const org = await getActiveOrganization();

    if (!org) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 400 }
      );
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        customer: {
          organizationId: org.id,
        },
      },
      include: {
        customer: true,
        price: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(subscriptions);
  } catch {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
}
