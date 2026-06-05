import { useBilling } from "../context/BillingContext";

import CustomerForm from "./CustomerForm";
import ItemEntry from "./ItemEntry";
import BagAndGift from "./BagAndGift";
import Receipt from "./Receipt";

export default function BillingFlow() {
  const { step } = useBilling();

  const steps = ["Customer", "Items", "Extras", "Receipt"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-sm
                ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>

              <p
                className={`text-xs mt-1 ${
                  step === i + 1
                    ? "text-blue-700 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>

      {step === 1 && <CustomerForm />}
      {step === 2 && <ItemEntry />}
      {step === 3 && <BagAndGift />}
      {step === 4 && <Receipt />}
    </div>
  );
}