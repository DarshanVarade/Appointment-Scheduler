import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Business } from "../models/business.models.js";

const createBusiness = asyncHandler(async (req, res) => {
  const { name, businessType, address, workingHours } = req.body;
  const owner = req.user._id;

  const business = await Business.create({
    owner,
    name,
    businessType,
    address,
    workingHours,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, business, "Business created successfully"));
});

const getBusinessById = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const business = await Business.findById(businessId);

  if (!business) {
    throw new ApiError(404, "Business not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, business, "Business fetched successfully"));
});

const updateBusiness = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const { name, businessType, address, workingHours } = req.body;
  const business = await Business.findByIdAndUpdate(
    businessId,
    {
      $set: {
        name,
        businessType,
        address,
        workingHours,
      },
    },
    {
      new: true,
    }
  );

  if (!business) {
    throw new ApiError(404, "Business not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, business, "Business updated successfully"));
});

const deleteBusiness = asyncHandler(async (req, res) => {
  const { businessId } = req.params;
  const business = await Business.findByIdAndDelete(businessId);

  if (!business) {
    throw new ApiError(404, "Business not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Business deleted successfully"));
});

export { createBusiness, getBusinessById, updateBusiness, deleteBusiness };
