import { OrderModel } from "../database/models";
import CartModel, { CartInterface } from "../database/models/CartModel";
import { OrderInterface } from "../database/models/OrderModel";
import ProductModel, {
  ProductInterface,
} from "../database/models/ProductModel";
import UserModel, { UserInterface } from "../database/models/UserModel";
import BaseError from "../errors/base-error";

// - Fetch orders and each order can contain multiple item
export const fetchOrders = async (userId: UserInterface["_id"]) => {
  const orders = await OrderModel.find({ userId });
  if (!orders) return { orders: [], message: "No Order found." };
  return { orders, message: "order fetched successfully." };
};

// - Fetch single order by order id
export const fetchOrder = async (orderId: OrderInterface["_id"] | string) => {
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

  const shippingAddress = user.addresses.find(
    (address) => address.isShippingAddress === true
  );

  if (!shippingAddress)
    throw BaseError.notFound("Please select shipping address.");

  // - Payment gateway will integrate in future
  // - After payment successfully done
  const order = await OrderModel.create({
    userId: user._id,
    paymentStatus: true,
    status: "PENDING",
    bill: product.pricing.basePrice,
    items: [product],
    shippingAddress,
  });
  return { order, message: "Item order successfully" };
};

// Buying products form cart
export const buyItemFromCart = async ({ user }: { user: UserInterface }) => {
  const cart = await CartModel.findOne({ userId: user._id });
  if (!cart) throw BaseError.notFound("Cart Not found.");

  const shippingAddress = user.addresses.find(
    (address) => address.isShippingAddress === true
  );
  // - Payment gateway will integrate in future
  // - After payment successfully done
  const order = await OrderModel.create({
    userId: user._id,
    paymentStatus: true,
    status: "PENDING",
    bill: cart.bill,
    items: cart.items,
    shippingAddress,
  });
  return { order, message: "Item order successfully" };
};
