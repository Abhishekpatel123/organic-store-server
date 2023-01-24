import { OrderModel } from "../database/models";
import ProductModel from "../database/models/ProductModel";
import RatingModel, { RatingInterface } from "../database/models/RatingModel";
import ErrorHandler from "../Error";

export const doRating = async (data: RatingInterface) => {
  const { userId, productId } = data;

  // - product exist then only u can do rating
  const product = await ProductModel.findById(data.productId);
  if (!product)
    throw ErrorHandler.BadRequest("Product not exist now you can't rate it.");

  // - you can only do rating if you have bought the product
  const isOrdered = await OrderModel.findOne({
    userId,
    "items._id": productId,
  });

  if (!isOrdered)
    throw ErrorHandler.BadRequest(
      "You can't do rating because if you have not bought the product."
    );

  // only one rating for one user if he or she ordered product
  const alreadyRated = await RatingModel.findOne({ userId, productId });
  if (alreadyRated) throw ErrorHandler.BadRequest("You rated already.");

  const rating = await RatingModel.create(data);

  product.ratingCount += 1;
  product.ratingValue += data.ratingValue;
  product.avgRating = product.ratingValue / product.ratingCount;
  await product.save();
  return { rating, product, message: "Successfully rated." };
};

export const fetchRatingAndReview = async (data: { productId: string }) => {
  const { productId } = data;
  const product = await ProductModel.findById(productId);
  if (!product)
    throw ErrorHandler.BadRequest("Product not exist now you can't rate it.");

  const ratings = await RatingModel.find({ productId });

  return { ratings, message: "Successfully fetched rating of this product." };
};
