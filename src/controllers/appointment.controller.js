import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Appointment } from "../models/appointment.models.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { business, service, startTime, endTime, notes } = req.body;
  const client = req.user._id;

  const appointment = await Appointment.create({
    client,
    business,
    service,
    startTime,
    endTime,
    notes,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, appointment, "Appointment created successfully")
    );
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment fetched successfully")
    );
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { startTime, endTime, status } = req.body;
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    {
      $set: {
        startTime,
        endTime,
        status,
      },
    },
    {
      new: true,
    }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment updated successfully")
    );
});

const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    throw new ApiError(
      400,
      "Start time and end time are required for rescheduling"
    );
  }

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    {
      $set: {
        startTime,
        endTime,
        status: "scheduled",
      },
    },
    {
      new: true,
    }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment rescheduled successfully")
    );
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    {
      $set: {
        status: "cancelled",
      },
    },
    {
      new: true,
    }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointment, "Appointment cancelled successfully")
    );
});

export {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  rescheduleAppointment,
  cancelAppointment,
};
