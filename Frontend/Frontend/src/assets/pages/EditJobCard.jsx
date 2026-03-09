import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import {
  getJobCardsAPI,
  updateJobCardAPI,
  getInventoryAPI,
} from "../services/api";

const EditJobCard = () => {
  const { id } = useParams();

  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({});
  const [spareParts, setSpareParts] = useState([]);

  const [newPart, setNewPart] = useState({
    partId: "",
    quantity: "",
  });

  /* ================= FETCH JOB ================= */

  const fetchJob = async () => {
    const res = await getJobCardsAPI();
    const job = res.data.find((j) => j._id === id);
    if (!job) return;

    setForm({
      customerName: job.customerName,
      phone: job.phone,
      vehicleType: job.vehicleType,
      vehicleNumber: job.vehicleNumber,
      problem: job.problem,
      mechanic: job.mechanic,
      laborCharge: job.laborCharge,
    });

    setSpareParts(
      job.spareParts.map((sp) => ({
        part: sp.part?._id,
        name: sp.part?.name,
        quantity: sp.quantity,
        price: sp.price,
      }))
    );
  };

  /* ================= FETCH INVENTORY ================= */

  const fetchInventory = async () => {
    const res = await getInventoryAPI();
    setInventory(res.data);
  };

  useEffect(() => {
    fetchJob();
    fetchInventory();
  }, []);

  /* ================= UPDATE EXISTING PART ================= */

  const updatePartField = (index, field, value) => {
    const updated = [...spareParts];
    updated[index][field] =
      field === "quantity" || field === "price"
        ? Number(value)
        : value;

    setSpareParts(updated);
  };

  /* ================= ADD NEW PART ================= */

  const addNewPart = () => {
    if (!newPart.partId || !newPart.quantity) return;

    const item = inventory.find((i) => i._id === newPart.partId);

    setSpareParts([
      ...spareParts,
      {
        part: item._id,
        name: item.name,
        quantity: Number(newPart.quantity),
        price: item.price,
      },
    ]);

    setNewPart({
      partId: "",
      quantity: "",
    });
  };

  /* ================= REMOVE PART ================= */

  const removePart = (index) => {
    const updated = spareParts.filter((_, i) => i !== index);
    setSpareParts(updated);
  };

  /* ================= CALCULATE TOTAL ================= */

  const calculateTotal = () => {
    const partsTotal = spareParts.reduce(
      (acc, p) => acc + p.quantity * p.price,
      0
    );

    return partsTotal + Number(form.laborCharge || 0);
  };

  /* ================= UPDATE JOB ================= */

  const handleUpdate = async () => {
    try {
      await updateJobCardAPI(id, {
        ...form,
        spareParts: spareParts.map((p) => ({
          part: p.part,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount: calculateTotal(),
      });

      window.location.href = "/jobcards";
    } catch (err) {
      alert("Error updating job");
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-[#F8F3E1] min-h-screen pb-24">

        <h1 className="text-3xl font-bold text-[#41431B] mb-8">
          Edit Job Card
        </h1>

        <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] p-8 space-y-8">

          {/* FORM */}
          <div className="grid md:grid-cols-3 gap-4">
            {Object.keys(form).map((field, index) => (
              <input
                key={index}
                type={field === "laborCharge" ? "number" : "text"}
                value={form[field]}
                placeholder={field}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value,
                  })
                }
                className="border border-[#E3DBBB] p-3 rounded-xl focus:ring-2 focus:ring-[#AEB784]"
              />
            ))}
          </div>

          {/* ================= SPARE PARTS ================= */}

          <div>
            <h3 className="text-xl font-semibold text-[#41431B] mb-4">
              Spare Parts
            </h3>

            {spareParts.map((sp, i) => (
              <div
                key={i}
                className="rounded-xl p-5 mb-4 bg-[#F8F3E1] border border-[#E3DBBB]"
              >
                <div className="grid md:grid-cols-4 gap-4">

                  <input
                    value={sp.name}
                    disabled
                    className="border border-[#E3DBBB] p-2 rounded-lg bg-gray-100"
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={sp.quantity}
                    onChange={(e) =>
                      updatePartField(i, "quantity", e.target.value)
                    }
                    className="border border-[#E3DBBB] p-2 rounded-lg"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={sp.price}
                    onChange={(e) =>
                      updatePartField(i, "price", e.target.value)
                    }
                    className="border border-[#E3DBBB] p-2 rounded-lg"
                  />

                  <button
                    onClick={() => removePart(i)}
                    className="bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>

                <p className="mt-3 text-sm font-medium text-[#41431B]">
                  Part Total: ₹{sp.quantity * sp.price}
                </p>
              </div>
            ))}
          </div>

          {/* ================= ADD NEW PART ================= */}

          <div className="bg-[#F8F3E1] p-6 rounded-xl border border-[#E3DBBB]">

            <h4 className="font-semibold mb-4 text-[#41431B]">
              Add Spare Part
            </h4>

            <div className="grid md:grid-cols-3 gap-4">

              <select
                value={newPart.partId}
                onChange={(e) =>
                  setNewPart({
                    ...newPart,
                    partId: e.target.value,
                  })
                }
                className="border border-[#E3DBBB] p-3 rounded-lg"
              >
                <option value="">Select Spare Part</option>

                {inventory.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} (₹{item.price})
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={newPart.quantity}
                onChange={(e) =>
                  setNewPart({
                    ...newPart,
                    quantity: e.target.value,
                  })
                }
                className="border border-[#E3DBBB] p-3 rounded-lg"
              />

              <button
                onClick={addNewPart}
                className="bg-[#AEB784] text-white rounded-lg font-semibold"
              >
                Add Part
              </button>

            </div>
          </div>

          {/* TOTAL */}

          <div className="text-right text-xl font-bold text-[#41431B]">
            Updated Total: ₹{calculateTotal()}
          </div>

          {/* UPDATE BUTTON */}

          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-[#41431B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2f3112]"
            >
              Update Job Card
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default EditJobCard;