import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const JOB_API = "http://localhost:5000/api/jobcards";

const History = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(JOB_API);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <div className="p-6 bg-[#F8F3E1] min-h-screen pb-24">

        <h1 className="text-3xl font-bold text-[#41431B] mb-8">
          Job Card History
        </h1>

        {jobs.length === 0 ? (
          <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] p-8 text-center text-[#AEB784]">
            No job records found.
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] overflow-hidden">

            <table className="w-full text-sm">
              <thead className="bg-[#E3DBBB] text-[#41431B]">
                <tr>
                  <th className="p-4 text-left">Job No</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Vehicle</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Total</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Details</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <>
                    <tr
                      key={job._id}
                      className="border-b hover:bg-[#F8F3E1] transition"
                    >
                      <td className="p-4 font-semibold text-[#41431B]">
                        {job.jobCardNumber}
                      </td>

                      <td>{job.customerName}</td>

                      <td>{job.vehicleNumber}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.status === "Closed"
                              ? "bg-[#AEB784] text-[#41431B]"
                              : "bg-[#E3DBBB] text-[#41431B]"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      <td className="font-semibold">
                        ₹{job.totalAmount}
                      </td>

                      <td>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          onClick={() => toggleExpand(job._id)}
                          className="text-[#41431B] font-semibold hover:underline"
                        >
                          {expandedId === job._id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED DETAILS */}
                    {expandedId === job._id && (
                      <tr className="bg-[#F8F3E1]">
                        <td colSpan="7" className="p-6">
                          <div className="grid md:grid-cols-2 gap-8">

                            {/* Job Info */}
                            <div className="bg-white border border-[#E3DBBB] rounded-xl p-5 shadow-sm">
                              <h3 className="font-bold text-[#41431B] mb-3">
                                Job Details
                              </h3>
                              <p>
                                <strong>Problem:</strong> {job.problem}
                              </p>
                              <p>
                                <strong>Mechanic:</strong> {job.mechanic}
                              </p>
                              <p>
                                <strong>Labor Charge:</strong> ₹{job.laborCharge}
                              </p>
                            </div>

                            {/* Spare Parts */}
                            <div className="bg-white border border-[#E3DBBB] rounded-xl p-5 shadow-sm">
                              <h3 className="font-bold text-[#41431B] mb-3">
                                Spare Parts Used
                              </h3>

                              {job.spareParts.length === 0 ? (
                                <p className="text-[#AEB784]">
                                  No spare parts used.
                                </p>
                              ) : (
                                job.spareParts.map((part, index) => (
                                  <div key={index} className="mb-2 text-sm">
                                    • {part.part?.name || "Part"} ×{" "}
                                    {part.quantity} — ₹
                                    {part.price * part.quantity}
                                  </div>
                                ))
                              )}
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;