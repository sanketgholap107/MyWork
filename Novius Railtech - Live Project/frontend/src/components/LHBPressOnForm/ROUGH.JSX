// const exportToPDF = () => {
//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "pt",
//       format: "a4",
//     });
  
//     // Table headers
//     const tableColumn = [
//       [
//         { content: "Wheel No.", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelNo, colSpan: 2 },
//         { content: "Axle No.", rowSpan: 1 },
//         { content: formDataPressOnLHB.AxleNo, colSpan: 6 },
//       ],
//       [
//         { content: "ATL No.", rowSpan: 1 },
//         { content: formDataPressOnLHB.ATLNo, rowSpan: 1 },
//         { content: "Wheel Seat Size", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelSeatSize, rowSpan: 1 },
//         { content: "BD Seat Size", rowSpan: 1 },
//         { content: formDataPressOnLHB.BDSeatSize, rowSpan: 1 },
//         { content: "RA Value(1.6 Max)", rowSpan: 1 },
//         { content: formDataPressOnLHB.RAValue, rowSpan: 1 },
//         { content: "Operator Name", rowSpan: 1 },
//         { content: formDataPressOnLHB.OperatorName, rowSpan: 1 },
//       ],
//       [{ content: "Wheel Disc 'A' Side", colSpan: 10 }],
//       [
//         { content: "VTL No.", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscAVTLNO, rowSpan: 1 },
//         { content: "Bore Size By Operator", colSpan: 2 },
//         { content: formDataPressOnLHB.WheelDiscABoreSizeByOperator, rowSpan: 1 },
//         { content: "RA Value", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscARAValue, rowSpan: 1 },
//         { content: "Operator Name", colSpan: 2 },
//         { content: formDataPressOnLHB.WheelDiscAOperatorName, rowSpan: 1 },
//       ],
//       [
//         { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
//         { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 3 },
//         { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 3 },
//         { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
//         { content: "RD No.", rowSpan: 3 },
//         { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 3 },
//       ],
//       [
//         { content: "Insp.", rowSpan: 1 },
//         { content: "X-axis", rowSpan: 1 },
//         { content: "Y-axis", rowSpan: 1 },
//       ],
//       [
//         { content: "Top", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscATopXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscATopYAxis, rowSpan: 1 },
//         {
//           content: formDataPressOnLHB.WheelDiscABWheelSeatSize,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//         { content: formDataPressOnLHB.WheelDiscAAllow, rowSpan: 4 },
//         { content: formDataPressOnLHB.WheelDiscAPressOnPressure, rowSpan: 4 },
//         { content: formDataPressOnLHB.WheelDiscARDNo, rowSpan: 4 },
//         {
//           content: formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//       ],
//       [
//         { content: "Middle", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscAMiddleXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscAMiddleYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Lower", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscALowerXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscALowerYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Avg.", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscAAvgXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscAAvgYAxis, rowSpan: 1 },
//       ],
//       [{ content: "Wheel Disc 'B' Side", colSpan: 10 }],
//       [
//         { content: "VTL No.", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBVTLNo, rowSpan: 1 },
//         { content: "Bore Size By Operator", colSpan: 2 },
//         { content: formDataPressOnLHB.WheelDiscBBoreSizeByOperator, rowSpan: 1 },
//         { content: "RA Value", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBRAValue, rowSpan: 1 },
//         { content: "Operator Name", colSpan: 2 },
//         { content: formDataPressOnLHB.WheelDiscBOperatorName, rowSpan: 1 },
//       ],
//       [
//         { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
//         { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 3 },
//         { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 3 },
//         { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
//         { content: "RD No.", rowSpan: 3 },
//         { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 3 },
//       ],
//       [
//         { content: "Insp.", rowSpan: 1 },
//         { content: "X-axis", rowSpan: 1 },
//         { content: "Y-axis", rowSpan: 1 },
//       ],
//       [
//         { content: "Top", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBTopXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBTopYAxis, rowSpan: 1 },
//         {
//           content: formDataPressOnLHB.WheelDiscBBWheelSeatSize,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//         { content: formDataPressOnLHB.WheelDiscBAllow, rowSpan: 4 },
//         { content: formDataPressOnLHB.WheelDiscBPressOnPressure, rowSpan: 4 },
//         { content: formDataPressOnLHB.WheelDiscBRDNo, rowSpan: 4 },
//         {
//           content: formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//       ],
//       [
//         { content: "Middle", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBMiddleXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBMiddleYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Lower", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBLowerXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBLowerYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Avg.", rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBAvgXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.WheelDiscBAvgYAxis, rowSpan: 1 },
//       ],
//       [{ content: "Brake Disc 'A' Side", colSpan: 10 }],
//       [
//         { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
//         { content: "B' BD Seat Size(199.230-199.260)mm", colSpan: 2, rowSpan: 3 },
//         { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 3 },
//         { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
//         { content: "BD Thickness", rowSpan: 3 },
//         { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 3 },
//       ],
//       [
//         { content: "Insp.", rowSpan: 1 },
//         { content: "X-axis", rowSpan: 1 },
//         { content: "Y-axis", rowSpan: 1 },
//       ],
//       [
//         { content: "Top", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscATopXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscATopYAxis, rowSpan: 1 },
//         {
//           content: formDataPressOnLHB.BrakeDiscABWheelSeatSize,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//         { content: formDataPressOnLHB.BrakeDiscAAllow, rowSpan: 4 },
//         { content: formDataPressOnLHB.BrakeDiscAPressOnPressure, rowSpan: 4 },
//         { content: formDataPressOnLHB.BrakeDiscAThickness, rowSpan: 4 },
//         {
//           content: formDataPressOnLHB.BrakeDiscAMakeParticulars,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//       ],
//       [
//         { content: "Middle", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscAMiddleXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscAMiddleYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Lower", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscALowerXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscALowerYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Avg.", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscAAvgXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscAAvgYAxis, rowSpan: 1 },
//       ],
//       [{ content: "Brake Disc 'B' Side", colSpan: 10 }],
//       [
//         { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
//         { content: "B' BD Seat Size(199.230-199.260)mm", colSpan: 2, rowSpan: 3 },
//         { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 3 },
//         { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 3 },
//         { content: "BD Thickness", rowSpan: 3 },
//         { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 3 },
//       ],
//       [
//         { content: "Insp.", rowSpan: 1 },
//         { content: "X-axis", rowSpan: 1 },
//         { content: "Y-axis", rowSpan: 1 },
//       ],
//       [
//         { content: "Top", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBTopXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBTopYAxis, rowSpan: 1 },
//         {
//           content: formDataPressOnLHB.BrakeDiscBBWheelSeatSize,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//         { content: formDataPressOnLHB.BrakeDiscBAllow, rowSpan: 4 },
//         { content: formDataPressOnLHB.BrakeDiscBPressOnPressure, rowSpan: 4 },
//         { content: formDataPressOnLHB.BrakeDiscBThickness, rowSpan: 4 },
//         {
//           content: formDataPressOnLHB.BrakeDiscBMakeParticulars,
//           colSpan: 2,
//           rowSpan: 4,
//         },
//       ],
//       [
//         { content: "Middle", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBMiddleXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBMiddleYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Lower", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBLowerXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBLowerYAxis, rowSpan: 1 },
//       ],
//       [
//         { content: "Avg.", rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBAvgXAxis, rowSpan: 1 },
//         { content: formDataPressOnLHB.BrakeDiscBAvgYAxis, rowSpan: 1 },
//       ],
//     ];
  
