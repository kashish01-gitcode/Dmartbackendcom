import { useEffect, useState } from "react";
import axios from "axios";

export default function BillsPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/bills"
      );

       console.log(res.data);
      setBills(res.data.bills);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/bills/${id}`
      );

      loadBills();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">
        🧾 All Bills
      </h1>

      <h2 className="text-lg mb-4 text-blue-600">
        Total Bills Loaded: {bills.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Customer Name</th>
              <th className="border p-3">Gender</th>
              <th className="border p-3">Total Amount</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6"
                >
                  No Bills Found
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr
                  key={bill._id}
                  className="text-center"
                >
                  <td className="border p-3">
                    {bill.customer?.name}
                  </td>

                  <td className="border p-3">
                    {bill.customer?.gender}
                  </td>

                  <td className="border p-3 font-semibold text-green-600">
                    ₹{bill.total?.toFixed(2)}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      bill.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() =>
                        deleteBill(bill._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <a
          href="/admin/dashboard"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}