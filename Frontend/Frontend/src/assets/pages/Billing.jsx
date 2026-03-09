import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BILLING_API = "http://localhost:5000/api/billing";
const JOB_API = "http://localhost:5000/api/jobcards";

const Billing = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadingJobId, setLoadingJobId] = useState(null);

  useEffect(() => {
    fetchBills();
    fetchJobs();
  }, []);

  /* ================= FETCH INVOICES ================= */

  const fetchBills = async () => {
    try {
      const res = await axios.get(BILLING_API);
      setBills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH JOBS ================= */

  const fetchJobs = async () => {
    try {
      const res = await axios.get(JOB_API);

      const closedJobs = res.data.filter(
        (job) => job.status === "Closed"
      );

      setJobs(closedJobs);

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= GENERATE INVOICE ================= */

  const generateInvoice = async (jobId) => {
    try {

      setLoadingJobId(jobId);

      const res = await axios.post(`${BILLING_API}/${jobId}`);

      await fetchBills();

      navigate("/invoice", {
        state: res.data,
      });

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Error generating invoice"
      );

    } finally {
      setLoadingJobId(null);
    }
  };

  /* ================= MARK PAID ================= */

  const markPaid = async (billId) => {
    try {

      await axios.put(`${BILLING_API}/pay/${billId}`);

      fetchBills();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>

      <div className="p-6 bg-[#F8F3E1] min-h-screen space-y-10 pb-24">

        <h1 className="text-3xl font-bold text-[#41431B]">
          Billing Management
        </h1>

        {/* ================= GENERATE INVOICE ================= */}

        <div className="bg-white shadow-md rounded-2xl border border-[#E3DBBB] p-8">

          <h2 className="text-xl font-semibold text-[#41431B] mb-6">
            Generate Invoice from Closed Jobs
          </h2>

          {jobs.length === 0 ? (

            <p className="text-[#AEB784]">
              No closed job cards available.
            </p>

          ) : (

            <table className="w-full text-sm">

              <thead className="bg-[#E3DBBB] text-[#41431B]">
                <tr>
                  <th className="p-3 text-left">Job No</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Vehicle</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job._id} className="border-b">

                    <td className="p-3 font-semibold text-[#41431B]">
                      {job.jobCardNumber}
                    </td>

                    <td className="p-3">
                      {job.customerName}
                    </td>

                    <td className="p-3">
                      {job.vehicleNumber}
                    </td>

                    <td className="p-3">

                      <button
                        disabled={loadingJobId === job._id}
                        onClick={() => generateInvoice(job._id)}
                        className="bg-[#41431B] text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-[#2f3112] transition"
                      >
                        {loadingJobId === job._id
                          ? "Generating..."
                          : "Generate Bill"}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        {/* ================= ALL INVOICES ================= */}

        

      </div>

    </Layout>
  );
};

export default Billing;