//     // Generate the table
//     doc.autoTable({
//       head: tableColumn,
//         // body: tableRows,
//         startX: 10,
//         startY: 60,
//         tableWidth: "auto", // Automatically adjusts the width to fit the page
//         tableHeight: doc.internal.pageSize.getHeight() - 20,
//         theme: "grid",
  
//         headStyles: {
//           fillColor: [0, 0, 0], // Color for the table header
//           halign: "center",
//           valign: "middle",
//           fontSize: 8, // Adjusted to fit more content
//           cellPadding: 3,
//         },
//         styles: {
//           overflow: "linebreak", // Wrap text in cells
//           fontSize: 7, // Adjust font size to reduce the table width
//           cellWidth: "wrap", // Allow cells to wrap text
//           halign: "center",
//           valign: "middle",
//           lineColor: [0, 0, 0], // Black borders
//         lineWidth: 1, // Border thickness  
//         },
      
//         didParseCell: (data) => {
//           // Example: Set specific styles for specific cells
//           if ((data.row.index === 2 && data.column.index === 1) ) {
//             // Set background color to black and text color to white for cell at row 2, column 1
//             data.cell.styles.fillColor = [0, 0, 0]; // Black background
//             data.cell.styles.textColor = [255, 255, 255]; // White text
//           } else if ( (data.row.index === 0 && data.column.index === 1) 
//             || (data.row.index === 0 && data.column.index === 4) | (data.row.index === 1 && data.column.index === 1)
//             || (data.row.index === 1 && data.column.index === 3)|| (data.row.index === 1 && data.column.index === 5)
//             || (data.row.index === 1 && data.column.index === 7) || (data.row.index === 1 && data.column.index === 9)
//             || (data.row.index === 3 && data.column.index === 4)    || (data.row.index === 3 && data.column.index === 6) 
//             || (data.row.index === 3 && data.column.index === 9)  || (data.row.index === 3 && data.column.index === 1)   
//             || (data.row.index === 7 && data.column.index === 1)   || (data.row.index === 7 && data.column.index === 2) 
//             || (data.row.index === 7 && data.column.index === 3) || (data.row.index === 7 && data.column.index === 4)   
//             || (data.row.index === 7 && data.column.index === 5) || (data.row.index === 7 && data.column.index === 6)
//             || (data.row.index === 7 && data.column.index === 7)  || (data.row.index === 7 && data.column.index === 8)
//             || (data.row.index === 7 && data.column.index === 9) 
//             || (data.row.index === 8 && data.column.index === 1)   || (data.row.index === 8 && data.column.index === 2)
//             || (data.row.index === 9 && data.column.index === 1)   || (data.row.index === 9 && data.column.index === 2)
//             || (data.row.index === 10 && data.column.index === 1)   || (data.row.index === 10 && data.column.index === 2)
//             || (data.row.index === 12 && data.column.index === 1) || (data.row.index === 12 && data.column.index === 4)
//             || (data.row.index === 12 && data.column.index === 6)|| (data.row.index === 12 && data.column.index === 8)
//             || (data.row.index === 12 && data.column.index === 9)|| (data.row.index === 16 && data.column.index === 1)
//             || (data.row.index === 16 && data.column.index === 2) || (data.row.index === 16 && data.column.index === 3)
//             || (data.row.index === 16 && data.column.index === 4) || (data.row.index === 16 && data.column.index === 5)
//             || (data.row.index === 16 && data.column.index === 6) || (data.row.index === 16 && data.column.index === 7) 
//             || (data.row.index === 16 && data.column.index === 8) || (data.row.index === 17 && data.column.index === 1)
//             || (data.row.index === 17 && data.column.index === 2)|| (data.row.index === 18 && data.column.index === 1)
//             || (data.row.index === 18 && data.column.index === 2)|| (data.row.index === 19 && data.column.index === 1)
//             || (data.row.index === 19 && data.column.index === 2) || (data.row.index === 24 && data.column.index === 1)
//             || (data.row.index === 24 && data.column.index === 2) || (data.row.index === 24 && data.column.index === 3)
//             || (data.row.index === 24 && data.column.index === 4)|| (data.row.index === 24 && data.column.index === 5)
//             || (data.row.index === 24 && data.column.index === 6) || (data.row.index === 24 && data.column.index === 7)
//             || (data.row.index === 24 && data.column.index === 8) || (data.row.index === 25 && data.column.index === 1)
//             || (data.row.index === 25 && data.column.index === 2)|| (data.row.index === 26 && data.column.index === 1)
//             || (data.row.index === 26 && data.column.index === 2)|| (data.row.index === 27 && data.column.index === 1)
//             || (data.row.index === 27 && data.column.index === 2) || (data.row.index === 32 && data.column.index === 1)
//             || (data.row.index === 32 && data.column.index === 2)|| (data.row.index === 32 && data.column.index === 3)
//             || (data.row.index === 32 && data.column.index === 4)|| (data.row.index === 32 && data.column.index === 5)
//             || (data.row.index === 32 && data.column.index === 6)|| (data.row.index === 32 && data.column.index === 7)
//             || (data.row.index === 32 && data.column.index === 8) || (data.row.index === 33 && data.column.index === 1)
//             || (data.row.index === 33 && data.column.index === 2)|| (data.row.index === 34 && data.column.index === 1)
//             || (data.row.index === 34 && data.column.index === 2)|| (data.row.index === 35 && data.column.index === 1)
//             || (data.row.index === 35 && data.column.index === 2)                ) {
//             // Set background color to white and text color to black for cell at row 4, column 3
//             data.cell.styles.fillColor = [255, 255, 255]; // White background
//             data.cell.styles.textColor = [0, 0, 0];
//            } // Black text
//           //  }else if(data.row.index === 0 && data.column.index === 1){
//           //   data.cell.styles.fillColor = [255, 255, 255]; // White background
//           //   data.cell.styles.textColor = [0, 0, 0]; // Black text
//           // }
//           // else if(data.row.index === 0 && data.column.index === 3){
//           //   data.cell.styles.fillColor = [255, 255, 255]; // White background
//           //   data.cell.styles.textColor = [0, 0, 0]; // Black text
//           // }
//         },
  
  
//         columnStyles: {
//           0: {cellWidth: 10, fillColor: [255, 255, 255] }, // White background for the first column
//           1: { cellWidth: 10,fillColor: [255, 255, 255] }, // White background for the second column
//           2: { cellWidth: 10,fillColor: [0, 0, 0] }, // Black background for the third column
    
