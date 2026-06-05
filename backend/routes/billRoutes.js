const express = require("express");
const Bill = require("../models/Bill");

const router = express.Router();

// Save Bill
router.post("/", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);

    res.status(201).json({
      success: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bills.length,
      bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Bill deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;