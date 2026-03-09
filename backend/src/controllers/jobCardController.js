import JobCard from "../models/JobCard.js";
import Inventory from "../models/Inventory.js";

/* ================= CREATE JOB CARD ================= */
export const createJobCard = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      vehicleType,
      vehicleNumber,
      problem,
      mechanic,
      laborCharge,
      spareParts,
    } = req.body;

    if (!customerName || !vehicleNumber) {
      return res.status(400).json({
        message: "Customer name and vehicle number are required",
      });
    }

    if (!spareParts || spareParts.length === 0) {
      return res.status(400).json({
        message: "At least one spare part is required",
      });
    }

    let totalPartsCost = 0;

    for (const partItem of spareParts) {
      const inventoryItem = await Inventory.findById(partItem.part);

      if (!inventoryItem) {
        return res.status(404).json({
          message: "Inventory item not found",
        });
      }

      const available =
        inventoryItem.qty - inventoryItem.reserved;

      if (available < partItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${inventoryItem.name}`,
        });
      }

      inventoryItem.reserved += partItem.quantity;
      await inventoryItem.save();

      totalPartsCost += partItem.price * partItem.quantity;
    }

    const job = await JobCard.create({
      jobCardNumber: `JC-${Date.now()}`,
      customerName,
      phone,
      vehicleType,
      vehicleNumber,
      problem,
      mechanic,
      laborCharge: Number(laborCharge),
      spareParts,
      totalAmount:
        totalPartsCost + Number(laborCharge),
      status: "Open",
    });

    res.status(201).json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= CLOSE JOB CARD ================= */
export const closeJobCard = async (req, res) => {
  try {
    const job = await JobCard.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.status === "Closed") {
      return res.json(job);
    }

    for (const partItem of job.spareParts) {
      const inventoryItem =
        await Inventory.findById(partItem.part);

      if (!inventoryItem) continue;

      inventoryItem.qty -= partItem.quantity;
      inventoryItem.reserved -= partItem.quantity;

      if (inventoryItem.qty < 0)
        inventoryItem.qty = 0;
      if (inventoryItem.reserved < 0)
        inventoryItem.reserved = 0;

      await inventoryItem.save();
    }

    job.status = "Closed";
    await job.save();

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= REOPEN JOB CARD ================= */
export const reopenJobCard = async (req, res) => {
  try {
    const job = await JobCard.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.status === "Open") {
      return res.json(job);
    }

    for (const partItem of job.spareParts) {
      const inventoryItem =
        await Inventory.findById(partItem.part);

      if (!inventoryItem) continue;

      inventoryItem.qty += partItem.quantity;
      await inventoryItem.save();
    }

    job.status = "Open";
    await job.save();

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE JOB CARD ================= */
export const updateJobCard = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      vehicleType,
      vehicleNumber,
      problem,
      mechanic,
      laborCharge,
      spareParts,
    } = req.body;

    const job = await JobCard.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    /* ================= REMOVE OLD RESERVED ================= */

    for (const oldPart of job.spareParts) {
      const inventoryItem = await Inventory.findById(oldPart.part);

      if (!inventoryItem) continue;

      inventoryItem.reserved -= oldPart.quantity;

      if (inventoryItem.reserved < 0)
        inventoryItem.reserved = 0;

      await inventoryItem.save();
    }

    /* ================= ADD NEW RESERVED ================= */

    let totalPartsCost = 0;

    for (const partItem of spareParts) {

      const inventoryItem = await Inventory.findById(partItem.part);

      if (!inventoryItem) {
        return res.status(404).json({
          message: "Inventory item not found",
        });
      }

      const available =
        inventoryItem.qty - inventoryItem.reserved;

      if (available < partItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${inventoryItem.name}`,
        });
      }

      inventoryItem.reserved += partItem.quantity;
      await inventoryItem.save();

      totalPartsCost += partItem.price * partItem.quantity;
    }

    /* ================= UPDATE JOB ================= */

    job.customerName = customerName;
    job.phone = phone;
    job.vehicleType = vehicleType;
    job.vehicleNumber = vehicleNumber;
    job.problem = problem;
    job.mechanic = mechanic;
    job.laborCharge = Number(laborCharge);
    job.spareParts = spareParts;
    job.totalAmount =
      totalPartsCost + Number(laborCharge);

    job.status = "Open";

    await job.save();

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ALL JOBS ================= */
export const getAllJobCards = async (req, res) => {
  try {
    const jobs = await JobCard.find()
      .populate("spareParts.part")
      .sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};