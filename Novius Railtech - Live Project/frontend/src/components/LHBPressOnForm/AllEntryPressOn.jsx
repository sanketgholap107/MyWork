import React, { useEffect, useState } from "react";
// import "../../resources/LHB/lhbpressonform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryPressOn = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/pressonlhb/getalldata");
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

  // Start row index
  let currentRow = 1;

  data.forEach((formDataPressOnLHB, index) => {
    // Headers for Wheel Details
    worksheet.mergeCells(`A${currentRow}:A${currentRow + 1}`);
    worksheet.mergeCells(`B${currentRow}:B${currentRow + 1}`);
    worksheet.mergeCells(`C${currentRow}:C${currentRow + 1}`);
    worksheet.mergeCells(`A${currentRow+2}:A${currentRow + 3}`);
    worksheet.mergeCells(`B${currentRow+2}:B${currentRow + 3}`);
    worksheet.mergeCells(`C${currentRow+2}:C${currentRow + 3}`);
    worksheet.mergeCells(`D${currentRow + 2}:D${currentRow + 3}`);
    worksheet.mergeCells(`E${currentRow + 2}:E${currentRow + 3}`);
    worksheet.mergeCells(`F${currentRow + 2}:F${currentRow + 3}`);
    worksheet.mergeCells(`G${currentRow + 2}:G${currentRow + 3}`);
    worksheet.mergeCells(`H${currentRow + 2}:H${currentRow + 3}`);
    worksheet.mergeCells(`I${currentRow + 2}:I${currentRow + 3}`);
    worksheet.mergeCells(`J${currentRow + 2}:J${currentRow + 3}`);
    // worksheet.mergeCells(currentRow + 2, 1, currentRow + 3, 3);

    worksheet.getRow(currentRow).values = [
      "Wheel No.", formDataPressOnLHB.WheelNo,
      "Axle No.", formDataPressOnLHB.AxleNo,
    ];
    worksheet.mergeCells(currentRow, 4, currentRow + 1, 10);

    worksheet.getRow(currentRow + 2).values = [
      "ATL No.", formDataPressOnLHB.ATLNo,
      "Wheel Seat Size", formDataPressOnLHB.WheelSeatSize,
      "BD Seat Size", formDataPressOnLHB.BDSeatSize,
      "RA Value", formDataPressOnLHB.RAValue,
      "Operator Name", formDataPressOnLHB.OperatorName,
    ];

    // Section for Wheel Disc 'A' Side
    worksheet.addRow([]);
    worksheet.getRow(currentRow + 5).values = [
      "Wheel Disc 'A' Side"
    ];
    worksheet.getCell(`A${currentRow + 5}`).font = { bold: true };
    worksheet.mergeCells(`A${currentRow + 5}:J${currentRow + 5}`);
    worksheet.getRow(currentRow + 5).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.getRow(currentRow).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(currentRow + 2).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.getRow(currentRow + 6).values = [
      "VTL No.", formDataPressOnLHB.WheelDiscAVTLNO,
      "Bore Size By Operator", formDataPressOnLHB.WheelDiscABoreSizeByOperator,
      "RA Value", formDataPressOnLHB.WheelDiscARAValue,
      "Operator Name", formDataPressOnLHB.WheelDiscAOperatorName
    ];

    worksheet.mergeCells(`A${currentRow + 6}:A${currentRow + 7}`);
    worksheet.mergeCells(`B${currentRow + 6}:B${currentRow + 7}`);
    worksheet.mergeCells(`C${currentRow + 6}:C${currentRow + 7}`);
    worksheet.mergeCells(`D${currentRow + 6}:D${currentRow + 7}`);
    worksheet.mergeCells(`E${currentRow + 6}:E${currentRow + 7}`);
    worksheet.mergeCells(`F${currentRow + 6}:F${currentRow + 7}`);
    worksheet.mergeCells(`G${currentRow + 6}:G${currentRow + 7}`);
    worksheet.mergeCells(`H${currentRow + 6}:H${currentRow + 7}`);
    worksheet.mergeCells(`A${currentRow + 8}:C${currentRow + 9}`);
    worksheet.mergeCells(`D${currentRow + 8}:D${currentRow + 9}`);
    worksheet.mergeCells(`E${currentRow + 8}:E${currentRow + 9}`);
    worksheet.mergeCells(`F${currentRow + 8}:F${currentRow + 9}`);
    worksheet.mergeCells(`G${currentRow + 8}:G${currentRow + 9}`);
    worksheet.mergeCells(`H${currentRow + 8}:H${currentRow + 9}`);
    // worksheet.mergeCells(`${currentRow + 8}`,1,`${currentRow + 9}`,3);

    worksheet.getRow(currentRow + 8).values = [
      "A' Bore Size", "", "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "Wheel Disc Particulars",
    ];

    worksheet.getRow(currentRow + 10).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.WheelDiscABWheelSeatSize,
      formDataPressOnLHB.WheelDiscAAllow,
      formDataPressOnLHB.WheelDiscAPressOnPressure,
      formDataPressOnLHB.WheelDiscARDNo,
      formDataPressOnLHB.WheelDiscAWheelDiscParticulars
    ];

    worksheet.getRow(currentRow + 11).values = ["Top", formDataPressOnLHB.WheelDiscATopXAxis, formDataPressOnLHB.WheelDiscATopYAxis];
    worksheet.getRow(currentRow + 12).values = ["Middle", formDataPressOnLHB.WheelDiscAMiddleXAxis, formDataPressOnLHB.WheelDiscAMiddleYAxis];
    worksheet.getRow(currentRow + 13).values = ["Lower", formDataPressOnLHB.WheelDiscALowerXAxis, formDataPressOnLHB.WheelDiscALowerYAxis];
    worksheet.getRow(currentRow + 14).values = ["Avg.", formDataPressOnLHB.WheelDiscAAvgXAxis, formDataPressOnLHB.WheelDiscAAvgYAxis];

    worksheet.mergeCells(`D${currentRow + 10}:D${currentRow + 14}`);
    worksheet.mergeCells(`E${currentRow + 10}:E${currentRow + 14}`);
    worksheet.mergeCells(`F${currentRow + 10}:F${currentRow + 14}`);
    worksheet.mergeCells(`G${currentRow + 10}:G${currentRow + 14}`);
    worksheet.mergeCells(`H${currentRow + 10}:H${currentRow + 14}`);

    // Section for Wheel Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells(`A${currentRow + 16}:J${currentRow + 16}`);
    worksheet.getCell(`A${currentRow + 16}`).value = "Wheel Disc 'B' Side";
    worksheet.getCell(`A${currentRow + 16}`).font = { bold: true };

    worksheet.getRow(currentRow + 17).values = [
      "VTL No.", formDataPressOnLHB.WheelDiscBVTLNo,
      "Bore Size By Operator", formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
      "RA Value", formDataPressOnLHB.WheelDiscBRAValue,
      "Operator Name", formDataPressOnLHB.WheelDiscBOperatorName
    ];

    worksheet.mergeCells(`A${currentRow + 17}:A${currentRow + 18}`);
    worksheet.mergeCells(`B${currentRow + 17}:B${currentRow + 18}`);
    worksheet.mergeCells(`C${currentRow + 17}:C${currentRow + 18}`);
    worksheet.mergeCells(`D${currentRow + 17}:D${currentRow + 18}`);
    worksheet.mergeCells(`E${currentRow + 17}:E${currentRow + 18}`);
    worksheet.mergeCells(`F${currentRow + 17}:F${currentRow + 18}`);
    worksheet.mergeCells(`G${currentRow + 17}:G${currentRow + 18}`);
    worksheet.mergeCells(`H${currentRow + 17}:H${currentRow + 18}`);

    worksheet.mergeCells(`A${currentRow + 19}:C${currentRow + 20}`);
    worksheet.mergeCells(`D${currentRow + 19}:D${currentRow + 20}`);
    worksheet.mergeCells(`E${currentRow + 19}:E${currentRow + 20}`);
    worksheet.mergeCells(`F${currentRow + 19}:F${currentRow + 20}`);
    worksheet.mergeCells(`G${currentRow + 19}:G${currentRow + 20}`);
    worksheet.mergeCells(`H${currentRow + 19}:H${currentRow + 20}`);

    worksheet.getRow(currentRow + 19).values = [
      "A' Bore Size", "", "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "Wheel Disc Particulars",
    ];

    worksheet.getRow(currentRow + 21).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.WheelDiscBBWheelSeatSize,
      formDataPressOnLHB.WheelDiscBAllow,
      formDataPressOnLHB.WheelDiscBPressOnPressure,
      formDataPressOnLHB.WheelDiscBRDNo,
      formDataPressOnLHB.WheelDiscBWheelDiscParticulars
    ];

    worksheet.getRow(currentRow + 22).values = ["Top", formDataPressOnLHB.WheelDiscBTopXAxis, formDataPressOnLHB.WheelDiscBTopYAxis];
    worksheet.getRow(currentRow + 23).values = ["Middle", formDataPressOnLHB.WheelDiscBMiddleXAxis, formDataPressOnLHB.WheelDiscBMiddleYAxis];
    worksheet.getRow(currentRow + 24).values = ["Lower", formDataPressOnLHB.WheelDiscBLowerXAxis, formDataPressOnLHB.WheelDiscBLowerYAxis];
    worksheet.getRow(currentRow + 25).values = ["Avg.", formDataPressOnLHB.WheelDiscBAvgXAxis, formDataPressOnLHB.WheelDiscBAvgYAxis];

    worksheet.mergeCells(`D${currentRow + 21}:D${currentRow + 25}`);
    worksheet.mergeCells(`E${currentRow + 21}:E${currentRow + 25}`);
    worksheet.mergeCells(`F${currentRow + 21}:F${currentRow + 25}`);
    worksheet.mergeCells(`G${currentRow + 21}:G${currentRow + 25}`);
    worksheet.mergeCells(`H${currentRow + 21}:H${currentRow + 25}`);

    // Section for Brake Disc 'A' Side
    worksheet.addRow([]);
    worksheet.mergeCells(`A${currentRow + 27}:J${currentRow + 29}`);
    worksheet.getCell(`A${currentRow + 27}`).value = "Brake Disc 'A' Side";
    worksheet.getCell(`A${currentRow + 27}`).font = { bold: true };

    
    worksheet.mergeCells(`A${currentRow + 30}:C${currentRow + 31}`);
    worksheet.mergeCells(`D${currentRow + 30}:D${currentRow + 31}`);
    worksheet.mergeCells(`E${currentRow + 30}:E${currentRow + 31}`);
    worksheet.mergeCells(`F${currentRow + 30}:F${currentRow + 31}`);
    worksheet.mergeCells(`G${currentRow + 30}:G${currentRow + 31}`);
    worksheet.mergeCells(`H${currentRow + 30}:H${currentRow + 31}`);

    worksheet.getRow(currentRow + 30).values = [
      "A' Bore Size", "", "",
      "B' BD Seat Size(199.230-199.260)mm",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "Brake Disc make & Particulars",
    ];

    worksheet.getRow(currentRow + 32).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.BrakeDiscABWheelSeatSize,
      formDataPressOnLHB.BrakeDiscAAllow,
      formDataPressOnLHB.BrakeDiscAPressOnPressure,
      formDataPressOnLHB.BrakeDiscARDNo,
      formDataPressOnLHB.BrakeDiscAWheelDiscParticulars
    ];

    worksheet.getRow(currentRow + 33).values = ["Top", formDataPressOnLHB.BrakeDiscATopXAxis, formDataPressOnLHB.BrakeDiscATopYAxis];
    worksheet.getRow(currentRow + 34).values = ["Middle", formDataPressOnLHB.BrakeDiscAMiddleXAxis, formDataPressOnLHB.BrakeDiscAMiddleYAxis];
    worksheet.getRow(currentRow + 35).values = ["Lower", formDataPressOnLHB.BrakeDiscALowerXAxis, formDataPressOnLHB.BrakeDiscALowerYAxis];
    worksheet.getRow(currentRow + 36).values = ["Avg.", formDataPressOnLHB.BrakeDiscAAvgXAxis, formDataPressOnLHB.BrakeDiscAAvgYAxis];

    worksheet.mergeCells(`D${currentRow + 32}:D${currentRow + 36}`);
    worksheet.mergeCells(`E${currentRow + 32}:E${currentRow + 36}`);
    worksheet.mergeCells(`F${currentRow + 32}:F${currentRow + 36}`);
    worksheet.mergeCells(`G${currentRow + 32}:G${currentRow + 36}`);
    worksheet.mergeCells(`H${currentRow + 32}:H${currentRow + 36}`);

    // Section for Brake Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells(`A${currentRow + 38}:J${currentRow + 40}`);
    worksheet.getCell(`A${currentRow + 38}`).value = "Brake Disc 'B' Side";
    worksheet.getCell(`A${currentRow + 38}`).font = { bold: true };

   
    worksheet.mergeCells(`A${currentRow + 41}:C${currentRow + 42}`);
    worksheet.mergeCells(`D${currentRow + 41}:D${currentRow + 42}`);
    worksheet.mergeCells(`E${currentRow + 41}:E${currentRow + 42}`);
    worksheet.mergeCells(`F${currentRow + 41}:F${currentRow + 42}`);
    worksheet.mergeCells(`G${currentRow + 41}:G${currentRow + 42}`);
    worksheet.mergeCells(`H${currentRow + 41}:H${currentRow + 42}`);

    worksheet.getRow(currentRow + 41).values = [
      "A' Bore Size", "", "",
      "B' BD Seat Size(199.230-199.260)mm",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "Brake Disc make & Particulars",
    ];

    worksheet.getRow(currentRow + 43).values = [
      "Insp.", "X-axis", "Y-axis",
      formDataPressOnLHB.BrakeDiscBBWheelSeatSize,
      formDataPressOnLHB.BrakeDiscBAllow,
      formDataPressOnLHB.BrakeDiscBPressOnPressure,
      formDataPressOnLHB.BrakeDiscBRDNo,
      formDataPressOnLHB.BrakeDiscBWheelDiscParticulars
    ];

    worksheet.getRow(currentRow + 44).values = ["Top", formDataPressOnLHB.BrakeDiscBTopXAxis, formDataPressOnLHB.BrakeDiscBTopYAxis];
    worksheet.getRow(currentRow + 45).values = ["Middle", formDataPressOnLHB.BrakeDiscBMiddleXAxis, formDataPressOnLHB.BrakeDiscBMiddleYAxis];
    worksheet.getRow(currentRow + 46).values = ["Lower", formDataPressOnLHB.BrakeDiscBLowerXAxis, formDataPressOnLHB.BrakeDiscBLowerYAxis];
    worksheet.getRow(currentRow + 47).values = ["Avg.", formDataPressOnLHB.BrakeDiscBAvgXAxis, formDataPressOnLHB.BrakeDiscBAvgYAxis];

    worksheet.mergeCells(`D${currentRow + 43}:D${currentRow + 47}`);
    worksheet.mergeCells(`E${currentRow + 43}:E${currentRow + 47}`);
    worksheet.mergeCells(`F${currentRow + 43}:F${currentRow + 47}`);
    worksheet.mergeCells(`G${currentRow + 43}:G${currentRow + 47}`);
    worksheet.mergeCells(`H${currentRow + 43}:H${currentRow + 47}`);

    // Section for M/C No, Operator, Inspector
    worksheet.getRow(currentRow + 50).values = [
      "M/C No.", formDataPressOnLHB.MCNo,
      "", "Operator", formDataPressOnLHB.Operator,
      "", "Inspector", formDataPressOnLHB.Inspector
    ];
