import React from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
// import "../../resources/LHB/wheelsdispatchrecordform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitWheelDispatch = ({ formDataWheelDispatch, setformDataWheelDispatch }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/dispatch/data", formDataWheelDispatch);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataWheelDispatch((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 5,
          WheeltypeId: 1,
        }));

        navigate("/viewallentrylhbwheelsdispatch");
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
      const response = await postData("/dispatch/data", formDataWheelDispatch);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataWheelDispatch((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 5,
          WheeltypeId: 1,
        }));

        navigate("/pending_tasks");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("wheelsdispatchrecordform");

    worksheet.columns = [
      { header: "Date", key: "date", width: 10 },
      { header: "Division/Carshed", key: "DivisionCarshed", width: 10 },
      { header: "Loory No.", key: "LooryNo", width: 30 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "Type Of Wheel", key: "TypeOfWheel", width: 10 },
      { header: "Trade Diameter(M.M.)", key: "TradeDiameter", width: 10 },
      { header: "Wheel Gauge(M.M.)", key: "WheelGauge", width: 10 },
      { header: "Axle UST Code", key: "AxleUSTCode", width: 30 },
      { header: "Remark", key: "remark", width: 10 },
    ];

    // Add the header rows
    worksheet.getRow(1).values = [
      "Date",
      "Division/Carshed",
      "Loory No.",
      "Wheel No.",
      "Type Of Wheel",
      "Trade Diameter(M.M.)",
      "Wheel Gauge(M.M.)",
      "Axle UST Code",
      "Remark",
    ];



    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("E1:E2");
    worksheet.mergeCells("F1:F2");
    worksheet.mergeCells("G1:G2");
    worksheet.mergeCells("H1:H2");
    worksheet.mergeCells("I1:I2");

    // Apply styles to headers
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

    // Add data to worksheet
    worksheet.addRow({
      date: formDataWheelDispatch.date,
      DivisionCarshed: formDataWheelDispatch.DivisionCarshed,
      LooryNo: formDataWheelDispatch.LooryNo,
      WheelNo: formDataWheelDispatch.WheelNo,
      TypeOfWheel: formDataWheelDispatch.TypeOfWheel,
      TradeDiameter: formDataWheelDispatch.TradeDiameter,
      WheelGauge: formDataWheelDispatch.WheelGauge,
      AxleUSTCode: formDataWheelDispatch.AxleUSTCode,
      remark: formDataWheelDispatch.remark,
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "wheelsdispatchrecordform.xlsx");
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
        { content: "Division/Carshed", rowSpan: 2 },
        { content: "Loory No.", rowSpan: 2 },
        { content: "Wheel No.", rowSpan: 2 },
        { content: "Type Of Wheel", rowSpan: 2 },
        { content: "Trade Diameter(M.M.)", rowSpan: 2 },
        { content: "Wheel Gauge(M.M.)", rowSpan: 2 },
        { content: "Axle UST Code", rowSpan: 2 },
        { content: "Remark", rowSpan: 2 },
      ],
      []

    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        formDataWheelDispatch.date,
        formDataWheelDispatch.DivisionCarshed,
        formDataWheelDispatch.LooryNo,
        formDataWheelDispatch.WheelNo,
        formDataWheelDispatch.TypeOfWheel,
        formDataWheelDispatch.TradeDiameter,
        formDataWheelDispatch.WheelGauge,
        formDataWheelDispatch.AxleUSTCode,
        formDataWheelDispatch.remark,
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
        0: { cellWidth: 80 }, // date
        1: { cellWidth: 80 }, // DivisionCarshed
        2: { cellWidth: 80 }, // LooryNo
        3: { cellWidth: 80 }, // WheelNo
        4: { cellWidth: 80 }, // TypeOfWheel
        5: { cellWidth: 80 }, // TradeDiameter
        6: { cellWidth: 80 }, // WheelGauge
        7: { cellWidth: 80 }, // AxleUSTCode
        8: { cellWidth: 80 }, // remark
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            " DIVISION/CARSHED WHEELS DISPATCH RECORD FORM Report",
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

    doc.save("Division/Carshed_wheels_Dispatch_Record.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Date",
      "Division/Carshed",
      "Loory No.",
      "Wheel No.",
      "Type of Wheel",
      "Trade Diameter(M.M.)",
      "Wheel Gauge(M.M.)",
      "Axle UST Code",
      "Remark",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataWheelDispatch.date,
        formDataWheelDispatch.DivisionCarshed,
        formDataWheelDispatch.LooryNo,
        formDataWheelDispatch.WheelNo,
        formDataWheelDispatch.TypeOfWheel,
        formDataWheelDispatch.TradeDiameter,
        formDataWheelDispatch.WheelGauge,
        formDataWheelDispatch.AxleUSTCode,
        formDataWheelDispatch.remark,
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
    link.setAttribute("download", "wheelsdispatchrecordform.csv");
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
              <th rowSpan="2">Division/Carshed</th>
              <th rowSpan="2">Loory No.</th>
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">Type of Wheel</th>
              <th rowSpan="2">TradeDiameter(M.M.)</th>
              <th rowSpan="2">Wheel Gauge(M.M.)</th>
              <th rowSpan="2">Axle UST Code</th>
              <th rowSpan="2">Remark</th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataWheelDispatch.date}</td>
              <td rowSpan="2">{formDataWheelDispatch.DivisionCarshed}</td>
              <td rowSpan="2">{formDataWheelDispatch.LooryNo}</td>
              <td rowSpan="2">{formDataWheelDispatch.WheelNo}</td>
              <td rowSpan="2">{formDataWheelDispatch.TypeOfWheel}</td>
              <td rowSpan="2">{formDataWheelDispatch.TradeDiameter}</td>
              <td rowSpan="2">{formDataWheelDispatch.WheelGauge}</td>
              <td rowSpan="2">{formDataWheelDispatch.AxleUSTCode}</td>
              <td rowSpan="2">{formDataWheelDispatch.remark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitWheelDispatch;
