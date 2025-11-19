import LoginPage from "../pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import PackageList from "../pages/packages/PackageList";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionList from "../pages/transactions/TransactionList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <div>Dashboard</div>
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
    </Routes>
  );
}
