import LoginPage from "../pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import PackageList from "../pages/packages/PackageList";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionList from "../pages/transactions/TransactionList";
import CustomerList from "../pages/customers/Customer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <div>Welcome to Dashboard E - Commerce Data</div>
          </DashboardLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/packages"
        element={
          <DashboardLayout>
            <PackageList />
          </DashboardLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <DashboardLayout>
            <TransactionList />
          </DashboardLayout>
        }
      />
      <Route
        path="/customers"
        element={
          <DashboardLayout>
            <CustomerList />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
