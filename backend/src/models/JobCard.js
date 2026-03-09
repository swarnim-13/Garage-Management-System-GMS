import mongoose from "mongoose";

const sparePartSchema = new mongoose.Schema({
  part: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  quantity: Number,
  price: Number
});

const jobCardSchema = new mongoose.Schema(
  {
    jobCardNumber: String,
    customerName: String,
    phone: String,
    vehicleType: String,
    vehicleNumber: String,
    problem: String,
    mechanic: String,
    laborCharge: Number,
    spareParts: [sparePartSchema],
   status: {
  type: String,
  enum: ["Open", "Closed"],
  default: "Open"
},
    totalAmount: Number
  },
  { timestamps: true }
);

export default mongoose.model("JobCard", jobCardSchema);