import React from "react";
// import "../../resources/LHB/lhbpressonform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ProceedSubmitPressOn = ({ formDataPressOnLHB, setFormDataPressOnLHB }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/pressonlhb/data", formDataPressOnLHB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOnLHB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 1,
          modifiedBy: "admin",
        }));

        navigate("/viewallentrylhbpresson");
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
      const response = await postData("/pressonlhb/data", formDataPressOnLHB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOnLHB((prevformData) => ({
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
    const worksheet = workbook.addWorksheet("LHBPressOnForm");

    worksheet.getColumn('A').width = 20;
    worksheet.getColumn('B').width = 20;
    worksheet.getColumn('C').width = 20;
    worksheet.getColumn('D').width = 20;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('F').width = 20;
    worksheet.getColumn('G').width = 20;
    worksheet.getColumn('H').width = 20;
    worksheet.getColumn('I').width = 20;
    worksheet.getColumn('J').width = 20;
    worksheet.getColumn('K').width = 20;
    worksheet.getColumn('L').width = 20;
    worksheet.getColumn('M').width = 20;
    worksheet.getColumn('N').width = 20;

    // Headers for Wheel Details
    worksheet.mergeCells('A1:A2');
    worksheet.mergeCells('B1:B2');
    worksheet.mergeCells('C1:C2');

    worksheet.mergeCells('A3:A4');
    worksheet.mergeCells('B3:B4');
    worksheet.mergeCells('C3:C4');
    worksheet.mergeCells('D3:D4');
    worksheet.mergeCells('E3:E4');
    worksheet.mergeCells('F3:F4');
    worksheet.mergeCells('G3:G4');
    worksheet.mergeCells('H3:H4');
    worksheet.mergeCells('I3:I4');
    worksheet.mergeCells('J3:J4');

    worksheet.mergeCells('D9:D10');
    worksheet.mergeCells('E9:E10');
    worksheet.mergeCells('F9:F10');
    worksheet.mergeCells('G9:G10');
    worksheet.mergeCells('H9:H10');
    worksheet.mergeCells(9, 1, 10, 3);

    worksheet.getRow(1).values = [
      "Wheel No.", formDataPressOnLHB.WheelNo,
      "Axle No.", formDataPressOnLHB.AxleNo,

    ];
    worksheet.mergeCells(1, 4, 2, 10);  
    worksheet.getRow(3).values = [
      "ATL No.", formDataPressOnLHB.ATLNo,
      "Wheel Seat Size", formDataPressOnLHB.WheelSeatSize,
      "BD Seat Size", formDataPressOnLHB.BDSeatSize,
      "RA Value", formDataPressOnLHB.RAValue,
      "Operator Name", formDataPressOnLHB.OperatorName
    ];
    // Section for Wheel Disc 'A' Side
    worksheet.addRow([]);
    worksheet.getRow(6).values = [
      "Wheel Disc 'A' Side"
    ];
    worksheet.mergeCells('A6:J6');
    worksheet.getRow(6).alignment = {
      horizontal: "center",
      vertical: "middle",

    };
    worksheet.getRow(1, 2).alignment = {
      horizontal: "center",
      vertical: "middle",

    };
    worksheet.getRow(3, 4).alignment = {
      horizontal: "center",
      vertical: "middle",

    };
    worksheet.getRow(7, 8).alignment = {
      horizontal: "center",
      vertical: "middle",

    };
    worksheet.getRow(9, 10).alignment = {
      horizontal: "center",
      vertical: "middle",

    };
    worksheet.getRow(6).font = { bold: true };
    worksheet.getRow(7).values = [
      "VTL No.", formDataPressOnLHB.WheelDiscAVTLNO,
      "Bore Size By Operator", formDataPressOnLHB.WheelDiscABoreSizeByOperator,
      "RA Value", formDataPressOnLHB.WheelDiscARAValue,
      "Operator Name", formDataPressOnLHB.WheelDiscAOperatorName
    ];
    worksheet.mergeCells('A7:A8');
    worksheet.mergeCells('B7:B8');
    worksheet.mergeCells('C7:C8');
    worksheet.mergeCells('D7:D8');
    worksheet.mergeCells('E7:E8');
    worksheet.mergeCells('F7:F8');
    worksheet.mergeCells('G7:G8');
    worksheet.mergeCells('H7:H8');
    worksheet.getRow(9).values = [
      "A' Bore Size", "", "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "Wheel Disc Particulars",
    ];

    worksheet.getRow(11).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.WheelDiscABWheelSeatSize,
      formDataPressOnLHB.WheelDiscAAllow,
      formDataPressOnLHB.WheelDiscAPressOnPressure,
      formDataPressOnLHB.WheelDiscARDNo,
      formDataPressOnLHB.WheelDiscAWheelDiscParticulars
    ];


    worksheet.getRow(12).values = ["Top", formDataPressOnLHB.WheelDiscATopXAxis, formDataPressOnLHB.WheelDiscATopYAXis];
    worksheet.getRow(13).values = ["Middle", formDataPressOnLHB.WheelDiscAMiddleXAxis, formDataPressOnLHB.WheelDiscAMiddleYAxis];
    worksheet.getRow(14).values = ["Lower", formDataPressOnLHB.WheelDiscALowerXAxis, formDataPressOnLHB.WheelDiscALowerYAxis];
    worksheet.getRow(15).values = ["Avg.", formDataPressOnLHB.WheelDiscAAvgXAxis, formDataPressOnLHB.WheelDiscAAvgYAxis];
    worksheet.mergeCells('D11:D15');
    worksheet.mergeCells('E11:E15');
    worksheet.mergeCells('F11:F15');
    worksheet.mergeCells('G11:G15');
    worksheet.mergeCells('H11:H15');
    // Section for Wheel Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells('A17:J17');
    worksheet.getCell('A17').value = "Wheel Disc 'B' Side";
    worksheet.getCell('A17').font = { bold: true };

    worksheet.getRow(18).values = [
      "VTL No.", formDataPressOnLHB.WheelDiscBVTLNo,
      "Bore Size By Operator", formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
      "RA Value", formDataPressOnLHB.WheelDiscBRAValue,
      "Operator Name", formDataPressOnLHB.WheelDiscBOperatorName
    ];
    worksheet.mergeCells('A18:A19');
    worksheet.mergeCells('B18:B19');
    worksheet.mergeCells('C18:C19');
    worksheet.mergeCells('D18:D19');
    worksheet.mergeCells('E18:E19');
    worksheet.mergeCells('F18:F19');
    worksheet.mergeCells('G18:G19');
    worksheet.mergeCells('H18:H19');

    worksheet.getRow(20).values = [
      "A' Bore Size", "", "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "Wheel Disc Particulars",
    ];
    // worksheet.mergeCells('D6:D10');
    worksheet.getRow(21).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.WheelDiscBBWheelSeatSize,
      formDataPressOnLHB.WheelDiscBAllow,
      formDataPressOnLHB.WheelDiscBPressOnPressure,
      formDataPressOnLHB.WheelDiscBPressOnPressure,
      formDataPressOnLHB.WheelDiscBRDNo,
      formDataPressOnLHB.WheelDiscBWheelDiscParticulars
    ];

    worksheet.getRow(22).values = ["Top", formDataPressOnLHB.WheelDiscBTopXAxis, formDataPressOnLHB.WheelDiscBTopYAxis];
    worksheet.getRow(23).values = ["Middle", formDataPressOnLHB.WheelDiscBMiddleXAxis, formDataPressOnLHB.WheelDiscBMiddleYAxis];
    worksheet.getRow(24).values = ["Lower", formDataPressOnLHB.WheelDiscBLowerXAxis, formDataPressOnLHB.WheelDiscBLowerYAxis];
    worksheet.getRow(25).values = ["Avg.", formDataPressOnLHB.WheelDiscBAvgXAxis, formDataPressOnLHB.WheelDiscBAvgYAxis];
    worksheet.mergeCells('D21:D25');
    worksheet.mergeCells('E21:E25');
    worksheet.mergeCells('F21:F25');
    worksheet.mergeCells('G21:G25');
    worksheet.mergeCells('H21:H25');
    // Section for Brake Disc 'A' Side
    worksheet.addRow([]);
    worksheet.mergeCells('A27:J27');
    worksheet.getCell('A27').value = "Brake Disc 'A' Side";
    worksheet.getCell('A27').font = { bold: true };

    worksheet.getRow(28).values = [
      "A' Bore Size", "", "",
      "B' BD Seat Size (199.230-199.260mm)",
      "C=B-A int Allow (0.230-0.260mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "Brake Disc make & Particulars",
    ];
    worksheet.mergeCells('A20:C20');
    worksheet.getRow(29).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.BrakeDiscABBDSeatSize,
      formDataPressOnLHB.BrakeDiscAAllow,
      formDataPressOnLHB.BrakeDiscAPressOnPressure,
      formDataPressOnLHB.BrakeDiscABDThickness,
      formDataPressOnLHB.BrakeDiscABrakeDiscParticulars
    ];
    // worksheet.mergeCells('D21:D25');

    worksheet.getRow(30).values = ["Top", formDataPressOnLHB.BrakeDiscATopXAxis, formDataPressOnLHB.BrakeDiscATopYAxis];
    worksheet.getRow(31).values = ["Middle", formDataPressOnLHB.BrakeDiscAMiddleXAxis, formDataPressOnLHB.BrakeDiscAMiddleYAxis];
    worksheet.getRow(32).values = ["Lower", formDataPressOnLHB.BrakeDiscALowerXAxis, formDataPressOnLHB.BrakeDiscALowerYAxis];
    worksheet.getRow(33).values = ["Avg.", formDataPressOnLHB.BrakeDiscAAvgXAxis, formDataPressOnLHB.BrakeDiscAAvgYAxis];
    worksheet.mergeCells('A28:C28');
    worksheet.mergeCells('D29:D33');
    worksheet.mergeCells('E29:E33');
    worksheet.mergeCells('F29:F33');
    worksheet.mergeCells('G29:G33');
    worksheet.mergeCells('H29:H33');
    // Section for Brake Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells('A35:J35');
    worksheet.getCell('A35').value = "Brake Disc 'B' Side";
    worksheet.getCell('A35').font = { bold: true };

    worksheet.getRow(36).values = [
      "A' Bore Size", "", "",
      "B' BD Seat Size (199.230-199.260mm)",
      "C=B-A int Allow (0.230-0.260mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "Brake Disc make & Particulars",
    ];
    worksheet.getRow(37).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.BrakeDiscBBBDSeatSize,
      formDataPressOnLHB.BrakeDiscBAllow,
      formDataPressOnLHB.BrakeDiscBPressOnPressure,
      formDataPressOnLHB.BrakeDiscBBDThickness,
      formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars
    ];
    worksheet.getRow(38).values = ["Top", formDataPressOnLHB.BrakeDiscBTopXAxis, formDataPressOnLHB.BrakeDiscBTopYAxis];
    worksheet.getRow(39).values = ["Middle", formDataPressOnLHB.BrakeDiscBMiddleXAxis, formDataPressOnLHB.BrakeDiscBMiddleYAxis];
    worksheet.getRow(40).values = ["Lower", formDataPressOnLHB.BrakeDiscBLowerXAxis, formDataPressOnLHB.BrakeDiscBLowerYAxis];
    worksheet.getRow(41).values = ["Avg.", formDataPressOnLHB.BrakeDiscBAvgXAxis, formDataPressOnLHB.BrakeDiscBAvgYAxis];
    worksheet.mergeCells('A36:C36');
    worksheet.mergeCells('D37:D41');
    worksheet.mergeCells('E37:E41');
    worksheet.mergeCells('F37:F41');
    worksheet.mergeCells('G37:G41');
    worksheet.mergeCells('H37:H41');
    
    worksheet.getRow(45).values = ["M/C No.", formDataPressOnLHB.MCNo,
      "","Operator",formDataPressOnLHB.Operator,
      "","Inspector",formDataPressOnLHB.Inspector];

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          wrapText: true,
          horizontal: 'center',
          vertical: 'middle'
        };
      });
    });
   
  //Bold Text

  worksheet.getCell('A1').font = { bold: true };
  worksheet.getCell('C1').font = { bold: true };
  worksheet.getCell('A3').font = { bold: true };
    worksheet.getCell('C3').font = { bold: true };
    worksheet.getCell('E3').font = { bold: true };
    worksheet.getCell('G3').font = { bold: true };
    worksheet.getCell('I3').font = { bold: true };
    worksheet.getCell('A7').font = { bold: true };
    worksheet.getCell('C7').font = { bold: true };
    worksheet.getCell('E7').font = { bold: true };
    worksheet.getCell('G7').font = { bold: true };
    worksheet.getCell('A9').font = { bold: true };
    worksheet.getCell('D9').font = { bold: true };
    worksheet.getCell('E9').font = { bold: true };
    worksheet.getCell('F9').font = { bold: true };
    worksheet.getCell('G9').font = { bold: true };
    worksheet.getCell('H9').font = { bold: true };
    worksheet.getCell('A11').font = { bold: true };
    worksheet.getCell('B11').font = { bold: true };
    worksheet.getCell('C11').font = { bold: true };
    worksheet.getCell('A12').font = { bold: true };
    worksheet.getCell('A13').font = { bold: true };
    worksheet.getCell('A14').font = { bold: true };
    worksheet.getCell('A15').font = { bold: true };
    worksheet.getCell('A17').font = { bold: true };
    worksheet.getCell('A18').font = { bold: true };
    worksheet.getCell('C18').font = { bold: true };
    worksheet.getCell('E18').font = { bold: true };
    worksheet.getCell('G18').font = { bold: true };
    worksheet.getCell('A20').font = { bold: true };
    worksheet.getCell('D20').font = { bold: true };
    worksheet.getCell('E20').font = { bold: true };
    worksheet.getCell('F20').font = { bold: true };
    worksheet.getCell('G20').font = { bold: true };
    worksheet.getCell('H20').font = { bold: true };
    worksheet.getCell('A21').font = { bold: true };
    worksheet.getCell('B21').font = { bold: true };
    worksheet.getCell('C21').font = { bold: true };
    worksheet.getCell('A22').font = { bold: true };
    worksheet.getCell('A23').font = { bold: true };
    worksheet.getCell('A24').font = { bold: true };
    worksheet.getCell('A25').font = { bold: true };
    worksheet.getCell('A27').font = { bold: true };
    worksheet.getCell('A28').font = { bold: true };
    worksheet.getCell('D28').font = { bold: true };
    worksheet.getCell('E28').font = { bold: true };
    worksheet.getCell('F28').font = { bold: true };
    worksheet.getCell('G28').font = { bold: true };
    worksheet.getCell('H28').font = { bold: true };
    worksheet.getCell('A29').font = { bold: true };
    worksheet.getCell('B29').font = { bold: true };
    worksheet.getCell('C29').font = { bold: true };
    worksheet.getCell('A30').font = { bold: true };
    worksheet.getCell('A31').font = { bold: true };
    worksheet.getCell('A32').font = { bold: true };
    worksheet.getCell('A33').font = { bold: true };
    worksheet.getCell('A35').font = { bold: true };
    worksheet.getCell('A36').font = { bold: true };
    worksheet.getCell('D36').font = { bold: true };
    worksheet.getCell('E36').font = { bold: true };
    worksheet.getCell('F36').font = { bold: true };
    worksheet.getCell('G36').font = { bold: true };
    worksheet.getCell('H36').font = { bold: true };
    worksheet.getCell('A37').font = { bold: true };
    worksheet.getCell('B37').font = { bold: true };
    worksheet.getCell('C37').font = { bold: true };
    worksheet.getCell('A38').font = { bold: true };
    worksheet.getCell('A39').font = { bold: true };
    worksheet.getCell('A40').font = { bold: true };
    worksheet.getCell('A41').font = { bold: true };
    worksheet.getCell('A45').font = { bold: true };
    worksheet.getCell('D45').font = { bold: true };
    worksheet.getCell('G45').font = { bold: true };


  
    
    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "LHBPressOnForm.xlsx");
  };

  // const exportToPDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //     unit: "pt",
  //     format: "a4",
  //   });
  
  //   // Table headers
  //   const tableColumn = [
  //     [
  //       { content: "Wheel No.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelNo, colSpan: 2 },
  //       { content: "Axle No.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.AxleNo, colSpan: 6 },
  //     ],
  //     [
  //       { content: "ATL No.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.ATLNo, rowSpan: 1 },
  //       { content: "Wheel Seat Size", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelSeatSize, rowSpan: 1 },
  //       { content: "BD Seat Size", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BDSeatSize, rowSpan: 1 },
  //       { content: "RA Value(1.6 Max)", rowSpan: 1 },
  //       { content: formDataPressOnLHB.RAValue, rowSpan: 1 },
  //       { content: "Operator Name", rowSpan: 1 },
  //       { content: formDataPressOnLHB.OperatorName, rowSpan: 1 },
  //     ],
  //     [{ content: "Wheel Disc 'A' Side", colSpan: 10 }],
  //     [
  //       { content: "VTL No.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscAVTLNO, rowSpan: 1 },
  //       { content: "Bore Size By Operator", colSpan: 2 },
  //       { content: formDataPressOnLHB.WheelDiscABoreSizeByOperator, rowSpan: 1 },
  //       { content: "RA Value", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscARAValue, rowSpan: 1 },
  //       { content: "Operator Name", colSpan: 2 },
  //       { content: formDataPressOnLHB.WheelDiscAOperatorName, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
  //       { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 2 },
  //       { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 2 },
  //       { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 2 },
  //       { content: "RD No.", rowSpan: 2 },
  //       { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 2 },
  //     ],
      
  //     [
  //       { content: "Insp.", rowSpan: 1 ,colSpan:1},
  //       { content: "X-axis", rowSpan: 1,colSpan: 1 },
  //       { content: "Y-axis", rowSpan: 1,colSpan: 1 },
  //     ],
      
  //     [
  //       { content: "Top", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscATopXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscATopYAXis, rowSpan: 1 },
  //       {
  //         content: formDataPressOnLHB.WheelDiscABWheelSeatSize,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //       { content: formDataPressOnLHB.WheelDiscAAllow, rowSpan: 4 },
  //       { content: formDataPressOnLHB.WheelDiscAPressOnPressure, rowSpan: 4 },
  //       { content: formDataPressOnLHB.WheelDiscARDNo, rowSpan: 4 },
  //       {
  //         content: formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //     ],
  //     [
  //       { content: "Middle", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscAMiddleXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscAMiddleYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Lower", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscALowerXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscALowerYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Avg.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscAAvgXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscAAvgYAxis, rowSpan: 1 },
  //     ],
  //     [{ content: "Wheel Disc 'B' Side", colSpan: 10 }],
  //     [
  //       { content: "VTL No.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBVTLNo, rowSpan: 1 },
  //       { content: "Bore Size By Operator", colSpan: 2 },
  //       { content: formDataPressOnLHB.WheelDiscBBoreSizeByOperator, rowSpan: 1 },
  //       { content: "RA Value", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBRAValue, rowSpan: 1 },
  //       { content: "Operator Name", colSpan: 2 },
  //       { content: formDataPressOnLHB.WheelDiscBOperatorName, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
  //       { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 3 },
  //       { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 3 },
  //       { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
  //       { content: "RD No.", rowSpan: 3 },
  //       { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 3 },
  //     ],
      
  //     [
  //       { content: "Insp.", rowSpan: 1,colSpan: 1 },
  //       { content: "X-axis", rowSpan: 1,colSpan: 1 },
  //       { content: "Y-axis", rowSpan: 1 ,colSpan: 1},
  //     ],
  //     [
  //       { content: "Top", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBTopXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBTopYAxis, rowSpan: 1 },
  //       {
  //         content: formDataPressOnLHB.WheelDiscBBWheelSeatSize,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //       { content: formDataPressOnLHB.WheelDiscBAllow, rowSpan: 4 },
  //       { content: formDataPressOnLHB.WheelDiscBPressOnPressure, rowSpan: 4 },
  //       { content: formDataPressOnLHB.WheelDiscBRDNo, rowSpan: 4 },
  //       {
  //         content: formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //     ],
  //     [
  //       { content: "Middle", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBMiddleXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBMiddleYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Lower", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBLowerXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBLowerYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Avg.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBAvgXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.WheelDiscBAvgYAxis, rowSpan: 1 },
  //     ],
  //     [{ content: "Brake Disc 'A' Side", colSpan: 10 }],
  //     [
  //       { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
  //       { content: "B' BD Seat Size(199.230-199.260)mm", colSpan: 2, rowSpan: 3 },
  //       { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 3 },
  //       { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
  //       { content: "BD Thickness", rowSpan: 3 },
  //       { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 3 },
  //     ],
      
  //     [
  //       { content: "Insp.", rowSpan: 1 ,colSpan: 1},
  //       { content: "X-axis", rowSpan: 1 ,colSpan: 1},
  //       { content: "Y-axis", rowSpan: 1 ,colSpan: 1},
  //     ],
  //     [
  //       { content: "Top", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscATopXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscATopYAxis, rowSpan: 1 },
  //       {
  //         content: formDataPressOnLHB.BrakeDiscABBDSeatSize,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //       { content: formDataPressOnLHB.BrakeDiscAAllow, rowSpan: 4 },
  //       { content: formDataPressOnLHB.BrakeDiscAPressOnPressure, rowSpan: 4 },
  //       { content: formDataPressOnLHB.BrakeDiscABDThickness, rowSpan: 4 },
  //       {
  //         content: formDataPressOnLHB.BrakeDiscABrakeDiscParticulars,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //     ],
  //     [
  //       { content: "Middle", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscAMiddleXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscAMiddleYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Lower", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscALowerXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscALowerYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Avg.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscAAvgXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscAAvgYAxis, rowSpan: 1 },
  //     ],
  //     [{ content: "Brake Disc 'B' Side", colSpan: 10 }],
  //     [
  //       { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
  //       { content: "B' BD Seat Size(199.230-199.260)mm", colSpan: 2, rowSpan: 3 },
  //       { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 3 },
  //       { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
  //       { content: "BD Thickness", rowSpan: 3 },
  //       { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 3 },
  //     ],
      
  //     [
  //       { content: "Insp.", rowSpan: 1, colSpan: 1 },
  //       { content: "X-axis", rowSpan: 1 ,colSpan: 1},  
  //       { content: "Y-axis", rowSpan: 1 ,colSpan: 1},
  //     ],
  //     [
  //       { content: "Top", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBTopXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBTopYAxis, rowSpan: 1 },
  //       {
  //         content: formDataPressOnLHB.BrakeDiscBBBDSeatSize,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //       { content: formDataPressOnLHB.BrakeDiscBAllow, rowSpan: 4 },
  //       { content: formDataPressOnLHB.BrakeDiscBPressOnPressure, rowSpan: 4 },
  //       { content: formDataPressOnLHB.BrakeDiscBBDThickness, rowSpan: 4 },
  //       {
  //         content: formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars,
  //         colSpan: 2,
  //         rowSpan: 4,
  //       },
  //     ],
  //     [
  //       { content: "Middle", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBMiddleXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBMiddleYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Lower", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBLowerXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBLowerYAxis, rowSpan: 1 },
  //     ],
  //     [
  //       { content: "Avg.", rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBAvgXAxis, rowSpan: 1 },
  //       { content: formDataPressOnLHB.BrakeDiscBAvgYAxis, rowSpan: 1 },
  //     ],
  //   ];
  
  //   // Generate the table
  //   doc.autoTable({
  //     head: tableColumn,
  //       // body: tableRows,
  //       // startX: 10,
  //       // startY: 30,
  //       tableWidth: "auto", // Automatically adjusts the width to fit the page
  //       // tableHeight: doc.internal.pageSize.getHeight() - 20,
  //       theme: "grid",
  
  //       headStyles: {
  //         fillColor: [0, 0, 0], // Color for the table header
  //         halign: "center",
  //         valign: "middle",
  //         fontSize: 8, // Adjusted to fit more content
  //         cellPadding: 3,
  //       },
  //       styles: {
  //         overflow: "linebreak", // Wrap text in cells
  //         fontSize: 7, // Adjust font size to reduce the table width
  //         cellWidth: "wrap", // Allow cells to wrap text
  //         halign: "center",
  //         valign: "middle",
  //         lineColor: [0, 0, 0], // Black borders
  //       lineWidth: 1, // Border thickness  
  //       },
      
        
  //       didParseCell: (data) => {
  //         const whiteCells = [
  //             [0, 1], [0, 4], [1, 1], [1, 3], [1, 5], [1, 7], [1, 9],
  //             [3, 1], [3, 4], [3, 6], [3, 9], [6, 1],[7, 1], [7, 2], [7, 3], 
  //             [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 1], 
  //             [8, 2], [9, 1], [9, 2], [10, 1], [10, 2], [12, 1], [12, 4], 
  //             [12, 6], [12, 8], [12, 9], [16, 1], [16, 2], [16, 3], [16, 4], 
  //             [16, 5], [16, 6], [16, 7], [16, 8], [17, 1], [17, 2], [18, 1], 
  //             [18, 2], [19, 1], [19, 2], [24, 1], [24, 2], [24, 3], [24, 4], 
  //             [24, 5], [24, 6], [24, 7], [24, 8], [25, 1], [25, 2], [26, 1], 
  //             [26, 2], [27, 1], [27, 2], [32, 1], [32, 2], [32, 3], [32, 4], 
  //             [32, 5], [32, 6], [32, 7], [32, 8], [33, 1], [33, 2], [34, 1], 
  //             [34, 2], [35, 1], [35, 2],[7, 0]
  //         ];
      
  //         const grayCell = (data.row.index === 2 && data.column.index === 1);
      
  //         if (grayCell) {
  //             data.cell.styles.fillColor = [242, 242, 242]; // Gray background
  //             data.cell.styles.textColor = [255, 255, 255]; // White text
  //         } else if (whiteCells.some(([row, col]) => data.row.index === row && data.column.index === col)) {
  //             data.cell.styles.fillColor = [255, 255, 255]; // White background
  //             data.cell.styles.textColor = [0, 0, 0]; // Black text
  //         }
  //     },
      
  //       columnStyles: {
  //         0: {cellWidth: 10 }, // White background for the first column
  //         1: { cellWidth: 10}, // White background for the second column
  //         2: { cellWidth: 10}, // Black background for the third column
    
  //         // 0:  { cellWidth: 10 },
  //   // 1:  { cellWidth: 10 },
  //   // 2:  { cellWidth: 10 },
  //   3:  { cellWidth: 10 },
  //   4:  { cellWidth: 10 },
  //   5:  { cellWidth: 10 },
  //   6:  { cellWidth: 10 },
  //   7:  { cellWidth: 10 },
  //   8:  { cellWidth: 10 },
  //   9:  { cellWidth: 10 },
  //   10: { cellWidth: 10 },
  //   11: { cellWidth: 10 },
  //   12: { cellWidth: 10 },
  //   13: { cellWidth: 10 },
  //   14: { cellWidth: 10 },
  //   15: { cellWidth: 10 },
  //   16: { cellWidth: 10 },
  //   17: { cellWidth: 10 },
  //   18: { cellWidth: 10 },
  //   19: { cellWidth: 10 },
  //   20: { cellWidth: 10 },
  //   21: { cellWidth: 10 },
  //   22: { cellWidth: 10 },
  //   23: { cellWidth: 10 },
  //   24: { cellWidth: 10 },
  //   25: { cellWidth: 10 },
  //   26: { cellWidth: 10 },
  //   27: { cellWidth: 10 },
  //   28: { cellWidth: 10 },
  //   29: { cellWidth: 10 },
  //   30: { cellWidth: 10 },
  //   31: { cellWidth: 10 },
  //   32: { cellWidth: 10 },
  //   33: { cellWidth: 10 },
  //   34: { cellWidth: 10 },
  //   35: { cellWidth: 10 },
  //   36: { cellWidth: 10 },
  //   37: { cellWidth: 10 },
  //   38: { cellWidth: 10 },
  //   39: { cellWidth: 10 },
  //   40: { cellWidth: 10 },
  //   41: { cellWidth: 10 },
  //   42: { cellWidth: 10 },
  //   43: { cellWidth: 10 },
  //   44: { cellWidth: 10 },
  //   45: { cellWidth: 10 },
  //   46: { cellWidth: 10 },
  //   47: { cellWidth: 10 },
  //   48: { cellWidth: 10 },
  //   49: { cellWidth: 10 },
  //   50: { cellWidth: 10 },
  //   51: { cellWidth: 10 },
  //   52: { cellWidth: 10 },
  //   53: { cellWidth: 10 },
  //   54: { cellWidth: 10 },
  //   55: { cellWidth: 10 },
  //   56: { cellWidth: 10 },
  //   57: { cellWidth: 10 },
  //   58: { cellWidth: 10 },
  //   59: { cellWidth: 10 },
  //   60: { cellWidth: 10 },
  //   61: { cellWidth: 10 },
  //   62: { cellWidth: 10 },
  //   63: { cellWidth: 10 },
  //   64: { cellWidth: 10 },
  //   65: { cellWidth: 10 },
  //   66: { cellWidth: 10 },
    
  //       },
  //     margin: { top: 10 }, // Adjusted margins
  //       didDrawPage: (data) => {
  //         // Add a title on the first page
  //         // if (data.pageNumber === 1) {
  //           // doc.setFontSize(12);
            
  //           // doc.text(
  //           //   "LHB Final Inspection Report",
  //           //   data.settings.margin.left,
  //           //   20
  //           // );
  //         // }
  //       },
  //   });
  //   const totalPages = doc.internal.getNumberOfPages();
  
  //   // Add page numbers
  //   for (let i = 1; i <= totalPages; i++) {
  //     doc.setPage(i);
  //     const pageSize = doc.internal.pageSize;
  //     const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  //     const pageHeight = pageSize.height
  //       ? pageSize.height
  //       : pageSize.getHeight();
  //     doc.setFontSize(10);
  //     const pageNumber = `Page ${i} of ${totalPages}`;
  //     doc.text(pageNumber, pageWidth - 50, pageHeight - 10);
  //   }  
  //   doc.save("table.pdf");
  // };  



  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel No",
      "Axle No",
      "ATL No",
      "Wheel Seat Size",
      "BD Seat Size",
      "RA Value",
      "Operator Name",
      "Wheel Disc A VTL NO",
      "Wheel Disc A Bore Size By Operator",
      "Wheel Disc A RA Value",
      "Wheel Disc A Operator Name",
      "Wheel Disc A B' Wheel Seat Size",
      "Wheel Disc A Allow",
      "Wheel Disc A Press On Pressure",
      "Wheel Disc A RD No",
      "Wheel Disc A Wheel Disc Particulars",
      "Wheel Disc A Top X Axis",
      "Wheel Disc A Top Y Axis",
      "Wheel Disc A Middle X Axis",
      "Wheel Disc A Middle Y Axis",
      "Wheel Disc A Lower X Axis",
      "Wheel Disc A Lower Y Axis",
      "Wheel Disc A Avg X Axis",
      "Wheel Disc A Avg Y Axis",
      "Wheel Disc B VTL No",
      "Wheel Disc B Bore Size By Operator",
      "Wheel Disc B RA Value",
      "Wheel Disc B Operator Name",
      "Wheel Disc B A' Bore Size",
      "Wheel Disc B B Wheel Seat Size",
      "Wheel Disc B Allow",
      "Wheel Disc B Press On Pressure",
      "Wheel Disc B RD No",
      "Wheel Disc B Wheel Disc Particulars",
      "Wheel Disc B Top X Axis",
      "Wheel Disc B Top Y Axis",
      "Wheel Disc B Middle X Axis",
      "Wheel Disc B Middle Y Axis",
      "Wheel Disc B Lower X Axis",
      "Wheel Disc B Lower Y Axis",
      "Wheel Disc B Avg X Axis",
      "Wheel Disc B Avg Y Axis",
      "Brake Disc A B' BD Seat Size",
      "Brake Disc A Allow",
      "Brake Disc A Press On Pressure",
      "Brake Disc A BD Thickness",
      "Brake Disc A Brake Disc Particulars",
      "Brake Disc A Top X Axis",
      "Brake Disc A Top Y Axis",
      "Brake Disc A Middle X Axis",
      "Brake Disc A Middle Y Axis",
      "Brake Disc A Lower X Axis",
      "Brake Disc A Lower Y Axis",
      "Brake Disc A Avg X Axis",
      "Brake Disc A Avg Y Axis",
      "Brake Disc B B' BD Seat Size",
      "Brake Disc B Allow",
      "Brake Disc B Press On Pressure",
      "Brake Disc B BD Thickness",
      "Brake Disc B Brake Disc Particulars",
      "Brake Disc B Top X Axis",
      "Brake Disc B Top Y Axis",
      "Brake Disc B Middle X Axis",
      "Brake Disc B Middle Y Axis",
      "Brake Disc B Lower X Axis",
      "Brake Disc B Lower Y Axis",
      "Brake Disc B Avg X Axis",
      "Brake Disc B Avg Y Axis",
      "MC No",
      "Operator",
      "Inspector",

    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataPressOnLHB.WheelNo,
        formDataPressOnLHB.AxleNo,
        formDataPressOnLHB.ATLNo,
        formDataPressOnLHB.WheelSeatSize,
        formDataPressOnLHB.BDSeatSize,
        formDataPressOnLHB.RAValue,
        formDataPressOnLHB.OperatorName,
        formDataPressOnLHB.WheelDiscAVTLNO,
        formDataPressOnLHB.WheelDiscABoreSizeByOperator,
        formDataPressOnLHB.WheelDiscARAValue,
        formDataPressOnLHB.WheelDiscAOperatorName,
        formDataPressOnLHB.WheelDiscABWheelSeatSize,
        formDataPressOnLHB.WheelDiscAAllow,
        formDataPressOnLHB.WheelDiscAPressOnPressure,
        formDataPressOnLHB.WheelDiscARDNo,
        formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
        formDataPressOnLHB.WheelDiscATopXAxis,
        formDataPressOnLHB.WheelDiscATopYAXis,
        formDataPressOnLHB.WheelDiscAMiddleXAxis,
        formDataPressOnLHB.WheelDiscAMiddleYAxis,
        formDataPressOnLHB.WheelDiscALowerXAxis,
        formDataPressOnLHB.WheelDiscALowerYAxis,
        formDataPressOnLHB.WheelDiscAAvgXAxis,
        formDataPressOnLHB.WheelDiscAAvgYAxis,
        formDataPressOnLHB.WheelDiscBVTLNo,
        formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
        formDataPressOnLHB.WheelDiscBRAValue,
        formDataPressOnLHB.WheelDiscBOperatorName,
        formDataPressOnLHB.WheelDiscBBWheelSeatSize,
        formDataPressOnLHB.WheelDiscBAllow,
        formDataPressOnLHB.WheelDiscBPressOnPressure,
        formDataPressOnLHB.WheelDiscBRDNo,
        formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
        formDataPressOnLHB.WheelDiscBTopXAxis,
        formDataPressOnLHB.WheelDiscBTopYAxis,
        formDataPressOnLHB.WheelDiscBMiddleXAxis,
        formDataPressOnLHB.WheelDiscBMiddleYAxis,
        formDataPressOnLHB.WheelDiscBLowerXAxis,
        formDataPressOnLHB.WheelDiscBLowerYAxis,
        formDataPressOnLHB.WheelDiscBAvgXAxis,
        formDataPressOnLHB.WheelDiscBAvgYAxis,
        formDataPressOnLHB.BrakeDiscABBDSeatSize,
        formDataPressOnLHB.BrakeDiscAAllow,
        formDataPressOnLHB.BrakeDiscAPressOnPressure,
        formDataPressOnLHB.BrakeDiscABDThickness,
        formDataPressOnLHB.BrakeDiscABrakeDiscParticulars,
        formDataPressOnLHB.BrakeDiscATopXAxis,
        formDataPressOnLHB.BrakeDiscATopYAxis,
        formDataPressOnLHB.BrakeDiscAMiddleXAxis,
        formDataPressOnLHB.BrakeDiscAMiddleYAxis,
        formDataPressOnLHB.BrakeDiscALowerXAxis,
        formDataPressOnLHB.BrakeDiscALowerYAxis,
        formDataPressOnLHB.BrakeDiscAAvgXAxis,
        formDataPressOnLHB.BrakeDiscAAvgYAxis,
        formDataPressOnLHB.BrakeDiscBBBDSeatSize,
        formDataPressOnLHB.BrakeDiscBAllow,
        formDataPressOnLHB.BrakeDiscBPressOnPressure,
        formDataPressOnLHB.BrakeDiscBBDThickness,
        formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars,
        formDataPressOnLHB.BrakeDiscBTopXAxis,
        formDataPressOnLHB.BrakeDiscBTopYAxis,
        formDataPressOnLHB.BrakeDiscBMiddleXAxis,
        formDataPressOnLHB.BrakeDiscBMiddleYAxis,
        formDataPressOnLHB.BrakeDiscBLowerXAxis,
        formDataPressOnLHB.BrakeDiscBLowerYAxis,
        formDataPressOnLHB.BrakeDiscBAvgXAxis,
        formDataPressOnLHB.BrakeDiscBAvgYAxis,
        formDataPressOnLHB.MCNo,
        formDataPressOnLHB.Operator,
        formDataPressOnLHB.Inspector,
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
    link.setAttribute("download", "LHBPressOnForm.csv");
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
        <button className="green-button" onClick={""}>
          Export To PDF
        </button>
        <button className="green-button" onClick={exportToCSV}>
          Export To CSV
        </button>
      </div>
      <div id="table-container">
        <table>
          <thead >
            <tr>
              <th>Wheel No.</th>
              <td colSpan={2}>{formDataPressOnLHB.WheelNo}</td>
              <th>Axle No.</th>
              <td colSpan={6}>{formDataPressOnLHB.AxleNo}</td>
            </tr>
            <tr>
              <th>ATL No.</th>
              <td>{formDataPressOnLHB.ATLNo}</td>
              <th>Wheel Seat Size</th>
              <td>{formDataPressOnLHB.WheelSeatSize}</td>
              <th>BD Seat Size</th>
              <td>{formDataPressOnLHB.BDSeatSize}</td>
              <th>RA Value(1.6 Max)</th>
              <td>{formDataPressOnLHB.RAValue}</td>
              <th>Operator Name</th>
              <td>{formDataPressOnLHB.OperatorName}</td>
            </tr>


            {/* WHEEL DISC A */}
            <tr>
              <th colSpan={10}>Wheel Disc 'A' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{formDataPressOnLHB.WheelDiscAVTLNO}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{formDataPressOnLHB.WheelDiscABoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{formDataPressOnLHB.WheelDiscARAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{formDataPressOnLHB.WheelDiscAOperatorName}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>A' Bore Size</th>
              <th rowSpan="3" colSpan={2}>B' Wheel Seat Size(192-195)mm</th>
              <th rowSpan="3" colSpan={1}>C=B-A int Allow(0.240-0.300)mm</th>
              <th rowSpan="3" colSpan={1}>Press-On Pressure in Ton(69T-109T)</th>
              <th rowSpan="3" colSpan={1}>RD No.</th>
              <th rowSpan="3" colSpan={2}>Wheel Disc Particulars</th>
            </tr>

            <tr>
            </tr>
            <tr>
              <th >Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.WheelDiscATopXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.WheelDiscABWheelSeatSize}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscAAllow}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscAPressOnPressure}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscARDNo}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.WheelDiscAWheelDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.WheelDiscAMiddleXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscAMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.WheelDiscALowerXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.WheelDiscAAvgXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscAAvgYAxis}</td>
            </tr>
            <br></br>


            {/* WHEEL DISC B */}
            <tr>
              <th colSpan={10}>Wheel Disc 'B' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{formDataPressOnLHB.WheelDiscBVTLNo}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{formDataPressOnLHB.WheelDiscBBoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{formDataPressOnLHB.WheelDiscBRAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{formDataPressOnLHB.WheelDiscBOperatorName}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>A' Bore Size</th>
              <th rowSpan="3" colSpan={2}>B' Wheel Seat Size(192-195)mm</th>
              <th rowSpan="3" colSpan={1}>C=B-A int Allow(0.240-0.300)mm</th>
              <th rowSpan="3" colSpan={1}>Press-On Pressure in Ton(69T-109T)</th>
              <th rowSpan="3" colSpan={1}>RD No.</th>
              <th rowSpan="3" colSpan={2}>Wheel Disc Particulars</th>
            </tr>

            <tr>
            </tr>
            <tr>
              <th >Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.WheelDiscBTopXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.WheelDiscBBWheelSeatSize}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscBAllow}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscBPressOnPressure}</td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscBRDNo}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.WheelDiscBWheelDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.WheelDiscBMiddleXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.WheelDiscBLowerXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.WheelDiscBAvgXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBAvgYAxis}</td>
            </tr>

            <br />
            {/* BRAKE DISC A */}
            <tr>
              <th colSpan={10}>Brake Disc 'A' Side</th>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>A' Bore Size</th>
              <th rowSpan="3" colSpan={2}>B' BD Seat Size(199.230-199.260)mm</th>
              <th rowSpan="3" colSpan={1}>C=B-A int Allow(0.230-0.260)mm</th>
              <th rowSpan="3" colSpan={1}>Press-On Pressure in Ton(69T-109T)</th>
              <th rowSpan="3" colSpan={1}>BD Thickness</th>
              <th rowSpan="3" colSpan={2}>Brake Disc make & Particulars</th>
            </tr>

            <tr>
            </tr>
            <tr>
              <th >Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.BrakeDiscATopXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.BrakeDiscABBDSeatSize}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscAAllow}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscAPressOnPressure}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscABDThickness}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.BrakeDiscABrakeDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.BrakeDiscAMiddleXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscAMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.BrakeDiscALowerXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.BrakeDiscAAvgXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscAAvgYAxis}</td>
            </tr>
            <br></br>

            {/* Brake DISC B  */}
            <tr>
              <th colSpan={10}>Brake Disc 'B' Side</th>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>A' Bore Size</th>
              <th rowSpan="3" colSpan={2}>B' BD Seat Size(199.230-199.260)mm</th>
              <th rowSpan="3" colSpan={1}>C=B-A int Allow(0.230-0.260)mm</th>
              <th rowSpan="3" colSpan={1}>Press-On Pressure in Ton(69T-109T)</th>
              <th rowSpan="3" colSpan={1}>BD Thickness</th>
              <th rowSpan="3" colSpan={2}>Brake Disc make & Particulars</th>
            </tr>

            <tr>
            </tr>
            <tr>
              <th >Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.BrakeDiscBTopXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.BrakeDiscBBBDSeatSize}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscBAllow}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscBPressOnPressure}</td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscBBDThickness}</td>
              <td rowSpan={4} colSpan={2}>{formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.BrakeDiscBMiddleXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.BrakeDiscBLowerXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.BrakeDiscBAvgXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBAvgYAxis}</td>
            </tr>

          </thead><br></br>
          <div className="footer">
          <div>
        <b>  M/C No. : </b>{formDataPressOnLHB.MCNo}
        </div>

        <div>
        <b>  Operator : </b>{formDataPressOnLHB.Operator}
        </div>

        <div>
        <b>  Inspector : </b>{formDataPressOnLHB.Inspector}
        </div>

        </div>
          <tbody>

          </tbody>
        </table>




      </div>
    </div>
  );
};

export default ProceedSubmitPressOn;




