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
        { error: "CUSTOMER_NOT_FOUND" },
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
        { error: "NO_ACTIVE_SUBSCRIPTION" },
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
      { error: "CANCEL_FAILED" },
      { status: 500 }
    );
  }
}
