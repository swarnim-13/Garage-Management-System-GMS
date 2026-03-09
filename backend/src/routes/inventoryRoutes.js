import express from "express";
import {
  getInventory,
  addInventory,
  updateInventory,
  reserveStock,
  deductStock
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", addInventory);
router.put("/:id", updateInventory);
router.post("/reserve/:id", reserveStock);
router.post("/deduct/:id", deductStock);

export default router;