import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/layout/ui/Button";
import {
  getInventoryAPI,
  addInventoryAPI,
  updateInventoryAPI,
} from "../services/api";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    qty: "",
    price: "",
  });

  /* ================= FETCH ================= */

  const fetchInventory = async () => {
    try {
      const res = await getInventoryAPI();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.qty || !formData.price) {
      alert("All fields are required");
      return;
    }

    const payload = {
      name: formData.name,
      qty: Number(formData.qty),
      price: Number(formData.price),
    };

    try {
      if (editMode) {
        await updateInventoryAPI(selectedId, payload);
      } else {
        await addInventoryAPI(payload);
      }

      await fetchInventory();

      setFormData({ name: "", qty: "", price: "" });
      setShowModal(false);
      setEditMode(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      alert("Error saving inventory");
    }
  };

  const openEdit = (item) => {
    setEditMode(true);
    setSelectedId(item._id);
    setFormData({
      name: item.name,
      qty: item.qty,
      price: item.price,
    });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData({ name: "", qty: "", price: "" });
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="p-8 bg-[#F8F3E1] min-h-screen pb-24 space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#41431B]">
            Inventory
          </h2>

          <Button onClick={openAdd}>
            + Add Spare Part
          </Button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-[#E3DBBB] shadow-md rounded-2xl overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-[#E3DBBB] text-[#41431B]">
              <tr>
                <th className="p-4 text-left">Part</th>
                <th>Available</th>
                <th>Reserved</th>
                <th>Total</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => {
                const available = item.qty - item.reserved;

                return (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-[#F8F3E1] transition"
                  >
                    <td className="p-4 font-semibold text-[#41431B]">
                      {item.name}
                    </td>

                    <td
                      className={
                        available < 5
                          ? "text-red-600 font-semibold"
                          : ""
                      }
                    >
                      {available}
                    </td>

                    <td>{item.reserved}</td>
                    <td>{item.qty}</td>

                    <td className="font-semibold">
                      ₹{item.price}
                    </td>

                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => openEdit(item)}
                        className="px-3 py-1 text-sm"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white w-96 rounded-2xl p-8 shadow-xl border border-[#E3DBBB]">

              <h3 className="text-xl font-bold text-[#41431B] mb-6">
                {editMode ? "Edit Spare Part" : "Add Spare Part"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  placeholder="Part Name"
                  className="w-full border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
                  value={formData.qty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      qty: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  required
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="soft"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button type="submit">
                    {editMode ? "Update" : "Add"}
                  </Button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Inventory;