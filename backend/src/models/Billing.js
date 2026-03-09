import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    jobCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobCard",
      required: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: String,
    vehicleNumber: String,
    spareParts: [
      {
        partName: String,
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],
    laborCharge: Number,
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Billing", billingSchema);