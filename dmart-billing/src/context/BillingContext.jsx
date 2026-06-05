// src/context/BillingContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Fixed prices: Item 1 = ₹10, Item 2 = ₹20 ... Item 10 = ₹100
export const ITEM_PRICES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// Default empty items array
const defaultItems = Array.from({ length: 10 }, (_, i) => ({
  name: `Item ${i + 1}`,
  price: ITEM_PRICES[i],
  quantity: 0,
}));

// localStorage se data load karo — agar hai toh
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("dmart_billing");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Context banao
const BillingContext = createContext();

export function BillingProvider({ children }) {
  const saved = loadFromStorage();

  const [customer, setCustomer] = useState(
    saved?.customer || { name: "", gender: "" }
  );
  const [items, setItems] = useState(saved?.items || defaultItems);
  const [carryBag, setCarryBag] = useState(saved?.carryBag ?? null);
  const [step, setStep] = useState(saved?.step || 1);

  // Har state change pe localStorage mein save karo
  useEffect(() => {
    localStorage.setItem(
      "dmart_billing",
      JSON.stringify({ customer, items, carryBag, step })
    );
  }, [customer, items, carryBag, step]);

  // Item quantity update karne ka function
  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // DISCOUNT LOGIC
  const calculateBill = () => {
    let subtotal = 0;
    const itemLines = items.map((item, i) => {
      let lineTotal = item.price * item.quantity;
      let discount = 0;

      // Item 1 (index 0): qty > 4 → 5% off
      if (i === 0 && item.quantity > 4) discount = 0.05;
      // Item 5 (index 4): always 10% off
      if (i === 4) discount = 0.1;
      // Item 10 (index 9): always 15% off
      if (i === 9) discount = 0.15;

      const discountAmt = lineTotal * discount;
      lineTotal -= discountAmt;
      subtotal += lineTotal;

      return { ...item, lineTotal, discountAmt, discountPct: discount * 100 };
    });

    // Bill-level discount
    let billDiscount = 0;
    let billDiscountLabel = "";
    if (subtotal > 10000) {
      billDiscount = subtotal * 0.15;
      billDiscountLabel = "15% (Bill > ₹10,000)";
    } else if (subtotal >= 5000) {
      billDiscount = subtotal * 0.1;
      billDiscountLabel = "10% (Bill ₹5,000–₹10,000)";
    }

    const afterBillDiscount = subtotal - billDiscount;
    const gst = afterBillDiscount * 0.1;
    const bagCharge = carryBag ? 10 : 0;
    const total = afterBillDiscount + gst + bagCharge;

    // Gift based on gender
    const gift =
      customer.gender === "Female"
        ? "🍫 Cadbury Chocolate"
        : customer.gender === "Male"
        ? "👜 Leather Wallet"
        : "🎁 Surprise Gift";

    return {
      itemLines,
      subtotal,
      billDiscount,
      billDiscountLabel,
      afterBillDiscount,
      gst,
      bagCharge,
      total,
      gift,
    };
  };

  // Reset everything
  const reset = () => {
    setCustomer({ name: "", gender: "" });
    setItems(defaultItems);
    setCarryBag(null);
    setStep(1);
    localStorage.removeItem("dmart_billing");
  };

  return (
    <BillingContext.Provider
      value={{
        customer, setCustomer,
        items, updateItem,
        carryBag, setCarryBag,
        step, setStep,
        calculateBill, reset,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

// Custom hook — easy access ke liye
export const useBilling = () => useContext(BillingContext);