import React from "react";
// import "../../resources/LHB/lhbpressoffform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitPressOff = ({ formDataPressOffLHB, setFormDataPressOffLHB }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/pressofflhb/data", formDataPressOffLHB);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffLHB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 2,
          WheeltypeID: 1,
          modifiedBy: "admin",
        }));

        navigate("/viewallentrypressoff");
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
      const response = await postData("/pressofflhb/data", formDataPressOffLHB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffLHB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 2,
          WheeltypeID: 1,
          modifiedBy: "admin",
        }));

        // navigate("/viewallentrypressoff");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBPressOffForm");

    worksheet.columns = [
      { header: "Date", key: "Date", width: 10 },
      { header: "Operator T.No.", key: "OperatorTNo", width: 30 },
      { header: "Inspector T.No.", key: "InspectorTNo", width: 30 },
      { header: "ShopS.No.", key: "ShopSNo", width: 30 },
      { header: "Type Of Wheel", key: "TypeOfWheel", width: 30 },
      { header: "Wheel Pressed Off For RA/RD/RG", key: "WheelPressedOff", width: 30 },
      { header: "Disc Sr.No.", key: "DiscSrNo", width: 30 },
      { header: "General Observation", key: "GeneralObservation", width: 30 },
      { header: "Axle No.", key: "AxleNo", width: 15 },
      { header: "Reason", key: "Reason", width: 30 },
      { header: "Remark", key: "PressedOffRemark", width: 30 },
    ];
    worksheet.getRow(1).values = [
      "Date",
      "Operator T.No.",
      "Inspector T.No.",
      "ShopS.No.",
      "Type Of Wheel",
      "Wheel Pressed Off For RA/RD/RG",
      "Disc Sr.No.",
      "General Observation",
      "",
      "Remark",
    ];

    worksheet.getRow(2).values = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Axle No.",
      "Reason",
      "",
    ];

    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2"); 
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("E1:E2");
    worksheet.mergeCells("F1:F2"); 
    worksheet.mergeCells("G1:G2"); 
    worksheet.mergeCells("H1:I1");
    worksheet.mergeCells("J1:J2"); 



    // Add header rows
    worksheet.addRow({
      Date: formDataPressOffLHB.Date,
      OperatorTNo: formDataPressOffLHB.OperatorTNo,
      InspectorTNo: formDataPressOffLHB.InspectorTNo,
      ShopSNo: formDataPressOffLHB.ShopSNo,
      TypeOfWheel: formDataPressOffLHB.TypeOfWheel,
      WheelPressedOff: formDataPressOffLHB.WheelPressedOff,
      DiscSrNo: formDataPressOffLHB.DiscSrNo,
      GeneralObservation: formDataPressOffLHB.AxleNo,
      AxleNo: formDataPressOffLHB.Reason,
      Reason: formDataPressOffLHB.PressedOffRemark

    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(2).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    worksheet.getRow(2).fill = {
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

    // Apply border style to header row 1
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    // Apply border style to header row 2
    worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5;
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;
    worksheet.getRow(2).height = 20;

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBPressOffForm.xlsx");
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
        { content: "Date", rowSpan: 2 },
        { content: "OperatorTNo", rowSpan: 2 },
        { content: "InspectorTNo", rowSpan: 2 },
        { content: "ShopSNo", rowSpan: 2 },
        { content: "TypeOfWheel", rowSpan: 2 },
        { content: "WheelPressedOff", rowSpan: 2 },
        { content: "DiscSrNo", rowSpan: 2 },
        { content: "General Observation", colSpan: 2 },
      ],
      [
        { content: "Axle No." },
        { content: "Reason" },
      ]
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        formDataPressOffLHB.Date,
        formDataPressOffLHB.OperatorTNo,
        formDataPressOffLHB.InspectorTNo,
        formDataPressOffLHB.ShopSNo,
        formDataPressOffLHB.TypeOfWheel,
        formDataPressOffLHB.WheelPressedOff,
        formDataPressOffLHB.DiscSrNo,
        formDataPressOffLHB.AxleNo,
        formDataPressOffLHB.Reason,
        formDataPressOffLHB.Remark

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
        6: { cellWidth: 80 },
        7: { cellWidth: 80 },
        8: { cellWidth: 80 },
        
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "PRESS-OFF OF LHB WHEEL FORM Report",
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

    doc.save("LHBPressOffForm.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Date",
      "OperatorTNo",
      "InspectorTNo",
      "ShopSNo",
      "TypeOfWheel",
      "WheelPressedOff",
      "DiscSrNo",
      "AxleNo",
      "Reason",
      "Remark"
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataPressOffLHB.Date,
        formDataPressOffLHB.OperatorTNo,
        formDataPressOffLHB.InspectorTNo,
        formDataPressOffLHB.ShopSNo,
        formDataPressOffLHB.TypeOfWheel,
        formDataPressOffLHB.WheelPressedOff,
        formDataPressOffLHB.DiscSrNo,
        formDataPressOffLHB.AxleNo,
        formDataPressOffLHB.Reason,
        formDataPressOffLHB.Remark

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
    link.setAttribute("download", "LHBPressOffForm.csv");
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
        <button
          className="blue_button"
          onClick={handleNext}
        >
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
              <th rowSpan="2">Date</th>
              <th rowSpan="2">OperatorTNo</th>
              <th rowSpan="2">InspectorTNo</th>
              <th rowSpan="2">ShopSNo</th>
              <th rowSpan="2">TypeOfWheel</th>
              <th rowSpan="2">WheelPressedOff</th>
              <th rowSpan="2">DiscSrNo</th>
              <th colSpan={2}>General Observations</th>
              <th rowSpan="2">Remark</th>
            </tr>
            <tr>
              <th>Axle No.</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataPressOffLHB.Date}</td>
              <td rowSpan="2">{formDataPressOffLHB.OperatorTNo}</td>
              <td rowSpan="2">{formDataPressOffLHB.InspectorTNo}</td>
              <td rowSpan="2">{formDataPressOffLHB.ShopSNo}</td>
              <td rowSpan="2">{formDataPressOffLHB.TypeOfWheel}</td>
              <td rowSpan="2">{formDataPressOffLHB.WheelPressedOff}</td>
              <td rowSpan="2">{formDataPressOffLHB.DiscSrNo}</td>
              <td colSpan={1}>{formDataPressOffLHB.AxleNo}</td>
              <td colSpan={1}>{formDataPressOffLHB.Reason}</td>
              <td rowSpan="2">{formDataPressOffLHB.PressedOffRemark}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitPressOff;




