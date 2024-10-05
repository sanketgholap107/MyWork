import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntry = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/prelhb/getalldata");
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
    const worksheet = workbook.addWorksheet("LHBSchedulePreInspection");

    worksheet.columns = [
      { header: "Shop Sr. No.", key: "ShopSrNumber", width: 10 },
      { header: "Axle No.", key: "AxleNumber", width: 10 },
      { header: "Receive Date", key: "ReceiveDate", width: 15 },
      { header: "Dispatch Date", key: "DispatchDate", width: 15 },
      { header: "Coach No.", key: "CoachNumber", width: 10 },
      { header: "Diameter IN", key: "DiameterIN", width: 15 },
      { header: "Diameter OUT", key: "DiameterOUT", width: 10 },
      { header: "Flage IN", key: "FlageIN", width: 10 },
      { header: "Flage OUT", key: "FlageOUT", width: 10 },
      { header: "BD Make", key: "BDMake", width: 15 },
      { header: "BD Size IN", key: "BDSizeIN", width: 10 },
      { header: "BD Size OUT", key: "BDSizeOUT", width: 15 },
      { header: "Rod Gauge IN", key: "RodGaugeIN", width: 15 },
      { header: "Rod Gauge OUT", key: "RodGaugeOUT", width: 15 },
      { header: "Sound Test IN", key: "SoundTestIN", width: 10 },
      { header: "Sound Test OUT", key: "SoundTestOUT", width: 10 },
      { header: "Type Of Repair", key: "TypeOfRepair", width: 10 },
      { header: "UST Name", key: "USTName", width: 10 },
      { header: "Matunga Remark", key: "MatungaRemark", width: 15 },
      { header: "Insp. Sign", key: "InspectorSign", width: 15 },
      { header: "Disc Particular A", key: "DiscParticularA", width: 15 },
      { header: "Disc Particular B", key: "DiscParticularB", width: 15 },
      { header: "CTRB A", key: "CTRBA", width: 10 },
      { header: "CTRB B", key: "CTRBB", width: 10 },
    ];

    // Add the header rows
    worksheet.getRow(1).values = [
      "Shop Sr. No.",
      "Axle No.",
      "Receive Date",
      "Dispatch Date",
      "Coach No.",
      "Diameter IN",
      "Diameter OUT",
      "Flage IN",
      "Flage OUT",
      "BD Make",
      "BD Size IN",
      "BD Size OUT",
      "Rod Gauge IN",
      "Rod Gauge OUT",
      "Sound Test IN",
      "Sound Test OUT",
      "Type Of Repair",
      "UST Name",
      "Matunga Remark",
      "Insp. Sign",
      "Disc Particular A",
      "Disc Particular B",
      "CTRB A",
      "CTRB B",
    ];

    // worksheet.getRow(2).values = [
    //   "",
    //   "",
    //   "Dia",
    //   "RG",
    //   "FLG",
    //   "",
    //   "Size",
    //   "Oval",
    //   "Tap",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    //   "",
    // ];

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
    worksheet.mergeCells("J1:J2");
    worksheet.mergeCells("K1:K2");
    worksheet.mergeCells("L1:L2");
    worksheet.mergeCells("M1:M2");
    worksheet.mergeCells("N1:N2");
    worksheet.mergeCells("O1:O1");
    worksheet.mergeCells("P1:P2");
    worksheet.mergeCells("Q1:Q2");
    worksheet.mergeCells("R1:R2");
    worksheet.mergeCells("S1:S2");
    worksheet.mergeCells("T1:T2");
    worksheet.mergeCells("U1:U2");
    worksheet.mergeCells("V1:V2");
    worksheet.mergeCells("W1:W2");
    worksheet.mergeCells("X1:X2");


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
        ShopSrNumber: item.ShopSrNumber,
        AxleNumber: item.AxleNumber,
        ReceiveDate: item.ReceiveDate,
        DispatchDate: item.DispatchDate,
        CoachNumber: item.CoachNumber,
        DiameterIN: item.DiameterIN,
        DiameterOUT: item.DiameterOUT,
        FlageIN: item.FlageIN,
        FlageOUT: item.FlageOUT,
        BDMake: item.BDMake,
        BDSizeIN: item.BDSizeIN,
        BDSizeOUT: item.BDSizeOUT,
        RodGaugeIN: item.RodGaugeIN,
        RodGaugeOUT: item.RodGaugeOUT,
        SoundTestIN: item.SoundTestIN,
        SoundTestOUT: item.SoundTestOUT,
        TypeOfRepair: item.TypeOfRepair,
        USTName: item.USTName,
        MatungaRemark: item.MatungaRemark,
        InspectorSign: item.InspectorSign,
        DiscParticularA: item.DiscParticularA,
        DiscParticularB: item.DiscParticularB,
        CTRBA: item.CTRBA,
        CTRBB: item.CTRBB,
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBSchedulePreInspection.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      [
        { content: "Shop Sr. No.", rowSpan: 2 },
        { content: "Axle No.", rowSpan: 2 },
        { content: "Receive Date", rowSpan: 2 },
        { content: "Dispatch Date", rowSpan: 2 },
        { content: "Coach No.", rowSpan: 2 },
        { content: "Diameter IN", rowSpan: 2 },
        { content: "Diameter OUT", rowSpan: 2 },
        { content: "Flage IN", rowSpan: 2 },
        { content: "Flage OUT", rowSpan: 2 },
        { content: "BD Make", rowSpan: 2 },
        { content: "BD Size IN", rowSpan: 2 },
        { content: "BD Size OUT", rowSpan: 2 },
        { content: "Rod Gauge IN", rowSpan: 2 },
        { content: "Rod Gauge OUT", rowSpan: 2 },
        { content: "Sound Test IN", rowSpan: 2 },
        { content: "Sound Test OUT", rowSpan: 2 },
        { content: "Type Of Repair", rowSpan: 2 },
        { content: "UST Name", rowSpan: 2 },
        { content: "Matunga Remark", rowSpan: 2 },
        { content: "Insp. Sign", rowSpan: 2 },
        { content: "Disc Particular A", rowSpan: 2 },
        { content: "Disc Particular B", rowSpan: 2 },
        { content: "CTRB A", rowSpan: 2 },
        { content: "CTRB B", rowSpan: 2 },
      ],
      []
    ];

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.ShopSrNumber,
        row.AxleNumber,
        row.ReceiveDate,
        row.DispatchDate,
        row.CoachNumber,
        row.DiameterIN,
        row.DiameterOUT,
        row.FlageIN,
        row.FlageOUT,
        row.BDMake,
        row.BDSizeIN,
        row.BDSizeOUT,
        row.RodGaugeIN,
        row.RodGaugeOUT,
        row.SoundTestIN,
        row.SoundTestOUT,
        row.TypeOfRepair,
        row.USTName,
        row.MatungaRemark,
        row.InspectorSign,
        row.DiscParticularA,
        row.DiscParticularB,
        row.CTRBA,
        row.CTRBB,
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
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 },
        5: { cellWidth: 40 },
        6: { cellWidth: 40 },
        7: { cellWidth: 25 },
        8: { cellWidth: 25 },
        9: { cellWidth: 30 },
        10: { cellWidth: 30 },
        11: { cellWidth: 30 },
        12: { cellWidth: 30 },
        13: { cellWidth: 30 },
        14: { cellWidth: 30 },
        15: { cellWidth: 30 },
        16: { cellWidth: 30 },
        17: { cellWidth: 40 },
        18: { cellWidth: 50 },
        19: { cellWidth: 50 },
        20: { cellWidth: 30 },
        21: { cellWidth: 30 },
      },
      margin: { top: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB SCHEDULE Final Inspection Report",
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

    doc.save("LHB_SCHEDULE_Final_Inspection.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Shop Sr. No.",
      "Axle No.",
      "Receive Date",
      "Dispatch Date",
      "Coach No.",
      "Diameter IN",
      "Diameter OUT",
      "Flage IN",
      "Flage OUT",
      "BD Make",
      "BD Size IN",
      "BD Size OUT",
      "Rod Gauge IN",
      "Rod Gauge OUT",
      "Sound Test IN",
      "Sound Test OUT",
      "Type Of Repair",
      "UST Name",
      "Matunga Remark",
      "Insp. Sign",
      "Disc Particular A",
      "Disc Particular B",
      "CTRB A",
      "CTRB B",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.ShopSrNumber,
      entry.AxleNumber,
      entry.ReceiveDate,
      entry.DispatchDate,
      entry.CoachNumber,
      entry.DiameterIN,
      entry.DiameterOUT,
      entry.FlageIN,
      entry.FlageOUT,
      entry.BDMake,
      entry.BDSizeIN,
      entry.BDSizeOUT,
      entry.RodGaugeIN,
      entry.RodGaugeOUT,
      entry.SoundTestIN,
      entry.SoundTestOUT,
      entry.TypeOfRepair,
      entry.USTName,
      entry.MatungaRemark,
      entry.InspectorSign,
      entry.DiscParticularA,
      entry.DiscParticularB,
      entry.CTRBA,
      entry.CTRBB
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
    link.setAttribute("download", "LHBSchedulePreInspection.csv");
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
          onClick={() => navigate("/LHBSchedulePreInspection/details")}
        >
          Add New Schedule Pre Inspection Entry
        </button>
        <button
          className="yellow-button"
        onClick={() => navigate("/pending_tasks")}
        >
          Proceed to Next Stage
        </button>
      </div>
      <div id="table-container" className="table_container">
        <table>
          <thead className="thead">
            <tr>
              <th colSpan={1}>Shop Sr. No.</th>
              <th colSpan={1}>Receive Date</th>
              <th rowSpan="2">Coach No.</th>
              <th colSpan={1}>Diameter</th>
              <th colSpan={1}>Flage</th>
              <th rowSpan="2">BD Make</th>
              <th colSpan={1}>BD Size</th>
              <th colSpan={1}>Rod Gauge</th>
              <th colSpan={1}>Sound Test</th>
              <th rowSpan="2">Type Of Repair</th>
              <th rowSpan="2">UST Name</th>
              <th rowSpan="2">Matunga Remark</th>
              <th rowSpan="2">Insp. Sign</th>
            </tr>
            <tr>
              <th>Axle No.</th>
              <th>Dispatch Date</th>
              <th>IN/OUT</th>
              <th>IN/OUT</th>
              <th>IN/OUT</th>
              <th>IN/OUT</th>
              <th>IN/OUT</th>
            </tr>
          </thead>

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="">{res.ShopSrNumber}</td>
                <td rowSpan="">{res.ReceiveDate}</td>
                <td rowSpan="2">{res.CoachNumber}</td>
                <td colSpan={0}>{res.DiameterIN}</td>
                <td colSpan={0}>{res.FlageIN}</td>
                <td rowSpan="2">{res.BDMakeIN}</td>
                <td colSpan={0}>{res.BDSizeIN}</td>
                <td colSpan={0}>{res.RodGaugeIN}</td>
                <td rowSpan="">{res.SoundTestIN}</td>
                <td rowSpan="2">{res.TypeOfRepair}</td>
                <td rowSpan="2">{res.USTName}</td>
                <td rowSpan="2">{res.MatungaRemark}</td>
                <td rowSpan="2">{res.InspectorSign}</td>
              </tr>
              <tr>
                <td rowSpan="">{res.AxleNumber}</td>
                <td rowSpan="">{res.DispatchDate}</td>
                <td colSpan={0}>{res.DiameterOUT}</td>
                <td colSpan={0}>{res.FlageOUT}</td>
                <td colSpan={0}>{res.BDSizeOUT}</td>
                <td rowSpan="">{res.RodGaugeOUT}</td>
                <td colSpan={0}>{res.SoundTestOUT}</td>

              </tr>
              <tr>
                <th rowSpan="2" colSpan={2}>Disc Particular</th>
                <th colSpan="">A</th>
                <td colSpan="10">{res.DiscParticularA}</td>

              </tr>
              <tr>
                <th rowSpan="" colSpan="">B</th>
                <td colSpan="10">{res.DiscParticularB}</td>

              </tr>
              <tr>
                <th rowSpan="2" colSpan={2}>CTRB</th>
                <th colSpan="">A</th>
                <td colSpan="10">{res.CTRBA}</td>

              </tr>
              <tr>
                <th rowSpan="">B</th>
                <td colSpan="10">{res.CTRBB}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntry;
