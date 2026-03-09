import Header from "./Header";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3E1] text-[#41431B]">
      
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 px-4 pb-24 pt-4">
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;