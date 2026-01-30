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

    const payments = await prisma.payment.findMany({
      where: {
        status: "SUCCESS",
        invoice: {
          organizationId: org.id,
        },
      },
    });

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    return NextResponse.json({
      totalRevenue,
      currency: "INR",
      count: payments.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
}
