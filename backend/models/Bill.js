const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      gender: String,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        lineTotal: Number,
        discountPct: Number,
      },
    ],

    subtotal: Number,
    billDiscount: Number,
    billDiscountLabel: String,

    gst: Number,
    bagCharge: Number,

    total: Number,
    gift: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", BillSchema);