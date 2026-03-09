import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { getDashboardAPI } from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    activeJobs: 0,
    closedJobs: 0,
    lowStockCount: 0,
    lowStockItems: [],
    recentJobs: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardAPI();
      setStats({
        activeJobs: res.data?.activeJobs || 0,
        closedJobs: res.data?.closedJobs || 0,
        lowStockCount: res.data?.lowStockCount || 0,
        lowStockItems: res.data?.lowStockItems || [],
        recentJobs: res.data?.recentJobs || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-8 pb-24 bg-[#F8F3E1]">

        {/* Welcome */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#41431B]">
              Welcome Back, Admin 👋
            </h1>
            <p className="text-[#AEB784] mt-1">
              Monitor and manage your garage operations.
            </p>
          </div>

          <button
            onClick={() => navigate("/jobcards")}
            className="bg-[#41431B] hover:bg-[#2f3112] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
          >
            + New Job Card
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Active Jobs" value={stats.activeJobs} />
          <StatCard title="Closed Jobs" value={stats.closedJobs} />
          <StatCard title="Low Stock Alerts" value={stats.lowStockCount} />
        </div>

        {/* Recent + Low Stock */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Recent Jobs */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#41431B] mb-4">
              Recent Jobs
            </h2>

            <table className="w-full text-sm">
              <thead className="bg-[#E3DBBB] text-[#41431B]">
                <tr>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Vehicle</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {(stats.recentJobs || []).map((job) => (
                  <tr key={job._id} className="border-b">
                    <td className="p-3">{job.customerName}</td>
                    <td className="p-3">{job.vehicleNumber}</td>
                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#AEB784] text-[#41431B]">
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock */}
          <div className="w-full lg:w-80 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#41431B] mb-4">
              Low Stock
            </h2>

            <div className="space-y-3">
              {(stats.lowStockItems || []).map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-[#E3DBBB] rounded-xl"
                >
                  <p className="font-semibold text-[#41431B]">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#41431B]">
                    Only {item.qty} left
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/inventory")}
              className="w-full mt-6 bg-[#41431B] text-white py-3 rounded-xl font-semibold"
            >
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#41431B]">
    <p className="text-[#AEB784] text-sm">{title}</p>
    <p className="text-3xl font-bold text-[#41431B] mt-2">
      {value}
    </p>
  </div>
);

export default Dashboard;