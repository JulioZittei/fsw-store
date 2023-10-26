import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import HttpStatus from "http-status-codes";
import { prismaClient } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        reason: "No stripe signature present on Webhook message",
      },
      {
        status: 412,
        statusText: HttpStatus.getStatusText(412),
      },
    );

  const text = await req.text();
  try {
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        },
      );
      const lineItems = sessionWithLineItems.line_items;

      await prismaClient.order.update({
        where: {
          id: session.metadata?.orderId,
        },
        data: {
          status: "PAYMENT_CONFIRMED",
        },
      });
    }

    return NextResponse.json(
      { received: true },
      {
        status: 200,
        statusText: HttpStatus.getStatusText(200),
      },
    );
  } catch (error) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          reason: error.message,
        },
        {
          status: 400,
          statusText: HttpStatus.getStatusText(400),
        },
      );
    }
  }
};
