import { Types } from "mongoose";
import { CartModel, ProductModel } from "../database/models";
import { ProductInterface } from "../database/models/ProductModel";
import { UserInterface } from "../database/models/UserModel";
import ErrorHandler from "../Error";

export const addItemIntoCart = async (
  userId: UserInterface["_id"],
  itemId: ProductInterface["_id"],
  quantity: number
) => {
  const cart = await CartModel.findOne({ userId });
  const product = await ProductModel.findOne({ _id: itemId });
  // - If product is not exist or deleted
  if (!product) throw ErrorHandler.BadRequest("Product not found");

  // - If cart not exist then create one
  if (!cart) {
    const newCart = await CartModel.create({
      userId,
      items: [
        { itemId: product._id, quantity, basePrice: product.pricing.basePrice },
      ],
      bill: quantity * product.pricing.basePrice, // = product.pricing.basePrice
    });
    return { cart: newCart, message: "Cart item updated successfully." };
  }

  // - If cart already exist
  const itemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() === itemId
  );
  // - If product or item already exist
  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    item.quantity += quantity;

    cart.bill = cart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.basePrice;
    }, 0);

    cart.items[itemIndex] = item;
    const savedCart = await cart.save();
    return { cart: savedCart, message: "Successfully Item or Product Added" };
  }
  // - If item already not exist
  cart.items.push({
    itemId: product._id,
    quantity,
    basePrice: product.pricing.basePrice,
  });

  cart.bill = cart.items.reduce((acc, curr) => {
    return acc + curr.quantity * curr.basePrice;
  }, 0);

  const savedCart = await cart.save();
  return { cart: savedCart, message: "Successfully Item or Product Added" };
};

export const fetchCart = async (userId: UserInterface["_id"]) => {
  const cart = await CartModel.findOne({ userId }).populate("items.itemId");
  return { cart, message: "Cart fetched successfully." };
};

export const removeCartItem = async (
  userId: UserInterface["_id"],
  itemId: ProductInterface["_id"]
) => {
  const cart = await CartModel.findOne({ userId });
  if (!cart)
    throw ErrorHandler.BadRequest("Cart is not found or No item in cart");
  const itemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() === itemId
  );
  //   if item or product is present
  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    cart.bill -= item.quantity * item.basePrice;
    if (cart.bill < 0) cart.bill = 0;
    cart.items.splice(itemIndex, 1);
    // cart.bill = cart.items.reduce((acc, curr) => {
    //   return acc + curr.quantity * curr.pricing.basePrice;
    // }, 0);
    const updatedCart = await cart.save();
    return { cart: updatedCart, message: "Cart removed successfully" };
  }
  throw ErrorHandler.BadRequest("Item or Product is not present");
};
