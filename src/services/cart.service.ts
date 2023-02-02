import { Types } from "mongoose";
import constants from "../constants";
import { CartModel, ProductModel } from "../database/models";
import { ExtendedCartItemInterface } from "../database/models/CartModel";
import { ProductInterface } from "../database/models/ProductModel";
import { UserInterface } from "../database/models/UserModel";
import BaseError from "../errors/base-error";

export const fetchCart = async (userId: UserInterface["_id"]) => {
  const cart = await CartModel.findOne({ userId }).populate("items.itemId");
  return { cart, message: "Cart fetched successfully." };
};

interface CartItemPopulateInterface {
  items: ExtendedCartItemInterface[];
}

export const addItemIntoCart = async (
  userId: UserInterface["_id"],
  itemId: ProductInterface["_id"],
  quantity: number
) => {
  const product = await ProductModel.findOne({ _id: itemId });
  if (!product) throw BaseError.notFound("Product not found");

  const cart = await CartModel.findOne({ userId });
  // - IF CART NOT EXIST
  if (!cart) {
    const newCart = await CartModel.create({
      userId,
      items: [
        { itemId: product._id, quantity, basePrice: product.pricing.basePrice },
      ],
      bill: quantity * product.pricing.basePrice, // = product.pricing.basePrice
    });

    return {
      itemId: newCart.items[0].itemId._id,
      message: "Cart item updated successfully.",
    };
  }

  // - IF CART EXIST
  const itemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() === itemId.toString()
  );
  // - IF CART ITEM EXIST ALREADY
  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    item.quantity = quantity;

    cart.bill = cart.items.reduce(
      (acc, curr) => acc + curr.quantity * curr.basePrice,
      0
    );

    cart.items[itemIndex] = item;
    await cart.save();

    return {
      itemId: cart.items[itemIndex].itemId._id,
      message: "Successfully Item or Product Added ldfjsl",
    };
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

  await cart.save();
  return {
    itemId: cart.items[itemIndex].itemId._id,
    message: "Successfully Item or Product Added",
  };
};

export const removeCartItem = async (
  userId: UserInterface["_id"],
  itemId: ProductInterface["_id"]
) => {
  const cart = await CartModel.findOne({ userId });
  if (!cart) throw BaseError.notFound("Cart is not found or No item in cart");

  const itemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() === itemId.toString()
  );
  //   if item or product is present
  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    cart.bill -= item.quantity * item.basePrice;
    if (cart.bill < 0) cart.bill = 0;
    cart.items.splice(itemIndex, 1);
    const updatedCart = await cart.save();
    return { cart: updatedCart, message: "Cart removed successfully" };
  }
  throw BaseError.notFound("Item or Product is not present");
};

export const fetchItemById = async ({
  itemId, // here item id is not product id it is _id in items object
  userId,
}: {
  itemId: string;
  userId: string;
}) => {
  const cart = await CartModel.findOne({ userId }).populate<{
    items: ExtendedCartItemInterface[];
  }>("items.itemId");
  if (!cart) throw BaseError.notFound("Cart is not found.");

  const item = cart.items.find((item) => item.itemId._id.toString() === itemId);
  if (!item) throw BaseError.badRequest("Item of this id is not in cart.");

  const totalDiscount = item.basePrice * (item.itemId.pricing.discount / 100);
  const totalAmount = item.basePrice * item.quantity;
  const bill = {
    totalAmount,
    noOfItems: 1,
    totalDiscount,
    deliveryCharges: totalAmount > 1000 ? "40" : "Free ",
    payableAmount: totalAmount - totalDiscount,
  };
  return { item, bill };
};

export const getBilling = async (userId: UserInterface["_id"]) => {
  const cart = await CartModel.findOne({ userId }).populate<{
    items: ExtendedCartItemInterface[];
  }>("items.itemId");
  if (!cart) throw BaseError.notFound("Cart not found");

  const totalAmount = cart?.bill;
  const totalDiscount = cart?.items.reduce((prev: number, curr) => {
    const { discount, basePrice } = curr.itemId.pricing;
    return basePrice * (discount / 100);
  }, 0);

  const deliveryCharges =
    cart?.bill > constants.minForFreeDelivery
      ? constants.deliveryCharges
      : constants.deliveryFree;

  return {
    bill: {
      totalAmount,
      noOfItems: cart?.items.length,
      totalDiscount,
      deliveryCharges,
      payableAmount: totalAmount - totalDiscount,
    },
    message: "Cart fetched successfully.",
  };
};
