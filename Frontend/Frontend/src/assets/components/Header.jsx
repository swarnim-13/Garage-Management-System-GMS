import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className=" top-0 z-20 bg-[#F8F3E1] border-b border-[#E3DBBB] shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#41431B] text-white shadow-md">
            🔧
          </div>
          <h2 className="text-lg font-bold text-[#41431B] tracking-wide">
            GarageFlow
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <div className="relative cursor-pointer">
            <Bell size={20} className="text-[#41431B]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#AEB784] rounded-full"></span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#AEB784] flex items-center justify-center shadow-sm">
            <span className="text-[#41431B] font-semibold text-sm">
              AD
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;