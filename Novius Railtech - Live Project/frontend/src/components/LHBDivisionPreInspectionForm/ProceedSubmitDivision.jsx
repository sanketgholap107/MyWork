import React from "react";
// import "../../resources/LHB/lhbdivisionInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitDivision = ({ formDataDivision, setFormDataDivision }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/inward/data", formDataDivision);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataDivision((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 1,
          WheeltypeId: 1,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryLHBDivision");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/inward/data", formDataDivision);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataDivision((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 1,
          WheeltypeId: 1,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryLHBDivision");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBDivisionPreInspectionForm");

    worksheet.columns = [
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "Loory No.", key: "LooryNo", width: 30 },
      { header: "P.O.H Date", key: "POHDate", width: 30 },
      { header: "Return Date", key: "returndate", width: 30 },
      { header: "Division Report", key: "divisionreport", width: 30 },
      { header: "Matunga Inspection Report", key: "matungareport", width: 30 },
    ];

    // Add header rows
    worksheet.addRow({
      // WheelNo: formData.WheelNo,
      // LooryNo: formData.LooryNo,
      // POHDate: formData.POHDate,
      // returndate: formData.returndate,
      // divisionreport: formData.divisionreport,
      // matungareport: formData.matungareport,
      WheelNo: formDataDivision.WheelNo,
      LooryNo: formDataDivision.LooryNo,
      POHDate: formDataDivision.POHDate,
      returndate: formDataDivision.returndate,
      divisionreport: formDataDivision.divisionreport,
      matungareport: formDataDivision.matungareport,
    });

    // Apply styles to headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Apply border style to header row
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5;
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBDivisionPreInspectionForm.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    // Define the headers, including subheaders for columns with subcolumns
    const tableColumn = [
      [
        { content: "Wheel No.", rowSpan: 1 },
        { content: "Loory No.", rowSpan: 1 },
        { content: "P.O.H Date", rowSpan: 1 },
        { content: "Return Date", rowSpan: 1 },
        { content: "Division Report", rowSpan: 1 },
        { content: "Matunga Inspection Report", rowSpan: 1 },
      ],
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        // formData.WheelNo,
        // formData.LooryNo,
        // formData.POHDate,
        // formData.returndate,
        // formData.divisionreport,
        // formData.matungareport,
        formDataDivision.WheelNo,
        formDataDivision.LooryNo,
        formDataDivision.POHDate,
        formDataDivision.returndate,
        formDataDivision.divisionreport,
        formDataDivision.matungareport,
      ],
    ];

    // Set autoTable configuration

    doc.autoTable({
      head: tableColumn,
      body: tableRows,
      startX: 10,
      startY: 30,
      tableWidth: "auto", // Automatically adjusts the width to fit the page
      tableHeight: doc.internal.pageSize.getHeight() - 20,
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0], // Color for the table header
        halign: "center",
        valign: "middle",
        fontSize: 8, // Adjusted to fit more content
        cellPadding: 3,
      },
      styles: {
        overflow: "linebreak", // Wrap text in cells
        fontSize: 7, // Adjust font size to reduce the table width
        cellWidth: "wrap", // Allow cells to wrap text
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        // Adjusting column widths to ensure the table fits on the page
        0: { cellWidth: 80 },
        1: { cellWidth: 80 },
        2: { cellWidth: 80 },
        3: { cellWidth: 80 },
        4: { cellWidth: 80 },
        5: { cellWidth: 80 },
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB Division Pre Inspection Form Report",
            data.settings.margin.left,
            20
          );
        }
      },
    });

    const totalPages = doc.internal.getNumberOfPages();

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.setFontSize(10);
      const pageNumber = `Page ${i} of ${totalPages}`;
      doc.text(pageNumber, pageWidth - 50, pageHeight - 10);
    }

    doc.save("LHBDivisionPreInspectionForm.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel No.",
      "Loory No.",
      "P.O.H Date",
      "Return Date",
      "Division Report",
      "Matunga Inspection Report",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        // formData.WheelNo,
        // formData.LooryNo,
        // formData.POHDate,
        // formData.returndate,
        // formData.divisionreport,
        // formData.matungareport,
        formDataDivision.WheelNo,
        formDataDivision.LooryNo,
        formDataDivision.POHDate,
        formDataDivision.returndate,
        formDataDivision.divisionreport,
        formDataDivision.matungareport,
      ],
    ];

    // Create CSV content
    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    // Encode URI and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "LHBDivisionPreInspectionForm.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  return (
    <div className="main_div">
      <div className="button_div">
        <button className="blue_button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="blue_button" onClick={handleNext}>
          Submit & View All Entries
        </button>
        <button className="green-button" onClick={exportToExcel}>
          Export To Excel
        </button>
        <button className="green-button" onClick={exportToPDF}>
          Export To PDF
        </button>
        <button className="green-button" onClick={exportToCSV}>
          Export To CSV
        </button>
      </div>
      <div id="table-container">
        <table>
          <thead className="thead">
            <tr>
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">Loory No.</th>
              <th rowSpan="2">P.O.H Date</th>
              <th rowSpan="2">Return Date</th>
              <th rowSpan="2">Division Report</th>
              <th rowSpan="2">Matunga Inspection Report</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataDivision.WheelNo}</td>
              <td rowSpan="2">{formDataDivision.LooryNo}</td>
              <td rowSpan="2">{formDataDivision.POHDate}</td>
              <td rowSpan="2">{formDataDivision.returndate}</td>
              <td rowSpan="2">{formDataDivision.divisionreport}</td>
              <td rowSpan="2">{formDataDivision.matungareport}</td>
              {/* <td rowSpan="2">{formData.remark}</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitDivision;
