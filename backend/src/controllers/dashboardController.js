import JobCard from "../models/JobCard.js";
import Inventory from "../models/Inventory.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Active jobs (Open)
    const activeJobs = await JobCard.countDocuments({
      status: "Open",
    });

    // Closed but not reopened yet (optional logic)
    const closedJobs = await JobCard.countDocuments({
      status: "Closed",
    });

    // Low stock items (qty <= 5)
    const lowStockItems = await Inventory.find({
      qty: { $lte: 5 },
    });

    // Recent jobs (latest 5)
    const recentJobs = await JobCard.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      activeJobs,
      closedJobs,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      recentJobs,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};