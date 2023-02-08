import constants from '../constants';
import { OrderModel } from '../database/models';
import CartModel, {
  CartInterface,
  ExtendedCartItemInterface
} from '../database/models/CartModel';
import {
  OrderInterface,
  OrderItemInterface
} from '../database/models/OrderModel';
import ProductModel, {
  ProductInterface
} from '../database/models/ProductModel';
import UserModel, { UserInterface } from '../database/models/UserModel';
import BaseError from '../errors/base-error';
import { makePayment } from '../utils';

// - Fetch orders and each order can contain multiple item
export const fetchOrders = async (userId: UserInterface['_id']) => {
  const orders = await OrderModel.find({ userId });
  if (!orders) return { orders: [], message: 'No Order found.' };
  return { orders, message: 'order fetched successfully.' };
};

// - Fetch single order by order id
export const fetchOrder = async (orderId: string) => {
  const order = await OrderModel.findOne({ _id: orderId });
  if (!order) return { orders: [], message: 'No Order found.' };
  return { order, message: 'Product fetched successfully.' };
};

// Buying single product not form the cart
export const buySingleItem = async ({
  itemId,
  quantity,
  user
}: {
  itemId: ProductInterface['_id'];
  quantity: number;
  user: UserInterface;
}) => {
  const product = await ProductModel.findOne({ _id: itemId });
  if (!product) return { message: 'Product not exist.' };

  const metadata = {
    userId: user._id.toString(),
    productId: null,
    quantity
  };

  const { url } = await makePayment({
    items: [{ ...product, quantity }],
    metadata
  });
  return { url, message: 'Successfully created the url.' };
};

// Buying single product not form the cart
export const buySingleItemCOD = async ({
  itemId,
  quantity,
  user
}: {
  itemId: ProductInterface['_id'];
  quantity: number;
  user: UserInterface;
}) => {
  const product = await ProductModel.findOne({ _id: itemId });
  if (!product) return { message: 'Product not exist.' };
  const shippingAddress = user.addresses.find(
    (address) => address._id.toString() === user.shippingAddressId
  );

  const order = await OrderModel.create({
    userId: user._id,
    paymentStatus: constants.status.pending,
    status: constants.status.pending,
    shippingAddress,
    bill: product.pricing.basePrice,
    items: [{ ...product, quantity }],
    paymentType: constants.paymentType.cod
  });

  return { order, message: 'Order payment successfully completed.' };
};

// Buying products form cart
export const buyItemFromCart = async ({ user }: { user: UserInterface }) => {
  const cart = await CartModel.findOne({ userId: user._id })
    .populate<{
      items: ExtendedCartItemInterface[];
    }>('items.itemId')
    .select('-items.basePrice');
  if (!cart || cart.items?.length === 0)
    throw BaseError.notFound('Cart items Not found.');

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

  const metadata = {
    userId: user._id.toString(),
    productId: null
  };

  // - Payment gateway will integrate in future
  const { url } = await makePayment({ metadata, items });
  return { url, message: 'Item order successfully' };
};

// Buying products form cart
export const buyItemFromCartCOD = async ({ user }: { user: UserInterface }) => {
  const cart = await CartModel.findOne({ userId: user._id })
    .populate<{
      items: ExtendedCartItemInterface[];
    }>('items.itemId')
    .select('-items.basePrice');
  if (!cart || cart.items?.length === 0)
    throw BaseError.notFound('Cart items Not found.');

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

  console.log(user.addresses, user.shippingAddressId, 'address');
  const shippingAddress = user.addresses.find(
    (address) => address._id.toString() === user.shippingAddressId
  );
  if (!shippingAddress)
    throw BaseError.badRequest('Please select shipping address first');

  const order = await OrderModel.create({
    userId: user?._id,
    paymentStatus: constants.status.pending,
    status: constants.status.pending,
    items,
    bill: cart.bill,
    shippingAddress,
    paymentType: constants.paymentType.cod
  });
  await CartModel.deleteOne({ _id: cart._id });
  return { order, message: 'Order payment successfully completed.' };
};
