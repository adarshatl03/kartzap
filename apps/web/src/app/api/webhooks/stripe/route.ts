import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json(
      { error: "WEBHOOK_VERIFICATION_FAILED" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // One-time payment
    if (session.mode === "payment") {
      const userId = session.metadata?.userId!;
      const priceId = session.metadata?.priceId!;
      const productId = session.metadata?.productId!;

      const customer = await prisma.customer.findFirst({
        where: { email: session.customer_email! },
      });

      if (!customer) return NextResponse.json({ received: true });

      const order = await prisma.order.create({
        data: {
          customerId: customer.id,
          productId,
          organizationId: customer.organizationId,
          totalAmount: session.amount_total!,
          currency: session.currency!,
        },
      });

      const invoice = await prisma.invoice.create({
        data: {
          orderId: order.id,
          organizationId: customer.organizationId,
          invoiceNumber: `INV-${Date.now()}`,
          totalAmount: session.amount_total!,
          currency: session.currency!,
        },
      });

      await prisma.payment.create({
        data: {
          invoiceId: invoice.id,
          amount: session.amount_total!,
          status: "SUCCESS",
          provider: "stripe",
          externalPaymentId: session.payment_intent as string,
        },
      });
    }

    // Subscription payment
    if (session.mode === "subscription") {
      const subscriptionId = session.subscription as string;
      const customerId = session.metadata?.customerId!;
      const priceId = session.metadata?.priceId!;

      await prisma.subscription.create({
        data: {
          customerId,
          priceId,
          status: "ACTIVE",
          externalSubscriptionId: subscriptionId,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
