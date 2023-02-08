import constants from '../constants';
import {
  CartModel,
  OrderModel,
  ProductModel,
  UserModel
} from '../database/models';
import { ExtendedCartItemInterface } from '../database/models/CartModel';
import { OrderItemInterface } from '../database/models/OrderModel';
import BaseError from '../errors/base-error';
import { stripe } from '../utils/stripe.utils';

export const handlePaymentIntentSucceeded = async (paymentIntent: any) => {
  const customer = await stripe.customers.retrieve(paymentIntent?.customer);
  if (customer.deleted === true) {
  } else {
    const { userId, productId, quantity } = customer.metadata;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw BaseError.notFound('User not found.');

    const shippingAddress = user.addresses.find(
      (address) => address._id.toString() === user.shippingAddressId
    );

    let order;
    // if u have bought product not form the cart
    if (productId) {
      const product = await ProductModel.findOne({ _id: productId });
      if (!product) throw BaseError.notFound('Product not found.');
      order = await OrderModel.create({
        userId,
        customerId: paymentIntent.customer,
        paymentIntentId: paymentIntent.payment_intent,
        paymentStatus: constants.status.success,
        status: constants.status.pending,
        shippingAddress,
        bill: product.pricing.basePrice,
        items: [{ ...product, quantity: quantity }],
        paymentType: constants.paymentType.online
      });

      return { order, message: 'Order payment successfully completed.' };
    }

    // if you have bought product form the cart
    const cart = await CartModel.findOne({ userId })
      .populate<{
        items: ExtendedCartItemInterface[];
      }>('items.itemId')
      .select('-items.basePrice');
    if (!cart) throw BaseError.notFound('Cart not found.');
    if (cart.items.length === 0)
      throw BaseError.notFound('Cart item not found.');

    const items: OrderItemInterface[] = [];

    cart.items.forEach((item) =>
      items.push({
        sku: item.itemId.sku,
        name: item.itemId.name,
        title: item.itemId.title,
        description: item.itemId.description,
        avgRating: item.itemId.avgRating,
        ratingCount: item.itemId.ratingCount,
        ratingValue: item.itemId.ratingValue,
        manufacture_details: item.itemId.manufacture_details,
        pricing: item.itemId.pricing,
        imageUrl: item.itemId.imageUrl,
        category: item.itemId.category,
        quantity: item.quantity
      })
    );

    order = await OrderModel.create({
      userId,
      customerId: paymentIntent.customer,
      paymentIntentId: paymentIntent.payment_intent,
      paymentStatus: constants.status.success,
      status: constants.status.pending,
      items,
      bill: cart.bill,
      shippingAddress,
      paymentType: constants.paymentType.online
    });

    await CartModel.deleteOne({ _id: cart._id });
    return { order, message: 'Order payment successfully completed.' };
  }
};
