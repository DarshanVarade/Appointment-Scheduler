import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    businessType: {
      type: String,
      required: true,
      enum: ["salon", "clinic", "studio", "other"], 
    },
    address: {
      type: String,
    },
    workingHours: [
      {
        day: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        startTime: { type: String }, 
        endTime: { type: String }, 
        isClosed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const Business = mongoose.model("Business", businessSchema);
