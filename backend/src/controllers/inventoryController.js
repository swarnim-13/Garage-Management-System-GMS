// controllers/inventoryController.js
import Inventory from "../models/Inventory.js";

/* GET ALL */
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ADD */
export const addInventory = async (req, res) => {
  try {
    const item = await Inventory.create({
      name: req.body.name,
      qty: Number(req.body.qty),
      price: Number(req.body.price),
      reserved: 0
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE */
export const updateInventory = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* RESERVE */
export const reserveStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.qty - item.reserved < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    item.reserved += Number(quantity);
    await item.save();

    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DEDUCT */
export const deductStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.qty < quantity || item.reserved < quantity) {
      return res.status(400).json({ message: "Invalid deduction" });
    }

    item.qty -= Number(quantity);
    item.reserved -= Number(quantity);

    await item.save();

    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};