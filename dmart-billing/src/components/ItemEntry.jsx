// src/components/ItemEntry.jsx
import { useBilling, ITEM_PRICES } from "../context/BillingContext";
import { Button, Label, TextInput } from "flowbite-react";

export default function ItemEntry() {
  const { items, updateItem, setStep } = useBilling();

  const handleNext = () => setStep(3);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">📋 Enter Items</h2>
      <p className="text-sm text-gray-500 mb-6">
        Fixed prices: Item 1=₹10, Item 2=₹20 ... Item 10=₹100
      </p>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 border rounded-xl bg-gray-50"
          >
            {/* Item Name — editable */}
            <div className="flex-1">
              <Label value={`Item ${i + 1} Name`} />
              <TextInput
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                placeholder={`Item ${i + 1}`}
                sizing="sm"
              />
            </div>

            {/* Price — fixed, readonly */}
            <div className="w-20 text-center">
              <Label value="Price" />
              <div className="mt-1 font-bold text-green-700">
                ₹{ITEM_PRICES[i]}
              </div>
            </div>

            {/* Quantity */}
            <div className="w-24">
              <Label value="Qty" />
              <TextInput
                type="text"
                 inputMode="numeric"
              value={item.quantity === 0 ? "" : item.quantity}
                 onChange={(e) => {
               const value = e.target.value;

               if (/^\d*$/.test(value)) {
                    updateItem(
                           i,
                     "quantity",
               value === "" ? 0 : Number(value)
      );
    }
  }}
  sizing="sm"
              />
            </div>

            {/* Discount badge */}
            <div className="w-24 text-xs text-center text-orange-600 font-semibold">
              {i === 0 && "Qty>4: 5% off"}
              {i === 4 && "Always 10% off"}
              {i === 9 && "Always 15% off"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <Button color="gray" onClick={() => setStep(1)} className="flex-1">
          ← Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-blue-600">
          Next: Carry Bag →
        </Button>
      </div>
    </div>
  );
}