// src/components/CustomerForm.jsx
import { useBilling } from "../context/BillingContext";
import { Button, Label, TextInput, Select } from "flowbite-react";

export default function CustomerForm() {
  const { customer, setCustomer, setStep } = useBilling();

  const handleNext = () => {
    if (!customer.name.trim() || !customer.gender) {
      alert("Please fill in name and gender!");
      return;
    }
    setStep(2);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        🛒 D-Mart Billing System
      </h2>

      <div className="mb-4">
        <Label htmlFor="name" value="Customer Name" />
        <TextInput
          id="name"
          placeholder="Enter name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="mt-1"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="gender" value="Gender" />
        <Select
          id="gender"
          value={customer.gender}
          onChange={(e) => setCustomer({ ...customer, gender: e.target.value })}
          className="mt-1"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
      </div>

      <Button onClick={handleNext} className="w-full bg-blue-600">
        Next: Enter Items →
      </Button>
    </div>
  );
}