//Bold Text Headers

worksheet.getCell(`A${currentRow}`).font = { bold: true };
worksheet.getCell(`C${currentRow}`).font = { bold: true };
worksheet.getCell(`A${currentRow+2}`).font = { bold: true };
worksheet.getCell(`C${currentRow+2}`).font = { bold: true };
worksheet.getCell(`E${currentRow+2}`).font = { bold: true };
worksheet.getCell(`G${currentRow+2}`).font = { bold: true };
worksheet.getCell(`I${currentRow+2}`).font = { bold: true };
worksheet.getCell(`A${currentRow+6}`).font = { bold: true };
worksheet.getCell(`C${currentRow+6}`).font = { bold: true };
worksheet.getCell(`E${currentRow+6}`).font = { bold: true };
worksheet.getCell(`G${currentRow+6}`).font = { bold: true };
worksheet.getCell(`A${currentRow+8}`).font = { bold: true };
worksheet.getCell(`D${currentRow+8}`).font = { bold: true };
worksheet.getCell(`E${currentRow+8}`).font = { bold: true };
worksheet.getCell(`F${currentRow+8}`).font = { bold: true };
worksheet.getCell(`G${currentRow+8}`).font = { bold: true };
worksheet.getCell(`H${currentRow+8}`).font = { bold: true };
worksheet.getCell(`A${currentRow+10}`).font = { bold: true };
worksheet.getCell(`B${currentRow+10}`).font = { bold: true };
worksheet.getCell(`C${currentRow+10}`).font = { bold: true };
worksheet.getCell(`A${currentRow+11}`).font = { bold: true };
worksheet.getCell(`A${currentRow+12}`).font = { bold: true };
worksheet.getCell(`A${currentRow+13}`).font = { bold: true };
worksheet.getCell(`A${currentRow+14}`).font = { bold: true };


