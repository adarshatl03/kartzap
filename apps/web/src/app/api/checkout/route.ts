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

    if (!price) {
      return NextResponse.json(
        { error: "INVALID_PRICE" },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: price.currency,
            unit_amount: price.amount,
            product_data: {
              name: price.product.name,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        priceId: price.id,
        productId: price.productId,
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "CHECKOUT_FAILED" },
      { status: 500 }
    );
  }
}
