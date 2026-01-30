import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { requireAdmin } from "@/server/auth/require-admin";

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { productId, amount, currency, interval } = body;

    if (!productId || !amount || !currency) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    const price = await prisma.price.create({
      data: {
        productId,
        amount,
        currency,
        interval, // month | year | null
      },
    });

    return NextResponse.json(price);
  } catch (err) {
    return NextResponse.json(
      { error: "FORBIDDEN" },
      { status: 403 }
    );
  }
}
