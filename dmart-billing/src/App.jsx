import { Routes, Route } from "react-router-dom";

import { BillingProvider } from "./context/BillingContext";

import BillingFlow from "./components/BillingFlow";
import AdminDashboard from "./pages/AdminDashboard";
import BillsPage from "./pages/BillsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
export default function App() {
  return (
    <BillingProvider>
      <Routes>
        <Route path="/" element={<BillingFlow />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bills"
          element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BillingProvider>
  );
}