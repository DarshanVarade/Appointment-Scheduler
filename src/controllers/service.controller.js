import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Service } from "../models/service.models.js";

const createService = asyncHandler(async (req, res) => {
  const { name, description, duration, price, business } = req.body;

  const service = await Service.create({
    name,
    description,
    duration,
    price,
    business,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully"));
});

const getServiceById = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findById(serviceId);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service fetched successfully"));
});

const updateService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, duration, price } = req.body;
  const service = await Service.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        name,
        description,
        duration,
        price,
      },
    },
    {
      new: true,
    }
  );

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, service, "Service updated successfully"));
});

const deleteService = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findByIdAndDelete(serviceId);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Service deleted successfully"));
});

export { createService, getServiceById, updateService, deleteService };
