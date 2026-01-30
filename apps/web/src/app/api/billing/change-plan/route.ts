import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/server/db";
import { getCurrentUser } from "@/server/auth/current-user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { priceId } = body;

    const price = await prisma.price.findUnique({
      where: { id: priceId },
      include: { product: true },
    });

    if (!price || !price.interval) {
      return NextResponse.json(
        { error: "INVALID_PRICE" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findFirst({
      where: { email: user.email! },
    });

    if (!customer || !customer.externalCustomerId) {
      return NextResponse.json(
        { error: "CUSTOMER_NOT_FOUND" },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.externalCustomerId,
      line_items: [
        {
          price_data: {
            currency: price.currency,
            unit_amount: price.amount,
            recurring: {
              interval: price.interval as any,
            },
            product_data: {
              name: price.product.name,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerId: customer.id,
        priceId: price.id,
        productId: price.productId,
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: "CHANGE_PLAN_FAILED" },
      { status: 500 }
    );
  }
}
