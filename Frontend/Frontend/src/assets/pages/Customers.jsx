import { useState } from "react";
import Layout from "../components/Layout";
import CustomerForm from "../components/layout/forms/CustomerForm";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (data) => {
    setCustomers([...customers, { ...data, id: Date.now() }]);
  };

  return (
    <Layout>
      <div className="p-6 bg-[#F8F3E1] min-h-screen space-y-8 pb-24">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-[#41431B]">
          Customers
        </h2>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-md border border-[#E3DBBB] p-6">
          <h3 className="text-lg font-semibold text-[#41431B] mb-4">
            Add New Customer
          </h3>
          <CustomerForm onAdd={addCustomer} />
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl shadow-md border border-[#E3DBBB] overflow-hidden">

          {customers.length === 0 ? (
            <div className="p-6 text-[#AEB784] text-center">
              No customers added yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#E3DBBB] text-[#41431B]">
                <tr>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Phone</th>
                  <th className="p-4 text-left font-semibold">Vehicle</th>
                  <th className="p-4 text-left font-semibold">Problem</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-[#F8F3E1] transition"
                  >
                    <td className="p-4 font-medium text-[#41431B]">
                      {c.name}
                    </td>
                    <td className="p-4">{c.phone}</td>
                    <td className="p-4">{c.vehicleNumber}</td>
                    <td className="p-4">{c.problem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

      </div>
    </Layout>
  );
};

export default Customers;