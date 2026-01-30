import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getCurrentUser } from "@/server/auth/current-user";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const customer = await prisma.customer.findFirst({
    where: {
      email: user.email!,
    },
  });

  if (!customer) {
    return NextResponse.json(
      { subscription: null }
    );
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      customerId: customer.id,
      status: "ACTIVE",
    },
    include: {
      price: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json({ subscription });
}
