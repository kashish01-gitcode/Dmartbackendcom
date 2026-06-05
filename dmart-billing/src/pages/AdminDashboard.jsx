import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/dashboard/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="p-10 text-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        📊 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Total Bills
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {stats.totalBills}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{stats.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-gray-500 text-lg">
            Today's Revenue
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            ₹{stats.todayRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href="/admin/bills"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          View All Bills →
        </a>
      </div>
    </div>
  );
}