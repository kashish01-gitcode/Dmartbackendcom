const express = require("express");
const Bill = require("../models/Bill");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const bills = await Bill.find();

    const totalBills = bills.length;

    const totalRevenue = bills.reduce(
      (sum, bill) => sum + bill.total,
      0
    );

    const today = new Date();

    const todayRevenue = bills
      .filter((bill) => {
        const billDate = new Date(bill.createdAt);

        return (
          billDate.getDate() === today.getDate() &&
          billDate.getMonth() === today.getMonth() &&
          billDate.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, bill) => sum + bill.total, 0);

    res.json({
      success: true,
      totalBills,
      totalRevenue,
      todayRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;