import express from "express";
import {
  generateInvoice,
  getAllInvoices,
  markPaid,
} from "../controllers/billingcontroller.js";

const router = express.Router();

router.get("/", getAllInvoices);
router.post("/:jobId", generateInvoice);
router.put("/pay/:billId", markPaid);

export default router; 
