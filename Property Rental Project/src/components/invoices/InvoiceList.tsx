import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaDownload } from "react-icons/fa"; // Import icons
import { jsPDF } from "jspdf";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        console.log("Fetching all invoices..."); // Debugging
        const response = await axios.get(
          "http://localhost:4000/invoice/getallinvoices" // Fetch all invoices
        );
        console.log("API Response:", response.data); // Debugging
        setInvoices(response.data); // Set the fetched invoices
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setError("Failed to load invoices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices(); // Fetch all invoices when the component mounts
  }, []); // Empty dependency array to run only once

  // Function to handle the "View" action
  const handleView = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`); // Redirect to the InvoiceDetail page with the invoice ID
  };

  // Function to handle the "Download" action
  const handleDownload = (invoiceData) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Add content to the PDF
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 25, 35);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: ${invoiceData.InvoiceNumber}`, 25, 45);
    doc.text(`Date: ${new Date(invoiceData.Date).toLocaleDateString()}`, 25, 55);
    doc.text(`Company: ${invoiceData.CompanyName}`, 25, 65);
    doc.text(`Tenant ID: ${invoiceData.tenantId}`, 25, 75);
    doc.text(`Rent: ₹${invoiceData.Amount.toFixed(2)}`, 25, 85);
    doc.text(
      `Incremented Amount: ₹${invoiceData.IncrementedAmount.toFixed(2)}`,
      25,
      95
    );

    // Save the PDF
    doc.save(`invoice_${invoiceData.InvoiceNumber}.pdf`);
  };

  if (loading) return <div className="p-6">Loading invoices...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 ml-12">All Invoices</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Tenant ID
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                {/* <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Incremented Amount
                </th> */}
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoiceData) => (
                <tr key={invoiceData.InvoiceNumber}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    {invoiceData.InvoiceNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    {new Date(invoiceData.Date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    {invoiceData.CompanyName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    {invoiceData.tenantId} {/* Display Tenant ID */}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    ₹{invoiceData.Amount.toFixed(2)}
                  </td>
                  {/* <td className="px-4 py-4 whitespace-nowrap text-sm sm:text-base">
                    ₹{invoiceData.IncrementedAmount.toFixed(2)}
                  </td> */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleView(invoiceData.InvoiceNumber)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye size={20} /> {/* View Icon */}
                      </button>
                      <button
                        onClick={() => handleDownload(invoiceData)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <FaDownload size={20} /> {/* Download Icon */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;