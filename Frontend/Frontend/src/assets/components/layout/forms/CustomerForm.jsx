import { useState } from "react";
import Button from "../ui/Button";

const CustomerForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
    problem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", phone: "", vehicleNumber: "", problem: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
      <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="Vehicle Number" className="p-2 border rounded" />
      <input name="problem" value={form.problem} onChange={handleChange} placeholder="Problem" className="p-2 border rounded" />
      <div className="col-span-2">
        <Button>Add Customer</Button>
      </div>
    </form>
  );
};

export default CustomerForm;