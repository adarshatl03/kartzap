import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/server/db";
import { getCurrentUser } from "@/server/auth/current-user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
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
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        customerId: customer.id,
        status: "ACTIVE",
      },
    });

    if (!subscription || !subscription.externalSubscriptionId) {
      return NextResponse.json(
        { error: "No active subscription" },
        { status: 400 }
      );
    }

    await stripe.subscriptions.cancel(
      subscription.externalSubscriptionId
    );

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "CANCELED" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Cancel failed" },
      { status: 500 }
    );
  }
}
