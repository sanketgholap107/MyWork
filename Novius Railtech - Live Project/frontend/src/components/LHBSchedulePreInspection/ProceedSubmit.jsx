import React from "react";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmit = ({ formData, setFormData }) => {
  console.log("formdata:",formData);
  
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/prelhb/data", formData);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormData((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId:1,
          DepartmentId: 2,
          WheeltypeId:1,
        }));

        navigate("/viewallentry");
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
      const response = await postData("/prelhb/data", formData);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormData((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId:1,
          DepartmentId: 2,
          WheeltypeId:1,
        }));

        navigate("/LHBSchedulePreInspection/details");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

    // Add header rows
    worksheet.addRow({
      ShopSrNumber: formData.ShopSrNumber,
      AxleNumber: formData.AxleNumber,
      ReceiveDate: formData.ReceiveDate,
      DispatchDate: formData.DispatchDate,
      CoachNumber: formData.CoachNumber,
      DiameterIN: formData.DiameterIN,
      DiameterOUT: formData.DiameterOUT,
      FlageIN: formData.FlageIN,
      FlageOUT: formData.FlageOUT,
      BDMake: formData.BDMake,
      BDSizeIN: formData.BDSizeIN,
      BDSizeOUT: formData.BDSizeOUT,
      RodGaugeIN: formData.RodGaugeIN,
      RodGaugeOUT: formData.RodGaugeOUT,
      SoundTestIN: formData.SoundTestIN,
      SoundTestOUT: formData.SoundTestOUT,
      TypeOfRepair: formData.TypeOfRepair,
      USTName: formData.USTName,
      MatungaRemark: formData.MatungaRemark,
      InspectorSign: formData.InspectorSign,
      DiscParticularA: formData.DiscParticularA,
      DiscParticularB: formData.DiscParticularB,
      CTRBA: formData.CTRBA,
      CTRBB: formData.CTRBB,
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
    saveAs(blob, "LHBSchedulePreInspection.xlsx");
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
        { content: "Shop Sr. No.", rowSpan: 1 },
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

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        formData.ShopSrNumber,
        formData.AxleNumber,
        formData.ReceiveDate,
        formData.DispatchDate,
        formData.CoachNumber,
        formData.DiameterIN,
        formData.DiameterOUT,
        formData.FlageIN,
        formData.FlageOUT,
        formData.BDMake,
        formData.BDSizeIN,
        formData.BDSizeOUT,
        formData.RodGaugeIN,
        formData.RodGaugeOUT,
        formData.SoundTestIN,
        formData.SoundTestOUT,
        formData.TypeOfRepair,
        formData.USTName,
        formData.MatungaRemark,
        formData.InspectorSign,
        formData.DiscParticularA,
        formData.DiscParticularB,
        formData.CTRBA,
        formData.CTRBB,
      ],
    ];
    console.log(tableRows);
    
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
        19: { cellWidth: 40 },
        20: { cellWidth: 30 },
        21: { cellWidth: 30 },
        22: { cellWidth: 30 },
        23: { cellWidth: 30 },
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB Schedule Pre Inspection Report",
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

    doc.save("LHB_SCHEDULE_Pre_Inspection.pdf");
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
    const rows = [
      [
        formData.ShopSrNumber,
        formData.AxleNumber,
        formData.ReceiveDate,
        formData.DispatchDate,
        formData.CoachNumber,
        formData.DiameterIN,
        formData.DiameterOUT,
        formData.FlageIN,
        formData.FlageOUT,
        formData.BDMake,
        formData.BDSizeIN,
        formData.BDSizeOUT,
        formData.RodGaugeIN,
        formData.RodGaugeOUT,
        formData.SoundTestIN,
        formData.SoundTestOUT,
        formData.TypeOfRepair,
        formData.USTName,
        formData.MatungaRemark,
        formData.InspectorSign,
        formData.DiscParticularA,
        formData.DiscParticularB,
        formData.CTRBA,
        formData.CTRBB
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
    link.setAttribute("download", "LHBSchedulePreInspection.csv");
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
          <tbody>
            <tr>
              <td rowSpan="">{formData.ShopSrNumber}</td>
              <td rowSpan="">{formData.ReceiveDate}</td>
              <td rowSpan="2">{formData.CoachNumber}</td>
              <td colSpan={0}>{formData.DiameterIN}</td>
              <td colSpan={0}>{formData.FlageIN}</td>
              <td rowSpan="2">{formData.BDMake}</td>
              <td colSpan={0}>{formData.BDSizeIN}</td>
              <td colSpan={0}>{formData.RodGaugeIN}</td>
              <td rowSpan="">{formData.SoundTestIN}</td>
              <td rowSpan="2">{formData.TypeOfRepair}</td>
              <td rowSpan="2">{formData.USTName}</td>
              <td rowSpan="2">{formData.MatungaRemark}</td>
              <td rowSpan="2">{formData.InspectorSign}</td>
            </tr>
            <tr>
              <td rowSpan="">{formData.AxleNumber}</td>
              <td rowSpan="">{formData.DispatchDate}</td>
              <td colSpan={0}>{formData.DiameterOUT}</td>
              <td colSpan={0}>{formData.FlageOUT}</td>
              <td colSpan={0}>{formData.BDSizeOUT}</td>
              <td rowSpan="">{formData.RodGaugeOUT}</td>
              <td colSpan={0}>{formData.SoundTestOUT}</td>

            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>Disc Particular</th>
              <th colSpan="">A</th>
              <td colSpan="10">{formData.DiscParticularA}</td>

            </tr>
            <tr>
              <th rowSpan="" colSpan="">B</th>
              <td colSpan="10">{formData.DiscParticularB}</td>

            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>CTRB</th>
              <th colSpan="">A</th>
              <td colSpan="10">{formData.CTRBA}</td>

            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="10">{formData.CTRBB}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmit;




