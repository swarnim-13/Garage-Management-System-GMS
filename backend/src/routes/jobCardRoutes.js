import express from "express";
import {
  createJobCard,
  closeJobCard,
  reopenJobCard,
  getAllJobCards,
  updateJobCard,
} from "../controllers/jobCardController.js";

const router = express.Router();

router.get("/", getAllJobCards);
router.post("/", createJobCard);
router.put("/close/:id", closeJobCard);
router.put("/reopen/:id", reopenJobCard);
router.put("/edit/:id", updateJobCard);

export default router;