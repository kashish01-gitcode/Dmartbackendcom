// src/components/Receipt.jsx
import axios from "axios";
import { useBilling } from "../context/BillingContext";
import { Button } from "flowbite-react";

export default function Receipt() {
  const { customer, calculateBill, reset, setStep } = useBilling();
  const bill = calculateBill();

  const saveBill = async () => {
    try {
      await axios.post("https://dmartbackendcom30.onrender.com", {
        customer: {
          name: customer.name,
          gender: customer.gender,
        },

        items: bill.itemLines,

        subtotal: bill.subtotal,
        billDiscount: bill.billDiscount,
        billDiscountLabel: bill.billDiscountLabel,

        gst: bill.gst,
        bagCharge: bill.bagCharge,

        total: bill.total,
        gift: bill.gift,
      });

    alert("Bill Saved Successfully");
  } catch (error) {
    console.log(error);
    alert("Failed to Save Bill");
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg font-mono text-sm">
      {/* Header */}
      <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-blue-800">🛒 D-MART</h1>
        <p className="text-gray-500 text-xs">Your Savings Destination</p>
        <p className="mt-2 font-semibold">
          Customer: {customer.name} ({customer.gender})
        </p>
        <p className="text-xs text-gray-400">{new Date().toLocaleString()}</p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase">
          <span className="w-32">Item</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Disc</span>
          <span>Total</span>
        </div>
        {bill.itemLines
          .filter((item) => item.quantity > 0)
          .map((item, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-dotted border-gray-100">
              <span className="w-32 truncate">{item.name}</span>
              <span>{item.quantity}</span>
              <span>₹{item.price}</span>
              <span className="text-orange-500">
                {item.discountPct > 0 ? `-${item.discountPct}%` : "-"}
              </span>
              <span className="font-semibold">₹{item.lineTotal.toFixed(2)}</span>
            </div>
          ))}
      </div>

      {/* Totals */}
      <div className="space-y-1 border-t border-dashed border-gray-300 pt-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{bill.subtotal.toFixed(2)}</span>
        </div>

        {bill.billDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Bill Discount ({bill.billDiscountLabel})</span>
            <span>-₹{bill.billDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-blue-600">
          <span>GST (10%)</span>
          <span>+₹{bill.gst.toFixed(2)}</span>
        </div>

        {bill.bagCharge > 0 && (
          <div className="flex justify-between">
            <span>Carry Bag</span>
            <span>+₹{bill.bagCharge}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg border-t-2 border-gray-400 pt-2 mt-2">
          <span>TOTAL</span>
          <span>₹{bill.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Gift */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
        <p className="text-yellow-700 font-semibold">
          🎁 Free Gift: {bill.gift}
        </p>
      </div>

      <div className="text-center text-xs text-gray-400 mt-4 border-t pt-3">
        Thank you for shopping at D-Mart! 🙏
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <Button color="gray" onClick={() => setStep(3)} className="flex-1">
          ← Edit
        </Button>
        <Button color="failure" onClick={reset} className="flex-1">
          🔄 New Bill
        </Button>
        <Button
  onClick={async () => {
    await saveBill();
    window.print();
  }}
  className="flex-1 bg-blue-600"
>
  🖨️ Save & Print
</Button>
      </div>
    </div>
  );
}