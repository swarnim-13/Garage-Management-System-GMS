import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Inventory from "../pages/Inventory";
import JobCards from "../pages/JobCards";
import EditJobCard from "../pages/EditJobCard";
import History from "../pages/History";
import Billing from "../pages/Billing";   // 👈 ADD THIS
import Invoice from "../pages/Invoice";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/jobcards" element={<JobCards />} />
      <Route path="/jobcards/edit/:id" element={<EditJobCard />} />
      <Route path="/history" element={<History />} />
      <Route path="/billing" element={<Billing />} />  {/* 👈 ADD THIS */}
      <Route path="/invoice" element={<Invoice />} />
    </Routes>
  );
};

export default AppRoutes;