worksheet.getCell(`A${currentRow+17}`).font = { bold: true };
worksheet.getCell(`C${currentRow+17}`).font = { bold: true };
worksheet.getCell(`E${currentRow+17}`).font = { bold: true };
worksheet.getCell(`G${currentRow+17}`).font = { bold: true };
worksheet.getCell(`A${currentRow+19}`).font = { bold: true };
worksheet.getCell(`D${currentRow+19}`).font = { bold: true };
worksheet.getCell(`E${currentRow+19}`).font = { bold: true };
worksheet.getCell(`F${currentRow+19}`).font = { bold: true };
worksheet.getCell(`G${currentRow+19}`).font = { bold: true };
worksheet.getCell(`H${currentRow+19}`).font = { bold: true };
worksheet.getCell(`A${currentRow+21}`).font = { bold: true };
worksheet.getCell(`B${currentRow+21}`).font = { bold: true };
worksheet.getCell(`C${currentRow+21}`).font = { bold: true };
worksheet.getCell(`A${currentRow+22}`).font = { bold: true };
worksheet.getCell(`A${currentRow+23}`).font = { bold: true };
worksheet.getCell(`A${currentRow+24}`).font = { bold: true };
worksheet.getCell(`A${currentRow+25}`).font = { bold: true };

worksheet.getCell(`A${currentRow+30}`).font = { bold: true };
worksheet.getCell(`D${currentRow+30}`).font = { bold: true };
worksheet.getCell(`E${currentRow+30}`).font = { bold: true };
worksheet.getCell(`F${currentRow+30}`).font = { bold: true };
worksheet.getCell(`G${currentRow+30}`).font = { bold: true };
worksheet.getCell(`H${currentRow+30}`).font = { bold: true };
worksheet.getCell(`A${currentRow+32}`).font = { bold: true };
worksheet.getCell(`B${currentRow+32}`).font = { bold: true };
worksheet.getCell(`C${currentRow+32}`).font = { bold: true };
worksheet.getCell(`A${currentRow+33}`).font = { bold: true };
worksheet.getCell(`A${currentRow+34}`).font = { bold: true };
worksheet.getCell(`A${currentRow+35}`).font = { bold: true };
worksheet.getCell(`A${currentRow+36}`).font = { bold: true };

