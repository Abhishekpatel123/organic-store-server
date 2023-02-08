import { Response, Request } from 'express';
import * as services from '../services/address.service';
import { httpStatusCodes } from '../constants/response.constant';

export const addAddress = async (req: Request, res: Response) => {
  const address = { ...req.body };
  req.user.addresses.push(address);
  await req.user.save();
  const response = { message: 'Success' };
  res.status(httpStatusCodes.CREATED).send(response);
};

export const getAddresses = async (req: Request, res: Response) => {
  const response = {
    message: 'Successfully fetched addresses',
    addresses: req.user.addresses,
    shippingAddressId: req.user.shippingAddressId
  };
  res.status(httpStatusCodes.OK).send(response);
};

export const updateAddress = async (req: Request, res: Response) => {
  const { _id, ...data } = req.body;
  const response = await services.updateAddress({
    userId: req.user._id.toString(),
    addressId: _id,
    addressData: data
  });
  res.status(httpStatusCodes.OK).send(response);
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const response = await services.deleteAddress({
    userId: req.user._id.toString(),
    addressId: _id,
    currentShippingAddressId: req.user.shippingAddressId
  });
  res.status(httpStatusCodes.OK).send(response);
};

// make this address to shipping address
export const makeShippingAddress = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const addressId = req.params.addressId;
  const response = await services.makeShippingAddress({ userId, addressId });
  return res.status(httpStatusCodes.OK).send(response);
};
