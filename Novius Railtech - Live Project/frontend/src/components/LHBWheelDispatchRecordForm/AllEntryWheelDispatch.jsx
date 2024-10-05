import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
// import "../../resources/LHB/wheelsdispatchrecordform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryWheelDispatch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/dispatch/getalldata");
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
    const worksheet = workbook.addWorksheet("wheelsdispatchrecordform");

    worksheet.columns = [
      { header: "Date", key: "date", width: 10 },
      { header: "Division/Carshed", key: "DivisionCarshed", width: 10 },
      { header: "Loory No.", key: "LooryNo", width: 30 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "Type Of Wheel", key: "TypeOfWheel", width: 10 },
      { header: "Trade Diameter(M.M.)", key: "TradeDiameter", width: 10 },
      { header: "Wheel Gauge(M.M.)", key: "WheelGauge", width: 10 },
      { header: "Axle UST Code", key: "", width: 30 },
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

    worksheet.getRow(2).values = [
      
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
    data.forEach((item) => {
      worksheet.addRow({
        date: item.date,
        DivisionCarshed: item.DivisionCarshed,
        LooryNo : item.LooryNo,
        WheelNo: item.WheelNo,
        TypeOfWheel: item.TypeOfWheel,
        TradeDiameter: item.TradeDiameter,
        WheelGauge: item.WheelGauge,
        AxleUSTCode: item.AxleUSTCode,
        remark: item.remark,
      });
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

    const tableColumn = [
      [
        { content: "Date", rowSpan: 2},
        { content: "Division/Carshed", rowSpan: 2 },
        { content: "Loory No.", rowSpan: 2 },
        { content: "Wheel No.", rowSpan: 2 },
        { content: "Type Of Wheel", rowSpan: 2 },
        { content: "Trade Diameter(M.M.)", rowSpan: 2 },
        { content: "Wheel Gauge(M.M.)", rowSpan: 2 },
        { content: "Axle UST Code", rowSpan: 2 },
        { content: "Remark", rowSpan: 2 },
      ],
      [
      ],
    ];

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.date,
        row.DivisionCarshed,
        row.LooryNo,
        row.WheelNo,
        row.TypeOfWheel,
        row.TradeDiameter,
        row.WheelGauge,
        row.AxleUSTCode,
        row.remark,
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
        0: { cellWidth: 80 }, // date
        1: { cellWidth: 80 }, // DivisionCarshed
        2: { cellWidth: 80 }, // LooryNo
        3: { cellWidth: 80 }, // WheelNo
        4: { cellWidth: 80 }, // TypeOfWheel
        5: { cellWidth: 80 }, // TradeDiameter
        6: { cellWidth: 80 }, // WheelGauge
        7: { cellWidth: 100 }, // AxleUSTCode
        8: { cellWidth: 80 }, // remark
      },
      margin: { top: 20, left: 10, right: 10 },
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
      doc.text(pageNumber, pageWidth - 100, pageHeight - 10);
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
      "Type Of Wheel",
      "Trade Diameter(M.M.)",
      "Wheel Gauge(M.M.)",
      "Axle UST Code",
      "Remark",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.remark,
      entry.DivisionCarshed,
      entry.LooryNo,
      entry.WheelNo,
      entry.TypeOfWheel,
      entry.TradeDiameter,
      entry.WheelGauge,
      entry.AxleUSTCode,
      entry.remark,
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
    link.setAttribute("download", "wheelsdispatchrecordform.csv");
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
      <div>
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
          onClick={() => navigate("/pending_tasks")}
        >
          Proceed to Pending Tasks
        </button>
        {/* <button
          className="yellow-button"
          // onClick={() => navigate("/wheelsdispatchrecordform/divisionorcarshed_details")}
        >
          Dashboard
        </button> */}
      </div>
      <div id="table-container" className="table_container">
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

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
              <td rowSpan="2" key="date">
                  {res.date}
                </td>
                <td rowSpan="2" key="DivisionCarshed">
                  {res.DivisionCarshed}
                </td>
                <td rowSpan="2" key="LooryNo">
                  {res.LooryNo}
                </td>
                <td rowSpan="2" key="WheelNo">
                  {res.WheelNo}
                </td>
                <td rowSpan="2" key="TypeOfWheel">
                  {res.TypeOfWheel}
                </td>
                <td rowSpan="2" key="TradeDiameter">
                  {res.TradeDiameter}
                </td>
                <td rowSpan="2" key="WheelGauge">
                  {res.WheelGauge}
                </td>
                <td rowSpan="2" key="AxleUSTCode">
                  {res.AxleUSTCode}
                </td>
                <td rowSpan="2" key="remark">
                  {res.remark}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryWheelDispatch;
