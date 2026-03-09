import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    qty: { type: Number, required: true },
    reserved: { type: Number, default: 0 },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);