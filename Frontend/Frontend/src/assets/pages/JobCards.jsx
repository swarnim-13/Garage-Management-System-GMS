import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import {
  getJobCardsAPI,
  createJobCardAPI,
  closeJobCardAPI,
  getInventoryAPI,
} from "../services/api";

const JobCards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jobCards, setJobCards] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    vehicleType: "",
    vehicleNumber: "",
    problem: "",
    mechanic: "",
    laborCharge: "",
  });

  const [spareParts, setSpareParts] = useState([]);
  const [part, setPart] = useState({
    partId: "",
    quantity: "",
  });

  /* ================= FETCH ================= */

  const fetchJobCards = async () => {
    const res = await getJobCardsAPI();
    setJobCards(res.data);
  };

  const fetchInventory = async () => {
    const res = await getInventoryAPI();
    setInventory(res.data);
  };

  useEffect(() => {
    fetchJobCards();
    fetchInventory();
  }, [location]);

  /* ================= ADD SPARE ================= */

  const addSparePart = () => {
    if (!part.partId || !part.quantity) return;

    const inventoryItem = inventory.find(
      (i) => i._id === part.partId
    );

    const available = inventoryItem.qty - inventoryItem.reserved;

    if (available < Number(part.quantity)) {
      alert("Not enough stock available");
      return;
    }

    setSpareParts([
      ...spareParts,
      {
        part: inventoryItem._id,
        quantity: Number(part.quantity),
        price: inventoryItem.price,
      },
    ]);

    setPart({ partId: "", quantity: "" });
  };

  /* ================= CREATE ================= */

  const createJob = async () => {
    if (spareParts.length === 0) return;

    setLoading(true);

    await createJobCardAPI({
      ...form,
      spareParts,
    });

    await fetchJobCards();
    await fetchInventory();

    setSpareParts([]);
    setLoading(false);
  };

  /* ================= CLOSE ================= */

  const closeJob = async (id) => {
    await closeJobCardAPI(id);
    await fetchJobCards();
    await fetchInventory();
  };

  const goToEdit = (id) => {
    navigate(`/jobcards/edit/${id}`);
  };

  return (
    <Layout>
      <div className="p-6 bg-[#F8F3E1] min-h-screen pb-24 space-y-10">

        <h1 className="text-3xl font-bold text-[#41431B]">
          Job Card Management
        </h1>

        {/* ================= CREATE FORM ================= */}
        <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] p-8 space-y-6">

          <div className="grid md:grid-cols-3 gap-4">
            {Object.keys(form).map((field, index) => (
              <input
                key={index}
                type={field === "laborCharge" ? "number" : "text"}
                value={form[field]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value,
                  })
                }
                placeholder={field}
                className="border border-[#E3DBBB] focus:ring-2 focus:ring-[#AEB784] p-3 rounded-xl"
              />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={part.partId}
              onChange={(e) =>
                setPart({ ...part, partId: e.target.value })
              }
              className="border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
            >
              <option value="">Select Part</option>
              {inventory.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} (Available: {item.qty - item.reserved})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={part.quantity}
              onChange={(e) =>
                setPart({ ...part, quantity: e.target.value })
              }
              className="border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
            />

            <button
              onClick={addSparePart}
              className="bg-[#AEB784] text-[#41431B] rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add Part
            </button>
          </div>

          <button
            onClick={createJob}
            disabled={loading}
            className="bg-[#41431B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2f3112] transition shadow-md"
          >
            {loading ? "Creating..." : "Create Job Card"}
          </button>
        </div>

        {/* ================= JOB LIST ================= */}
        <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] p-8">

          <table className="w-full text-sm">
            <thead className="bg-[#E3DBBB] text-[#41431B]">
              <tr>
                <th className="p-3 text-left">Job ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobCards.map((card) => (
                <tr key={card._id} className="border-b hover:bg-[#F8F3E1] transition">
                  <td className="p-3 font-semibold text-[#41431B]">
                    {card.jobCardNumber}
                  </td>
                  <td className="p-3">{card.customerName}</td>
                  <td className="p-3">{card.vehicleType}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        card.status === "Open"
                          ? "bg-[#AEB784] text-[#41431B]"
                          : "bg-[#E3DBBB] text-[#41431B]"
                      }`}
                    >
                      {card.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">
                    ₹{card.totalAmount}
                  </td>
                  <td className="p-3 space-x-2">
                    {card.status === "Open" ? (
                      <button
                        onClick={() => closeJob(card._id)}
                        className="bg-[#41431B] text-white px-3 py-1 rounded-lg hover:bg-[#2f3112] transition"
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        onClick={() => goToEdit(card._id)}
                        className="bg-[#AEB784] text-[#41431B] px-3 py-1 rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        Reopen & Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </Layout>
  );
};

export default JobCards;