import { OrderModel } from "../database/models";
import CartModel, { CartInterface } from "../database/models/CartModel";
import { OrderInterface } from "../database/models/OrderModel";
import ProductModel, {
  ProductInterface,
} from "../database/models/ProductModel";
import UserModel, { UserInterface } from "../database/models/UserModel";
import ErrorHandler from "../Error";

// - Fetch orders and each order can contain multiple item
export const fetchOrders = async (userId: UserInterface["_id"]) => {
  const orders = await OrderModel.find({ userId });
  if (!orders) throw ErrorHandler.BadRequest("No order found.");
  return { orders, message: "Product fetched successfully." };
};

// - Fetch single order by order id
export const fetchOrder = async (orderId: OrderInterface["_id"] | string) => {
  const order = await OrderModel.findOne({ _id: orderId });
  if (!order) throw ErrorHandler.BadRequest("No order found.");
  return { order, message: "Product fetched successfully." };
};

// Buying single product not form the cart
export const buySingleItem = async (
  userId: UserInterface["_id"],
  {
    itemId,
    quantity,
  }: {
    itemId: ProductInterface["_id"];
    quantity: number;
  }
) => {
  const product = await ProductModel.findOne({ _id: itemId });
  const user = await UserModel.findOne({ _id: userId });
  if (!user || !product) throw ErrorHandler.BadRequest("Not found");

  const shippingAddress = user.addresses.find(
    (address) => address.isShippingAddress === true
  );
  console.log(product, "product");

  if (!shippingAddress)
    throw ErrorHandler.BadRequest("Please select shipping address.");

  // - Payment gateway will integrate in future
  // - After payment successfully done
  const order = await OrderModel.create({
    userId,
    paymentStatus: true,
    status: "PENDING",
    bill: product.pricing.basePrice,
    items: [product],
    shippingAddress,
  });
  return { order, message: "Item order successfully" };
};

// Buying products form cart
export const buyItemFromCart = async (userId: UserInterface["_id"]) => {
  const cart = await CartModel.findOne({ userId });
  const user = await UserModel.findOne({ _id: userId });
  if (!user || !cart) throw ErrorHandler.BadRequest("Not found");

  const shippingAddress = user.addresses.find(
    (address) => address.isShippingAddress === true
  );
  // - Payment gateway will integrate in future
  // - After payment successfully done
  const order = await OrderModel.create({
    userId,
    paymentStatus: true,
    status: "PENDING",
    bill: cart.bill,
    items: cart.items,
    shippingAddress,
  });
  return { order, message: "Item order successfully" };
};
