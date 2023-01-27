import { Request, Response } from "express";
import * as services from "../services/webhook.service";
import config from "../config";
import { stripe } from "../utils/stripe.utils";
import BaseError from "../errors/base-error";

export const webhook = async (req: Request, res: Response) => {
  console.log("req come");
  const sig = req.headers["stripe-signature"];
  console.log("req come", sig);
  if (!sig) throw BaseError.badRequest("Invalid stripe signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      //   req.rawBody,
      sig,
      "whsec_57129b3aab98c6ccb89fca61bc66c9acbea0f01097eed465dfe24c2826da0e41"
      //   config.STRIPE_ENDPOINT_SECRET
    );
  } catch (err: any) {
    console.log(err, "webhook err");
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      await services.handlePaymentIntentSucceeded(paymentIntent);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send({ received: true }).end();
};
