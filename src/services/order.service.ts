import constants from "../constants";
import { OrderModel } from "../database/models";
import CartModel, {
  CartInterface,
  ExtendedCartItemInterface,
} from "../database/models/CartModel";
import {
  OrderInterface,
  OrderItemInterface,
} from "../database/models/OrderModel";
import ProductModel, {
  ProductInterface,
} from "../database/models/ProductModel";
import UserModel, { UserInterface } from "../database/models/UserModel";
import BaseError from "../errors/base-error";
import { makePayment } from "../utils";

// - Fetch orders and each order can contain multiple item
export const fetchOrders = async (userId: UserInterface["_id"]) => {
  const orders = await OrderModel.find({ userId });
  if (!orders) return { orders: [], message: "No Order found." };
  return { orders, message: "order fetched successfully." };
};

// - Fetch single order by order id
export const fetchOrder = async (orderId: string) => {
  const order = await OrderModel.findOne({ _id: orderId });
  if (!order) return { orders: [], message: "No Order found." };
  return { order, message: "Product fetched successfully." };
};

// Buying single product not form the cart
export const buySingleItem = async ({
  itemId,
  quantity,
  user,
}: {
  itemId: ProductInterface["_id"];
  quantity: number;
  user: UserInterface;
}) => {
  const product = await ProductModel.findOne({ _id: itemId });
  if (!product) return { message: "Product not exist." };

  const metadata = {
    userId: user._id.toString(),
    productId: null,
    cartId: null,
  };

  const { url } = await makePayment({
    items: [{ ...product, quantity }],
    metadata,
    email: user.email,
  });
  return { url, message: "Successfully created the url." };

  // const shippingAddress = user.addresses.find(
  //   (address) => address.isShippingAddress === true
  // );

  // if (!shippingAddress)
  //   throw BaseError.notFound("Please select shipping address.");

  // - Payment gateway will integrate in future
  // - After payment successfully done
  // const order = await OrderModel.create({
  //   userId: user._id,
  //   paymentStatus: constants.status.pending,
  //   status: "PENDING",
  //   bill: product.pricing.basePrice,
  //   items: [{ ...product, quantity }],
  //   shippingAddress,
  // });
};

// Buying products form cart
export const buyItemFromCart = async ({ user }: { user: UserInterface }) => {
  const cart = await CartModel.findOne({ userId: user._id })
    .populate<{
      items: ExtendedCartItemInterface[];
    }>("items.itemId")
    .select("-items.basePrice");
  if (!cart || cart.items?.length === 0)
    throw BaseError.notFound("Cart items Not found.");

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
      quantity: item.quantity,
    })
  );

  const metadata = {
    userId: user._id.toString(),
    productId: null,
    cartId: cart._id.toString(),
  };

  // - Payment gateway will integrate in future
  const { url } = await makePayment({ metadata, items, email: user.email });
  return { url, message: "Item order successfully" };

  // const shippingAddress = user.addresses.find(
  //   (address) => address.isShippingAddress === true
  // );

  // -
  // const order = await OrderModel.create({
  //   userId: user._id,
  //   paymentStatus: constants.status.pending,
  //   status: "PENDING",
  //   bill: cart.bill,
  //   items,
  //   shippingAddress,
  // });

  // deleting items from cart
  // cart.items = [];
  // await cart.save();
};
