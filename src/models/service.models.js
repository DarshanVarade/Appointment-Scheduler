import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
