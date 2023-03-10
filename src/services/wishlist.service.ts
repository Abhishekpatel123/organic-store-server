import { Types } from 'mongoose';
import { WishlistModel, ProductModel } from '../database/models';
import { ProductInterface } from '../database/models/ProductModel';
import { UserInterface } from '../database/models/UserModel';
import BaseError from '../errors/base-error';
// string | Schema.Types.ObjectId

export const addItemIntoWishlist = async (
  userId: UserInterface['_id'],
  itemId: ProductInterface['_id']
) => {
  const wishlist = await WishlistModel.findOne({ userId });
  const product = await ProductModel.findOne({ _id: itemId });
  // - If product is not exist or deleted
  if (!product) throw BaseError.notFound('Product not found');

  // - If wishlist not exist then create one
  if (!wishlist) {
    const newWishlist = await WishlistModel.create({
      userId,
      items: [{ itemId: product._id }]
    });
    return {
      wishlist: newWishlist,
      message: 'Wishlist item updated successfully.'
    };
  }

  // - If wishlist already exist
  const itemIndex = wishlist.items.findIndex(
    (item) => item.itemId.toString() === itemId.toString()
  );
  // - If product or item already exist
  if (itemIndex > -1) {
    return { wishlist, message: 'Item is already in wishlist' };
  }
  // - If item already not exist
  wishlist.items.push({ itemId: product._id });

  const updatedWishlist = await wishlist.save();
  return {
    wishlist: updatedWishlist,
    message: 'Successfully Item or Product Added'
  };
};

export const fetchWishlist = async (userId: UserInterface['_id']) => {
  const wishlist = await WishlistModel.findOne({ userId }).populate(
    'items.itemId'
  );
  return { wishlist, message: 'Cart fetched successfully.' };
};

export const deleteWishlistItem = async (
  userId: UserInterface['_id'],
  itemId: string
) => {
  const wishlist = await WishlistModel.findOne({ userId });
  if (!wishlist)
    throw BaseError.notFound('Cart is not found or No item in wishlist');
  const itemIndex = wishlist.items.findIndex(
    (item) => item.itemId.toString() === itemId.toString()
  );
  //   if item or product is present
  if (itemIndex > -1) {
    wishlist.items.splice(itemIndex, 1);
    const updatedCart = await wishlist.save();
    return { wishlist: updatedCart, message: 'Product removed successfully' };
  }
  throw BaseError.notFound('Item or Product is not present');
};
