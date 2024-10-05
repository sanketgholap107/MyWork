import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
// import "../../resources/LHB/lhbdivisionInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryDivision = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/inward/getalldata");
        console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

    // Add the header rows
    worksheet.getRow(1).values = [
      "Wheel No.",
      "Loory No.",
      "P.O.H Date",
      "Return Date",
      "Division Report",
      "Matunga Inspection Report",
    ];

    
    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("E1:E2");
    worksheet.mergeCells("F1:F2");
  

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
    data.forEach((item) => {
      worksheet.addRow({
        WheelNo: item.WheelNo,
      LooryNo : item.LooryNo,
      POHDate: item.POHDate,
      returndate: item.returndate,
      divisionreport: item.divisionreport,
      matungareport: item.matungareport,
      });
    });

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

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.WheelNo,
        row.LooryNo,
        row.POHDate,
        row.returndate,
        row.divisionreport,
        row.matungareport,
      ]),
      startX: 10,
      startY: 30,
      tableWidth: "auto",
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontSize: 8,
        cellPadding: 3,
      },
      styles: {
        overflow: "linebreak",
        fontSize: 7,
        cellWidth: "wrap",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 80 }, 
        1: { cellWidth: 80 }, 
        2: { cellWidth: 80 }, 
        3: { cellWidth: 80 }, 
        4: { cellWidth: 80 }, 
        5: { cellWidth: 80 }, 
      },
      margin: { top: 20, left: 10, right: 10 },
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
      doc.text(pageNumber, pageWidth - 100, pageHeight - 10);
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
    const rows = data.map((entry) => [
      entry.WheelNo,
      entry.LooryNo,
      entry.POHDate,
      entry.returndate,
      entry.divisionreport,
      entry.matungareport,
    ]);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main_div">
      <div className="button_div">
        <button className="green-button" onClick={exportToExcel}>
          Export To Excel
        </button>
        <button className="green-button" onClick={exportToPDF}>
          Export To PDF
        </button>
        <button className="green-button" onClick={exportToCSV}>
          Export To CSV
        </button>
        <button
          className="yellow-button"
          onClick={() => navigate("/LHBDivisionPreInspectionForm/wheel_details")}
        >
          Add New Entry
        </button>
        <button
          className="yellow-button"
          onClick={() => navigate("/LHBSchedulePreInspection/details")}
        >
          Complete Pre Inspection
        </button>
      </div>
      <div id="table-container" className="table_container">
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

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="2" key={`${res.id}-WheelNo`}>
                  {res.WheelNo}
                </td>
                <td rowSpan="2" key="LooryNo">
                  {res.LooryNo}
                </td>
                <td colSpan={1} key="POHDate">
                  {res.POHDate}
                </td>
                <td colSpan={1} key="returndate">
                  {res.returndate}
                </td>
                <td colSpan={1} key="divisionreport">
                  {res.divisionreport}
                </td>
                <td rowSpan="2" key="matungareport">
                  {res.matungareport}
                </td>
                
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryDivision;
