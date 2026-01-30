import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { requireAdmin } from "@/server/auth/require-admin";
import { getActiveOrganization } from "@/server/auth/organization";

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const org = await getActiveOrganization();

    if (!org) {
      return NextResponse.json(
        { error: "ORGANIZATION_NOT_FOUND" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "NAME_REQUIRED" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        organizationId: org.id,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: "FORBIDDEN" },
      { status: 403 }
    );
  }
}
