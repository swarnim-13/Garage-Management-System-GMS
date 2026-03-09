import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import Layout from "../components/Layout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Invoice = () => {
  const { state } = useLocation();

  const [editMode, setEditMode] = useState(false);
  const [invoice, setInvoice] = useState(state);

  if (!invoice) return <p>No Invoice Data</p>;

  /* ================= FORMAT CURRENCY ================= */

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  /* ================= RECALCULATE TOTAL ================= */

  const calculatedTotal = useMemo(() => {
    const partsTotal = invoice.spareParts.reduce(
      (sum, part) => sum + part.total,
      0
    );

    return partsTotal + Number(invoice.laborCharge);
  }, [invoice]);

  /* ================= HANDLE EDIT ================= */

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= PRINT ================= */

  const handlePrint = () => {
    window.print();
  };

  /* ================= PROFESSIONAL PDF ================= */

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("GARAGE MANAGEMENT SYSTEM", 105, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 14, 35);
    doc.text(`Customer: ${invoice.customerName}`, 14, 43);
    doc.text(`Vehicle: ${invoice.vehicleNumber}`, 14, 51);

    // Table
    const tableData = invoice.spareParts.map((part) => [
      part.partName,
      part.quantity,
      formatCurrency(part.price),
      formatCurrency(part.total),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["Part", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
      styles: {
        halign: "center",
      },
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFont("helvetica", "bold");

    doc.text(
      `Labor Charge: ${formatCurrency(invoice.laborCharge)}`,
      14,
      finalY
    );

    doc.text(
      `Grand Total: ${formatCurrency(calculatedTotal)}`,
      14,
      finalY + 10
    );

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <Layout>
      <div className="p-10 bg-gray-100 min-h-screen">

        {/* HEADER BUTTONS */}
        <div className="flex justify-between mb-6 print:hidden">
          <h1 className="text-2xl font-bold">
            Invoice
          </h1>

          <div className="space-x-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-yellow-500 text-white px-4 py-1 rounded"
            >
              {editMode ? "Save" : "Edit"}
            </button>

            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Print
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* INVOICE BODY */}
        <div className="bg-white p-8 shadow rounded-lg">

          <h2 className="text-xl font-bold mb-4">
            Invoice Details
          </h2>

          {/* BASIC INFO */}
          <div className="space-y-2 mb-6">
            <p>
              <strong>Invoice No:</strong>{" "}
              {invoice.invoiceNumber}
            </p>

            <p>
              <strong>Customer:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="customerName"
                  value={invoice.customerName}
                  onChange={handleChange}
                  className="border p-1"
                />
              ) : (
                invoice.customerName
              )}
            </p>

            <p>
              <strong>Vehicle:</strong>{" "}
              {editMode ? (
                <input
                  type="text"
                  name="vehicleNumber"
                  value={invoice.vehicleNumber}
                  onChange={handleChange}
                  className="border p-1"
                />
              ) : (
                invoice.vehicleNumber
              )}
            </p>
          </div>

          {/* SPARE PARTS TABLE */}
          <h3 className="font-semibold mb-2">
            Spare Parts
          </h3>

          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Part</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>

            <tbody>
              {invoice.spareParts.map(
                (part, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      {part.partName}
                    </td>
                    <td className="p-2 border text-center">
                      {part.quantity}
                    </td>
                    <td className="p-2 border text-right">
                      ₹{formatCurrency(part.price)}
                    </td>
                    <td className="p-2 border text-right">
                      ₹{formatCurrency(part.total)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* TOTAL SECTION */}
          <div className="mt-6 space-y-2 text-right">

            <p>
              <strong>Labor Charge:</strong>{" "}
              {editMode ? (
                <input
                  type="number"
                  name="laborCharge"
                  value={invoice.laborCharge}
                  onChange={handleChange}
                  className="border p-1"
                />
              ) : (
                `₹${formatCurrency(invoice.laborCharge)}`
              )}
            </p>

            <p className="text-xl font-bold">
              Grand Total: ₹
              {formatCurrency(calculatedTotal)}
            </p>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Invoice;