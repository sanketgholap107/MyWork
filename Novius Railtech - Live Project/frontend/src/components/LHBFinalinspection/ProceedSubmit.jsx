import React from "react";
// import "../../resources/LHB/finalInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Breadcrumbs from "./Breadcrumbs";

const ProceedSubmitFinal = ({ formDataFinal, setFormDataFinal }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/api/data", formDataFinal);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataFinal((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 1,
        }));

        navigate("/viewallentryFinal");
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
      const response = await postData("/api/data", formDataFinal);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataFinal((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
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
    const worksheet = workbook.addWorksheet("LHBFinalInspection");

    worksheet.columns = [
      { header: "Axle No.", key: "AxleNo", width: 10 },
      { header: "A/B Side", key: "ABSide", width: 10 },
      { header: "Wheel Size", key: "WheelSize", width: 30 },
      { header: "Dia", key: "WheelDia", width: 10 },
      { header: "RG", key: "WheelRG", width: 10 },
      { header: "FLG", key: "WheelFLG", width: 10 },
      { header: "F/C", key: "FC", width: 10 },
      { header: "Journal Size", key: "JournalSize", width: 30 },
      { header: "Size", key: "Size", width: 10 },
      { header: "Oval", key: "Oval", width: 10 },
      { header: "Tap", key: "Tap", width: 10 },
      { header: "Shoulder Size", key: "ShoulderSize", width: 15 },
      { header: "Jr. Waiviness", key: "JrWaiviness", width: 15 },
      { header: "BD Make", key: "BDMake", width: 15 },
      { header: "BD Size", key: "BDSize", width: 10 },
      { header: "End Hole", key: "EndHole", width: 10 },
      { header: "BRG Remain Life", key: "BRGRemainLife", width: 15 },
      { header: "BRG Make", key: "BRGMake", width: 10 },
      { header: "BRG No.", key: "BRGNo", width: 10 },
      { header: "MEP", key: "MEP", width: 10 },
      { header: "UST Name", key: "USTName", width: 15 },
      { header: "Fitting Dt.", key: "FittingDt", width: 15 },
      { header: "ECA Test", key: "ECATest", width: 10 },
      { header: "Insp. Sign", key: "InspectorSign", width: 15 },
    ];

    // Add the header rows
    worksheet.getRow(1).values = [
      "Axle No.",
      "A/B Side",
      "Wheel Size",
      "",
      "",
      "F/C",
      "Journal Size",
      "",
      "",
      "Shoulder Size",
      "Jr. Waiviness",
      "BD Make",
      "BD Size",
      "End Hole",
      "BRG Remain Life",
      "BRG Make",
      "BRG No.",
      "MEP",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Sign",
    ];

    worksheet.getRow(2).values = [
      "",
      "",
      "Dia",
      "RG",
      "FLG",
      "",
      "Size",
      "Oval",
      "Tap",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:E1"); // Wheel Size
    worksheet.mergeCells("F1:F2");
    worksheet.mergeCells("G1:I1"); // Journal Size
    worksheet.mergeCells("J1:J2"); // Shoulder Size
    worksheet.mergeCells("K1:K2"); // Jr. Waiviness
    worksheet.mergeCells("L1:L2"); // BD Make
    worksheet.mergeCells("M1:M2"); // BD Size
    worksheet.mergeCells("N1:N2"); // End Hole
    worksheet.mergeCells("O1:O2"); // BRG Remain Life
    worksheet.mergeCells("P1:P2"); // BRG Make
    worksheet.mergeCells("Q1:Q2"); // BRG No.
    worksheet.mergeCells("R1:R2"); // MEP
    worksheet.mergeCells("S1:S2"); // UST Name
    worksheet.mergeCells("T1:T2"); // Fitting Dt.
    worksheet.mergeCells("U1:U2"); // ECA Test
    worksheet.mergeCells("V1:V2"); // Insp. Sign

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
      AxleNo: formDataFinal.AxleNo,
      ABSide: formDataFinal.ABSide,
      WheelSize: formDataFinal.WheelDia,
      WheelDia: formDataFinal.WheelRG,
      WheelRG: formDataFinal.WheelFLG,
      WheelFLG: formDataFinal.FC,
      // JournalSize: "", // Not used but included for layout
      FC: formDataFinal.Size,
      JournalSize: formDataFinal.Oval,
      Size: formDataFinal.Tap,
      Oval: formDataFinal.ShoulderSize,
      Tap: formDataFinal.JrWaiviness,
      ShoulderSize: formDataFinal.BDMake,
      JrWaiviness: formDataFinal.BDSize,
      BDMake: formDataFinal.EndHole,
      BDSize: formDataFinal.BRGRemainLife,
      EndHole: formDataFinal.BRGMake,
      BRGRemainLife: formDataFinal.BRGNo,
      BRGMake: formDataFinal.MEP,
      BRGNo: formDataFinal.USTName,
      MEP: formDataFinal.FittingDt,
      USTName: formDataFinal.ECATest,
      FittingDt: formDataFinal.InspectorSign,
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBFinalInspection.xlsx");
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
        { content: "Axle No.", rowSpan: 2 },
        { content: "A/B Side", rowSpan: 2 },
        { content: "Wheel Size", colSpan: 3 },
        { content: "F/C", rowSpan: 2 },
        { content: "Journal Size", colSpan: 3 },
        { content: "Shoulder Size", rowSpan: 2 },
        { content: "Jr. Waiviness", rowSpan: 2 },
        { content: "BD Make", rowSpan: 2 },
        { content: "BD Size", rowSpan: 2 },
        { content: "End Hole", rowSpan: 2 },
        { content: "BRG Remain Life", rowSpan: 2 },
        { content: "BRG Make", rowSpan: 2 },
        { content: "BRG No.", rowSpan: 2 },
        { content: "MEP", rowSpan: 2 },
        { content: "UST Name", rowSpan: 2 },
        { content: "Fitting Dt.", rowSpan: 2 },
        { content: "ECA Test", rowSpan: 2 },
        { content: "Insp. Sign", rowSpan: 2 },
      ],
      [
        { content: "Dia" },
        { content: "RG" },
        { content: "FLG" },
        { content: "Size" },
        { content: "Oval" },
        { content: "Tap" },
      ],
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        formDataFinal.AxleNo,
        formDataFinal.ABSide,
        formDataFinal.WheelDia,
        formDataFinal.WheelRG,
        formDataFinal.WheelFLG,
        formDataFinal.FC,
        formDataFinal.Size,
        formDataFinal.Oval,
        formDataFinal.Tap,
        formDataFinal.ShoulderSize,
        formDataFinal.JrWaiviness,
        formDataFinal.BDMake,
        formDataFinal.BDSize,
        formDataFinal.EndHole,
        formDataFinal.BRGRemainLife,
        formDataFinal.BRGMake,
        formDataFinal.BRGNo,
        formDataFinal.MEP,
        formDataFinal.USTName,
        formDataFinal.FittingDt,
        formDataFinal.ECATest,
        formDataFinal.InspectorSign,
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
        0: { cellWidth: 30 }, // AxleNo
        1: { cellWidth: 30 }, // ABSide
        2: { cellWidth: 30 }, // WheelDia
        3: { cellWidth: 30 }, // WheelRG
        4: { cellWidth: 30 }, // WheelFLG
        5: { cellWidth: 30 }, // FC
        6: { cellWidth: 25 }, // JournalSize
        7: { cellWidth: 25 }, // Oval
        8: { cellWidth: 25 }, // Tap
        9: { cellWidth: 60 }, // ShoulderSize
        10: { cellWidth: 60 }, // JrWaiviness
        11: { cellWidth: 40 }, // BDMake
        12: { cellWidth: 40 }, // BDSize
        13: { cellWidth: 40 }, // EndHole
        14: { cellWidth: 50 }, // BRGRemainLife
        15: { cellWidth: 30 }, // BRGMake
        16: { cellWidth: 30 }, // BRGNo
        17: { cellWidth: 40 }, // MEP
        18: { cellWidth: 40 }, // USTName
        19: { cellWidth: 40 }, // FittingDt
        20: { cellWidth: 40 }, // ECATest
        21: { cellWidth: 40 }, // InspectorSign
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB Final Inspection Report",
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

    doc.save("LHB_Final_Inspection.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Axle No.",
      "A/B Side",
      "Dia",
      "RG",
      "FLG",
      "F/C",
      "Size",
      "Oval",
      "Tap",
      "Shoulder Size",
      "Jr. Waiviness",
      "BD Make",
      "BD Size",
      "End Hole",
      "BRG Remain Life",
      "BRG Make",
      "BRG No.",
      "MEP",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Sign",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataFinal.AxleNo,
        formDataFinal.ABSide,
        formDataFinal.WheelDia,
        formDataFinal.WheelRG,
        formDataFinal.WheelFLG,
        formDataFinal.FC,
        formDataFinal.Size,
        formDataFinal.Oval,
        formDataFinal.Tap,
        formDataFinal.ShoulderSize,
        formDataFinal.JrWaiviness,
        formDataFinal.BDMake,
        formDataFinal.BDSize,
        formDataFinal.EndHole,
        formDataFinal.BRGRemainLife,
        formDataFinal.BRGMake,
        formDataFinal.BRGNo,
        formDataFinal.MEP,
        formDataFinal.USTName,
        formDataFinal.FittingDt,
        formDataFinal.ECATest,
        formDataFinal.InspectorSign,
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
    link.setAttribute("download", "LHBFinalInspection.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  return (
    <div className="main_div">
      <Breadcrumbs />
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
              <th rowSpan="2">Axle No.</th>
              <th rowSpan="2">A/B Side</th>
              <th colSpan={3}>Wheel Size</th>
              <th rowSpan="2">F/C</th>
              <th colSpan={3}>Journal Size</th>
              <th rowSpan="2">Shoulder Size</th>
              <th rowSpan="2">Jr. Waiviness</th>
              <th rowSpan="2">BD Make</th>
              <th rowSpan="2">BD Size</th>
              <th rowSpan="2">End Hole</th>
              <th rowSpan="2">Brg Remain Life</th>
              <th rowSpan="2">Brg Make</th>
              <th rowSpan="2">Brg No.</th>
              <th rowSpan="2">MEP</th>
              <th rowSpan="2">UST Name</th>
              <th rowSpan="2">Fitting Dt.</th>
              <th rowSpan="2">ECA Test</th>
              <th rowSpan="2">Insp. Sign</th>
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Wheel No.</th>
            </tr>
            <tr>
              <th>Dia</th>
              <th>RG</th>
              <th>FLG</th>
              <th>Size</th>
              <th>Oval</th>
              <th>Tap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataFinal.AxleNo}</td>
              <td rowSpan="2">{formDataFinal.ABSide}</td>
              <td colSpan={1}>{formDataFinal.WheelDia}</td>
              <td colSpan={1}>{formDataFinal.WheelRG}</td>
              <td colSpan={1}>{formDataFinal.WheelFLG}</td>
              <td rowSpan="2">{formDataFinal.FC}</td>
              <td colSpan={1}>{formDataFinal.Size}</td>
              <td colSpan={1}>{formDataFinal.Oval}</td>
              <td colSpan={1}>{formDataFinal.Tap}</td>
              <td rowSpan="2">{formDataFinal.ShoulderSize}</td>
              <td rowSpan="2">{formDataFinal.JrWaiviness}</td>
              <td rowSpan="2">{formDataFinal.BDMake}</td>
              <td rowSpan="2">{formDataFinal.BDSize}</td>
              <td rowSpan="2">{formDataFinal.EndHole}</td>
              <td rowSpan="2">{formDataFinal.BRGRemainLife}</td>
              <td rowSpan="2">{formDataFinal.BRGMake}</td>
              <td rowSpan="2">{formDataFinal.BRGNo}</td>
              <td rowSpan="2">{formDataFinal.MEP}</td>
              <td rowSpan="2">{formDataFinal.USTName}</td>
              <td rowSpan="2">{formDataFinal.FittingDt}</td>
              <td rowSpan="2">{formDataFinal.ECATest}</td>
              <td rowSpan="2">{formDataFinal.InspectorSign}</td>
              <td rowSpan="2">{formDataFinal.Shift}</td>
              <td rowSpan="2">{formDataFinal.WheelNo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitFinal;