worksheet.getCell(`A${currentRow+41}`).font = { bold: true };
worksheet.getCell(`D${currentRow+41}`).font = { bold: true };
worksheet.getCell(`E${currentRow+41}`).font = { bold: true };
worksheet.getCell(`F${currentRow+41}`).font = { bold: true };
worksheet.getCell(`G${currentRow+41}`).font = { bold: true };
worksheet.getCell(`H${currentRow+41}`).font = { bold: true };
worksheet.getCell(`A${currentRow+43}`).font = { bold: true };
worksheet.getCell(`B${currentRow+43}`).font = { bold: true };
worksheet.getCell(`C${currentRow+43}`).font = { bold: true };
worksheet.getCell(`A${currentRow+44}`).font = { bold: true };
worksheet.getCell(`A${currentRow+45}`).font = { bold: true };
worksheet.getCell(`A${currentRow+46}`).font = { bold: true };
worksheet.getCell(`A${currentRow+47}`).font = { bold: true };

worksheet.getCell(`A${currentRow+50}`).font = { bold: true };
worksheet.getCell(`D${currentRow+50}`).font = { bold: true };
worksheet.getCell(`G${currentRow+50}`).font = { bold: true };

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          wrapText: true,
          horizontal: 'center',
          vertical: 'middle',
        };
      });
    });

    // Move to the next set of rows for the next entry
    currentRow += 53;
  });

  // Save Excel file
  const uint8Array = await workbook.xlsx.writeBuffer();
  const blob = new Blob([uint8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "LHBPressOnForm.xlsx");
};



  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      [
        { content: "WheelNo", rowSpan: 2 },
{ content: "AxleNo", rowSpan: 2 },
{ content: "ATLNo", rowSpan: 2 },
{ content: "WheelSeatSize", rowSpan: 2 },
{ content: "BDSeatSize", rowSpan: 2 },
{ content: "RAValue", rowSpan: 2 },
{ content: "OperatorName", rowSpan: 2 },
{ content: "WheelDiscAVTLNO", rowSpan: 2 },
{ content: "WheelDiscABoreSizeByOperator", rowSpan: 2 },
{ content: "WheelDiscARAValue", rowSpan: 2 },
{ content: "WheelDiscAOperatorName", rowSpan: 2 },
{ content: "WheelDiscAABoreSize", rowSpan: 2 },
{ content: "WheelDiscABWheelSeatSize", rowSpan: 2 },
{ content: "WheelDiscAAllow", rowSpan: 2 },
{ content: "WheelDiscAPressOnPressure", rowSpan: 2 },
{ content: "WheelDiscARDNo", rowSpan: 2 },
{ content: "WheelDiscAWheelDiscParticulars", rowSpan: 2 },
{ content: "WheelDiscATopXAxis", rowSpan: 2 },
{ content: "WheelDiscATopYAXis", rowSpan: 2 },
{ content: "WheelDiscAMiddleXAxis", rowSpan: 2 },
{ content: "WheelDiscAMiddleYAxis", rowSpan: 2 },
{ content: "WheelDiscALowerXAxis", rowSpan: 2 },
{ content: "WheelDiscALowerYAxis", rowSpan: 2 },
{ content: "WheelDiscAAvgXAxis", rowSpan: 2 },
{ content: "WheelDiscAAvgYAxis", rowSpan: 2 },
{ content: "WheelDiscBVTLNo", rowSpan: 2 },
{ content: "WheelDiscBBoreSizeByOperator", rowSpan: 2 },
{ content: "WheelDiscBRAValue", rowSpan: 2 },
{ content: "WheelDiscBOperatorName", rowSpan: 2 },
{ content: "WheelDiscBABoreSize", rowSpan: 2 },
{ content: "WheelDiscBBWheelSeatSize", rowSpan: 2 },
{ content: "WheelDiscBAllow", rowSpan: 2 },
{ content: "WheelDiscBPressOnPressure", rowSpan: 2 },
{ content: "WheelDiscBRDNo", rowSpan: 2 },
{ content: "WheelDiscBWheelDiscParticulars", rowSpan: 2 },
{ content: "WheelDiscBTopXAxis", rowSpan: 2 },
{ content: "WheelDiscBTopYAxis", rowSpan: 2 },
{ content: "WheelDiscBMiddleXAxis", rowSpan: 2 },
{ content: "WheelDiscBMiddleYAxis", rowSpan: 2 },
{ content: "WheelDiscBLowerXAxis", rowSpan: 2 },
{ content: "WheelDiscBLowerYAxis", rowSpan: 2 },
{ content: "WheelDiscBAvgXAxis", rowSpan: 2 },
{ content: "WheelDiscBAvgYAxis", rowSpan: 2 },
{ content: "BrakeDiscAABoreSize", rowSpan: 2 },
{ content: "BrakeDiscABBDSeatSize", rowSpan: 2 },
{ content: "BrakeDiscAAllow", rowSpan: 2 },
{ content: "BrakeDiscAPressOnPressure", rowSpan: 2 },
{ content: "BrakeDiscABDThickness", rowSpan: 2 },
{ content: "BrakeDiscABrakeDiscParticulars", rowSpan: 2 },
{ content: "BrakeDiscATopXAxis", rowSpan: 2 },
{ content: "BrakeDiscATopYAxis", rowSpan: 2 },
{ content: "BrakeDiscAMiddleXAxis", rowSpan: 2 },
{ content: "BrakeDiscAMiddleYAxis", rowSpan: 2 },
{ content: "BrakeDiscALowerXAxis", rowSpan: 2 },
{ content: "BrakeDiscALowerYAxis", rowSpan: 2 },
{ content: "BrakeDiscAAvgXAxis", rowSpan: 2 },
{ content: "BrakeDiscAAvgYAxis", rowSpan: 2 },
{ content: "BrakeDiscBABoreSize", rowSpan: 2 },
{ content: "BrakeDiscBBBDSeatSize", rowSpan: 2 },
{ content: "BrakeDiscBAllow", rowSpan: 2 },
{ content: "BrakeDiscBPressOnPressure", rowSpan: 2 },
{ content: "BrakeDiscBBDThickness", rowSpan: 2 },
{ content: "BrakeDiscBBrakeDiscParticulars", rowSpan: 2 },
{ content: "BrakeDiscBTopXAxis", rowSpan: 2 },
{ content: "BrakeDiscBTopYAxis", rowSpan: 2 },
{ content: "BrakeDiscBMiddleXAxis", rowSpan: 2 },
{ content: "BrakeDiscBMiddleYAxis", rowSpan: 2 },
{ content: "BrakeDiscBLowerXAxis", rowSpan: 2 },
{ content: "BrakeDiscBLowerYAxis", rowSpan: 2 },
{ content: "BrakeDiscBAvgXAxis", rowSpan: 2 },
{ content: "BrakeDiscBAvgYAxis", rowSpan: 2 },
{ content: "MCNo", rowSpan: 2 },
{ content: "Operator", rowSpan: 2 },
{ content: "Inspector", rowSpan: 2 },

      ],
      
    ];

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.WheelNo,
row.AxleNo,
row.ATLNo,
row.WheelSeatSize,
row.BDSeatSize,
row.RAValue,
row.OperatorName,
row.WheelDiscAVTLNO,
row.WheelDiscABoreSizeByOperator,
row.WheelDiscARAValue,
row.WheelDiscAOperatorName,
row.WheelDiscAABoreSize,
row.WheelDiscABWheelSeatSize,
row.WheelDiscAAllow,
row.WheelDiscAPressOnPressure,
row.WheelDiscARDNo,
row.WheelDiscAWheelDiscParticulars,
row.WheelDiscATopXAxis,
row.WheelDiscATopYAxis,
row.WheelDiscAMiddleXAxis,
row.WheelDiscAMiddleYAxis,
row.WheelDiscALowerXAxis,
row.WheelDiscALowerYAxis,
row.WheelDiscAAvgXAxis,
row.WheelDiscAAvgYAxis,
row.WheelDiscBVTLNo,
row.WheelDiscBBoreSizeByOperator,
row.WheelDiscBRAValue,
row.WheelDiscBOperatorName,
row.WheelDiscBABoreSize,
row.WheelDiscBBWheelSeatSize,
row.WheelDiscBAllow,
row.WheelDiscBPressOnPressure,
row.WheelDiscBRDNo,
row.WheelDiscBWheelDiscParticulars,
row.WheelDiscBTopXAxis,
row.WheelDiscBTopYAxis,
row.WheelDiscBMiddleXAxis,
row.WheelDiscBMiddleYAxis,
row.WheelDiscBLowerXAxis,
row.WheelDiscBLowerYAxis,
row.WheelDiscBAvgXAxis,
row.WheelDiscBAvgYAxis,
row.BrakeDiscABBDSeatSize,
row.BrakeDiscAAllow,
row.BrakeDiscAPressOnPressure,
row.BrakeDiscABDThickness,
row.BrakeDiscABrakeDiscParticulars,
row.BrakeDiscATopXAxis,
row.BrakeDiscATopYAxis,
row.BrakeDiscAMiddleXAxis,
row.BrakeDiscAMiddleYAxis,
row.BrakeDiscALowerXAxis,
row.BrakeDiscALowerYAxis,
row.BrakeDiscAAvgXAxis,
row.BrakeDiscAAvgYAxis,
row.BrakeDiscBBBDSeatSize,
row.BrakeDiscBAllow,
row.BrakeDiscBPressOnPressure,
row.BrakeDiscBBDThickness,
row.BrakeDiscBBrakeDiscParticulars,
row.BrakeDiscBTopXAxis,
row.BrakeDiscBTopYAxis,
row.BrakeDiscBMiddleXAxis,
row.BrakeDiscBMiddleYAxis,
row.BrakeDiscBLowerXAxis,
row.BrakeDiscBLowerYAxis,
row.BrakeDiscBAvgXAxis,
row.BrakeDiscBAvgYAxis,
row.MCNo,
row.Operator,
row.Inspector,
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

    doc.save("LHBPressOnForm.pdf");
  };

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
      "Wheel Disc A B Wheel Seat Size",
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
      "Brake Disc A B BD Seat Size",
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
      "Brake Disc B B BD Seat Size",
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
    const rows = data.map((entry) => [
      entry.WheelNo,
        entry.AxleNo,
        entry.ATLNo,
        entry.WheelSeatSize,
        entry.BDSeatSize,
        entry.RAValue,
        entry.OperatorName,
        entry.WheelDiscAVTLNO,
        entry.WheelDiscABoreSizeByOperator,
        entry.WheelDiscARAValue,
        entry.WheelDiscAOperatorName,
        entry.WheelDiscABWheelSeatSize,
        entry.WheelDiscAAllow,
        entry.WheelDiscAPressOnPressure,
        entry.WheelDiscARDNo,
        entry.WheelDiscAWheelDiscParticulars,
        entry.WheelDiscATopXAxis,
        entry.WheelDiscATopYAXis,
        entry.WheelDiscAMiddleXAxis,
        entry.WheelDiscAMiddleYAxis,
        entry.WheelDiscALowerXAxis,
        entry.WheelDiscALowerYAxis,
        entry.WheelDiscAAvgXAxis,
        entry.WheelDiscAAvgYAxis,
        entry.WheelDiscBVTLNo,
        entry.WheelDiscBBoreSizeByOperator,
        entry.WheelDiscBRAValue,
        entry.WheelDiscBOperatorName,
        entry.WheelDiscBABoreSize,
        entry.WheelDiscBBWheelSeatSize,
        entry.WheelDiscBAllow,
        entry.WheelDiscBPressOnPressure,
        entry.WheelDiscBRDNo,
        entry.WheelDiscBWheelDiscParticulars,
        entry.WheelDiscBTopXAxis,
        entry.WheelDiscBTopYAxis,
        entry.WheelDiscBMiddleXAxis,
        entry.WheelDiscBMiddleYAxis,
        entry.WheelDiscBLowerXAxis,
        entry.WheelDiscBLowerYAxis,
        entry.WheelDiscBAvgXAxis,
        entry.WheelDiscBAvgYAxis,
        entry.BrakeDiscABBDSeatSize,
        entry.BrakeDiscAAllow,
        entry.BrakeDiscAPressOnPressure,
        entry.BrakeDiscABDThickness,
        entry.BrakeDiscABrakeDiscParticulars,
        entry.BrakeDiscATopXAxis,
        entry.BrakeDiscATopYAxis,
        entry.BrakeDiscAMiddleXAxis,
        entry.BrakeDiscAMiddleYAxis,
        entry.BrakeDiscALowerXAxis,
        entry.BrakeDiscALowerYAxis,
        entry.BrakeDiscAAvgXAxis,
        entry.BrakeDiscAAvgYAxis,
        entry.BrakeDiscBABoreSize,
        entry.BrakeDiscBBBDSeatSize,
        entry.BrakeDiscBAllow,
        entry.BrakeDiscBPressOnPressure,
        entry.BrakeDiscBBDThickness,
        entry.BrakeDiscBBrakeDiscParticulars,
        entry.BrakeDiscBTopXAxis,
        entry.BrakeDiscBTopYAxis,
        entry.BrakeDiscBMiddleXAxis,
        entry.BrakeDiscBMiddleYAxis,
        entry.BrakeDiscBLowerXAxis,
        entry.BrakeDiscBLowerYAxis,
        entry.BrakeDiscBAvgXAxis,
        entry.BrakeDiscBAvgYAxis,
        entry.MCNo,
        entry.Operator,
        entry.Inspector,
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
    link.setAttribute("download", "LHBPressOnForm.csv");
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
          onClick={() => navigate("/LHBPressOnForm/wheel_details")}
        >
          Dashboard
        </button> */}
      </div>
      <div id="table-container" className="table_container">
        {data.map((res,index) => (
        <table>
          <thead className="thead">
            
          

          
            <tbody name="tbody" key={`tbody-${res.id}+${index}`}>
              <tr name="tr" key={`tr-${res.id}`}>
              
              <th>Wheel No.</th>
              <td colSpan={2}>{res.WheelNo}</td>
              <th>Axle No.</th>
              <td colSpan={6}>{res.AxleNo}</td>
            </tr>
            <tr>
              <th>ATL No.</th>
              <td>{res.ATLNo}</td>
              <th>Wheel Seat Size</th>
              <td>{res.WheelSeatSize}</td>
              <th>BD Seat Size</th>
              <td>{res.BDSeatSize}</td>
              <th>RA Value(1.6 Max)</th>
              <td>{res.RAValue}</td>
              <th>Operator Name</th>
              <td>{res.OperatorName}</td>
            </tr>


            {/* WHEEL DISC A */}
            <tr>
              <th colSpan={10}>Wheel Disc 'A' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{res.WheelDiscAVTLNO}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{res.WheelDiscABoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{res.WheelDiscARAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{res.WheelDiscAOperatorName}</td>
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
              <td>{res.WheelDiscATopXAxis}</td>
              <td>{res.WheelDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{res.WheelDiscABWheelSeatSize}</td>
              <td rowSpan={4}>{res.WheelDiscAAllow}</td>
              <td rowSpan={4}>{res.WheelDiscAPressOnPressure}</td>
              <td rowSpan={4}>{res.WheelDiscARDNo}</td>
              <td rowSpan={4} colSpan={2}>{res.WheelDiscAWheelDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{res.WheelDiscAMiddleXAxis}</td>
              <td>{res.WheelDiscAMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{res.WheelDiscALowerXAxis}</td>
              <td>{res.WheelDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{res.WheelDiscAAvgXAxis}</td>
              <td>{res.WheelDiscAAvgYAxis}</td>
            </tr>
            <br></br>


            {/* WHEEL DISC B */}
            <tr>
              <th colSpan={10}>Wheel Disc 'B' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{res.WheelDiscBVTLNo}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{res.WheelDiscBBoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{res.WheelDiscBRAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{res.WheelDiscBOperatorName}</td>
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
              <td>{res.WheelDiscBTopXAxis}</td>
              <td>{res.WheelDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{res.WheelDiscBBWheelSeatSize}</td>
              <td rowSpan={4}>{res.WheelDiscBAllow}</td>
              <td rowSpan={4}>{res.WheelDiscBPressOnPressure}</td>
              <td rowSpan={4}>{res.WheelDiscBRDNo}</td>
              <td rowSpan={4} colSpan={2}>{res.WheelDiscBWheelDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{res.WheelDiscBMiddleXAxis}</td>
              <td>{res.WheelDiscBMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{res.WheelDiscBLowerXAxis}</td>
              <td>{res.WheelDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{res.WheelDiscBAvgXAxis}</td>
              <td>{res.WheelDiscBAvgYAxis}</td>
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
              <td>{res.BrakeDiscATopXAxis}</td>
              <td>{res.BrakeDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{res.BrakeDiscABBDSeatSize}</td>
              <td rowSpan={4}>{res.BrakeDiscAAllow}</td>
              <td rowSpan={4}>{res.BrakeDiscAPressOnPressure}</td>
              <td rowSpan={4}>{res.BrakeDiscABDThickness}</td>
              <td rowSpan={4} colSpan={2}>{res.BrakeDiscABrakeDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{res.BrakeDiscAMiddleXAxis}</td>
              <td>{res.BrakeDiscAMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{res.BrakeDiscALowerXAxis}</td>
              <td>{res.BrakeDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{res.BrakeDiscAAvgXAxis}</td>
              <td>{res.BrakeDiscAAvgYAxis}</td>
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
              <td>{res.BrakeDiscBTopXAxis}</td>
              <td>{res.BrakeDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>{res.BrakeDiscBBBDSeatSize}</td>
              <td rowSpan={4}>{res.BrakeDiscBAllow}</td>
              <td rowSpan={4}>{res.BrakeDiscBPressOnPressure}</td>
              <td rowSpan={4}>{res.BrakeDiscBBDThickness}</td>
              <td rowSpan={4} colSpan={2}>{res.BrakeDiscBBrakeDiscParticulars}</td>

            </tr>
            <tr>
              <th>Middle</th>
              <td>{res.BrakeDiscBMiddleXAxis}</td>
              <td>{res.BrakeDiscBMiddleYAxis}</td>

            </tr>
            <tr>
              <th>Lower</th>
              <td>{res.BrakeDiscBLowerXAxis}</td>
              <td>{res.BrakeDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{res.BrakeDiscBAvgXAxis}</td>
              <td>{res.BrakeDiscBAvgYAxis}</td>
            </tr>
            </tbody>
            
          
          </thead>
          <br></br>
          <div className="footer">
          <div>
        <b>  M/C No. : </b>{res.MCNo}
        </div>

        <div>
        <b>  Operator : </b>{res.Operator}
        </div>

        <div>
        <b>  Inspector : </b>{res.Inspector}
        </div>

        </div>
        </table>
        ))}
      </div>
    </div>
  );
};

export default AllEntryPressOn;
