import Stripe from "stripe";
import config from "../config";
import constants from "../constants";
import { OrderItemInterface } from "../database/models/OrderModel";

export const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

interface makePaymentInterface {
  metadata: {
    userId: string;
    productId: string | null;
    cartId: string | null;
  };
  items: OrderItemInterface[];
  email: string;
}
export const makePayment = async ({
  metadata,
  items,
  email,
}: makePaymentInterface) => {
  metadata.userId;
  // create customer
  const customer = await stripe.customers.create({ metadata });

  const line_items = items.map((item: OrderItemInterface) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: item.name,
        description: item.description,
      },
      unit_amount: item.pricing.basePrice,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    currency: "usd",
    line_items: line_items,
    mode: "payment",
    success_url: `${config.CLIENT_URL}/payment/success`,
    cancel_url: `${config.CLIENT_URL}/payment/fail`,
  });
  return { url: session.url };
};

export const paymentSuccess = async ({
  items,
}: {
  items: OrderItemInterface[];
}) => {
  const line_items = items.map((item: OrderItemInterface) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: item.name,
        description: item.description,
      },
      unit_amount: item.pricing.basePrice,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    currency: "usd",
    line_items: line_items,
    mode: "payment",
    success_url: `${config.CLIENT_URL}/payment/success`,
    cancel_url: `${config.CLIENT_URL}/payment/fail`,
  });
  return { url: session.url };
};
