import ProductModel from "../database/models/ProductModel";
import RatingModel, { RatingInterface } from "../database/models/RatingModel";
import ErrorHandler from "../Error";

export const doRating = async (data: RatingInterface) => {
  const product = await ProductModel.findById(data.productId);
  if (!product)
    throw ErrorHandler.BadRequest("Product not exist now you can't rate it.");

  const { userId, productId } = data;
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
