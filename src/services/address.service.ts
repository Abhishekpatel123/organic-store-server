import { UserModel } from "../database/models";
import { AddressInterface } from "../database/models/UserModel";
import BaseError from "../errors/base-error";

interface MakeShippingAddressInterface {
  addressId: string;
  userId: string;
}

interface DeleteAddressInterface extends MakeShippingAddressInterface {
  currentShippingAddressId: string;
}

interface UpdateAddressInterface extends MakeShippingAddressInterface {
  addressData: Omit<AddressInterface, "_id">;
}

export const deleteAddress = async ({
  userId,
  addressId,
  currentShippingAddressId,
}: DeleteAddressInterface) => {
  await UserModel.updateOne(
    { _id: userId },
    {
      $pull: { addresses: { _id: addressId } },
      $set: {
        shippingAddressId:
          currentShippingAddressId === addressId
            ? ""
            : currentShippingAddressId,
      },
    }
  );
  return { message: "Successfully Removed Address" };
};

export const updateAddress = async ({
  userId,
  addressId,
  addressData,
}: UpdateAddressInterface) => {
  await UserModel.updateOne(
    { _id: userId, "addresses._id": addressId },
    { $set: { "addresses.$": addressData } },
    { new: true }
  );
  return { message: "Successfully Updated Address" };
};

export const makeShippingAddress = async ({
  addressId,
  userId,
}: MakeShippingAddressInterface) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: userId, "addresses._id": addressId },
    { shippingAddressId: addressId }
    // { $set: { shippingAddressId: addressId } }
  );
  if (!user) throw BaseError.notFound("Address not found!");
  return {
    message: "Successfully make this address to shipping address.",
  };
};
