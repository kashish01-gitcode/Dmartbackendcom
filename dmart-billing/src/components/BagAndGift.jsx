// src/components/BagAndGift.jsx
import { useBilling } from "../context/BillingContext";
import { Button } from "flowbite-react";

export default function BagAndGift() {
  const { carryBag, setCarryBag, setStep, customer } = useBilling();

  const gift =
    customer.gender === "Female"
      ? "🍫 Cadbury Chocolate"
      : customer.gender === "Male"
      ? "👜 Leather Wallet"
      : "🎁 Surprise Gift";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        🛍️ Extra Options
      </h2>

      {/* Carry Bag */}
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-3">
          Do you need a carry bag? <span className="text-gray-400">(+₹10)</span>
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setCarryBag(true)}
            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
              carryBag === true
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 text-gray-500"
            }`}
          >
            ✅ Yes (+₹10)
          </button>
          <button
            onClick={() => setCarryBag(false)}
            className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
              carryBag === false
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-gray-200 text-gray-500"
            }`}
          >
            ❌ No
          </button>
        </div>
      </div>

      {/* Gift Preview */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-yellow-700 font-medium">🎁 Your Free Gift</p>
        <p className="text-xl font-bold text-yellow-800 mt-1">{gift}</p>
        <p className="text-xs text-yellow-600 mt-1">
          Based on gender: {customer.gender}
        </p>
      </div>

      <div className="flex gap-3">
        <Button color="gray" onClick={() => setStep(2)} className="flex-1">
          ← Back
        </Button>
        <Button
          onClick={() => setStep(4)}
          disabled={carryBag === null}
          className="flex-1 bg-green-600"
        >
          Generate Bill →
        </Button>
      </div>
    </div>
  );
}