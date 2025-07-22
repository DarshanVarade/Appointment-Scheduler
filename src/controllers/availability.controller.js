import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Business } from "../models/business.models.js";
import { Appointment } from "../models/appointment.models.js";
import { Service } from "../models/service.models.js";

const getAvailability = asyncHandler(async (req, res) => {
  const { businessId, date, serviceId } = req.query;

  if (!businessId || !date || !serviceId) {
    throw new ApiError(400, "Business ID, date, and service ID are required");
  }

  const business = await Business.findById(businessId);
  if (!business) {
    throw new ApiError(404, "Business not found");
  }

  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  const dayOfWeek = new Date(date).toLocaleString("en-US", {
    weekday: "long",
  });
  const workingHours = business.workingHours.find((wh) => wh.day === dayOfWeek);

  if (!workingHours || workingHours.isClosed) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "The business is closed on this day"));
  }

  const appointments = await Appointment.find({
    business: businessId,
    startTime: {
      $gte: new Date(date),
      $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
    },
  });

  const serviceDuration = service.duration; // in minutes
  const availableSlots = [];
  const now = new Date();

  let currentTime = new Date(`${date}T${workingHours.startTime}`);
  const endTime = new Date(`${date}T${workingHours.endTime}`);

  while (currentTime < endTime) {
    const slotEndTime = new Date(
      currentTime.getTime() + serviceDuration * 60 * 1000
    );

    if (slotEndTime > endTime) {
      break;
    }

    const isBooked = appointments.some(
      (appointment) =>
        (currentTime >= appointment.startTime &&
          currentTime < appointment.endTime) ||
        (slotEndTime > appointment.startTime &&
          slotEndTime <= appointment.endTime)
    );

    if (!isBooked && currentTime > now) {
      availableSlots.push(new Date(currentTime));
    }

    currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // check every 30 minutes
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        availableSlots,
        "Available slots fetched successfully"
      )
    );
});

export { getAvailability };
