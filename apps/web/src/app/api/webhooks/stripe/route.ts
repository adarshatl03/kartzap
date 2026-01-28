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
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId!;
    const priceId = session.metadata?.priceId!;
    const productId = session.metadata?.productId!;

    const order = await prisma.order.create({
      data: {
        customerId: userId,
        productId,
        organizationId: "", // will fix in Level 7
        totalAmount: session.amount_total!,
        currency: session.currency!,
      },
    });

    const invoice = await prisma.invoice.create({
      data: {
        orderId: order.id,
        organizationId: "",
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

  return NextResponse.json({ received: true });
}
