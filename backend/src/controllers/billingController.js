import Billing from "../models/Billing.js";
import JobCard from "../models/JobCard.js";

/* ================= GENERATE INVOICE ================= */

export const generateInvoice = async (req, res) => {
  try {

    const job = await JobCard.findById(req.params.jobId)
      .populate("spareParts.part");

    if (!job)
      return res.status(404).json({
        message: "Job not found"
      });

    if (job.status !== "Closed")
      return res.status(400).json({
        message: "Job must be closed first"
      });

    /* ================= DELETE OLD INVOICE IF EXISTS ================= */

    await Billing.deleteMany({
      jobCard: job._id
    });

    /* ================= FORMAT PARTS ================= */

    const formattedParts = job.spareParts.map((item) => ({
      partName: item.part?.name || "Part",
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    /* ================= CREATE NEW INVOICE ================= */

    const invoice = await Billing.create({
      jobCard: job._id,
      invoiceNumber: `INV-${Date.now()}`,
      customerName: job.customerName,
      vehicleNumber: job.vehicleNumber,
      spareParts: formattedParts,
      laborCharge: job.laborCharge,
      totalAmount: job.totalAmount
    });

    res.status(201).json(invoice);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/* ================= GET ALL INVOICES ================= */

export const getAllInvoices = async (req, res) => {
  try {

    const bills = await Billing.find()
      .sort({ createdAt: -1 });

    res.json(bills);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


/* ================= MARK AS PAID ================= */

export const markPaid = async (req, res) => {
  try {

    const bill = await Billing.findById(req.params.billId);

    if (!bill)
      return res.status(404).json({
        message: "Invoice not found"
      });

    bill.paymentStatus = "Paid";

    await bill.save();

    res.json(bill);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};