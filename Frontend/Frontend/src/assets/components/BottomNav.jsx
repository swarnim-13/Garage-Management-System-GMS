import { NavLink } from "react-router-dom";
import { Home, Wrench, Package, History, Receipt } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#41431B] shadow-lg border-t border-[#AEB784]/30">
      <div className="flex justify-around py-3">
        <NavItem to="/" icon={<Home size={20} />} label="Home" />
        <NavItem to="/jobcards" icon={<Wrench size={20} />} label="Jobs" />
        <NavItem to="/inventory" icon={<Package size={20} />} label="Inventory" />
        <NavItem to="/history" icon={<History size={20} />} label="History" />
        <NavItem to="/billing" icon={<Receipt size={20} />} label="Billing" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs transition-all duration-200 ${
          isActive
            ? "text-[#AEB784] scale-105"
            : "text-[#E3DBBB] opacity-80 hover:opacity-100"
        }`
      }
    >
      {icon}
      <span className="mt-1">{label}</span>
    </NavLink>
  );
};

export default BottomNav;