//           // 0:  { cellWidth: 10 },
//     // 1:  { cellWidth: 10 },
//     // 2:  { cellWidth: 10 },
//     3:  { cellWidth: 10 },
//     4:  { cellWidth: 10 },
//     5:  { cellWidth: 10 },
//     6:  { cellWidth: 10 },
//     7:  { cellWidth: 10 },
//     8:  { cellWidth: 10 },
//     9:  { cellWidth: 10 },
//     10: { cellWidth: 10 },
//     11: { cellWidth: 10 },
//     12: { cellWidth: 10 },
//     13: { cellWidth: 10 },
//     14: { cellWidth: 10 },
//     15: { cellWidth: 10 },
//     16: { cellWidth: 10 },
//     17: { cellWidth: 10 },
//     18: { cellWidth: 10 },
//     19: { cellWidth: 10 },
//     20: { cellWidth: 10 },
//     21: { cellWidth: 10 },
//     22: { cellWidth: 10 },
//     23: { cellWidth: 10 },
//     24: { cellWidth: 10 },
//     25: { cellWidth: 10 },
//     26: { cellWidth: 10 },
//     27: { cellWidth: 10 },
//     28: { cellWidth: 10 },
//     29: { cellWidth: 10 },
//     30: { cellWidth: 10 },
//     31: { cellWidth: 10 },
//     32: { cellWidth: 10 },
//     33: { cellWidth: 10 },
//     34: { cellWidth: 10 },
//     35: { cellWidth: 10 },
//     36: { cellWidth: 10 },
//     37: { cellWidth: 10 },
//     38: { cellWidth: 10 },
//     39: { cellWidth: 10 },
//     40: { cellWidth: 10 },
//     41: { cellWidth: 10 },
//     42: { cellWidth: 10 },
//     43: { cellWidth: 10 },
//     44: { cellWidth: 10 },
//     45: { cellWidth: 10 },
//     46: { cellWidth: 10 },
//     47: { cellWidth: 10 },
//     48: { cellWidth: 10 },
//     49: { cellWidth: 10 },
//     50: { cellWidth: 10 },
//     51: { cellWidth: 10 },
//     52: { cellWidth: 10 },
//     53: { cellWidth: 10 },
//     54: { cellWidth: 10 },
//     55: { cellWidth: 10 },
//     56: { cellWidth: 10 },
//     57: { cellWidth: 10 },
//     58: { cellWidth: 10 },
//     59: { cellWidth: 10 },
//     60: { cellWidth: 10 },
//     61: { cellWidth: 10 },
//     62: { cellWidth: 10 },
//     63: { cellWidth: 10 },
//     64: { cellWidth: 10 },
//     65: { cellWidth: 10 },
//     66: { cellWidth: 10 },
    
//         },
  
  
  
//         margin: { top: 40, left: 10, right: 10 }, // Adjusted margins
//         didDrawPage: (data) => {
//           // Add a title on the first page
//           if (data.pageNumber === 1) {
//             doc.setFontSize(12);
            
//             doc.text(
//               "LHB Final Inspection Report",
//               data.settings.margin.left,
//               20
//             );
//           }
//         },
//     });
//     const totalPages = doc.internal.getNumberOfPages();
  
//     // Add page numbers
//     for (let i = 1; i <= totalPages; i++) {
//       doc.setPage(i);
//       const pageSize = doc.internal.pageSize;
//       const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
//       const pageHeight = pageSize.height
//         ? pageSize.height
//         : pageSize.getHeight();
//       doc.setFontSize(10);
//       const pageNumber = `Page ${i} of ${totalPages}`;
//       doc.text(pageNumber, pageWidth - 50, pageHeight - 10);
//     }  
//     doc.save("table.pdf");
//   };
  