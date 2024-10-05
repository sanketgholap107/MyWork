const express = require("express");
const LHBFinalInspection = require("./models/LHBFinalInspection"); // Import the model
const LHBScheduledPreIinspection = require("./models/LHBScheduledPreIinspection.js");
const sequelize = require("./config/database.js"); // Import the Sequelize instance
const cors = require("cors");
const LHBDivisionPreInspection = require("./models/LHBDivisionPreInspection.js");
const User = require("./models/User.js");
const LHBPressON = require("./models/LHBPressOn.js");
const LHBPressOff = require("./models/LHBPressOff.js");
const SummaryReport = require("./models/SummaryReport.js");
const WheelsDispatchRecord = require("./models/WheelsDispatchRecord.js");
const { QueryTypes } = require("sequelize");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your React app's origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Specify the HTTP methods you want to allow
//     credentials: true, // Enable this if your request needs to send cookies or HTTP authentication
//   })
// );

// -----------------------------Login Api -----------------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords directly
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Optionally, you can generate and send a token here
    // const token = jwt.sign({ userId: user.userId }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      // token, // Include token if using JWT
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB Final inspection Api's -----------------------------------------------------------

app.get("/api/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBFinalInspection.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBFinalInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/data", async (req, res) => {
  const {
    SectionId,
    DepartmentId,
    WheeltypeId,
    WheelNo,
    Shift,
    wheelid,
    AxleNo,
    ABSide,
    WheelDia,
    WheelRG,
    WheelFLG,
    FC,
    Size,
    Oval,
    Tap,
    ShoulderSize,
    JrWaiviness,
    BDMake,
    BDSize,
    EndHole,
    BRGRemainLife,
    BRGMake,
    BRGNo,
    MEP,
    USTName,
    FittingDt,
    ECATest,
    InspectorSign,
    createdBy
  } = req.body;

  try {
    // Raw SQL query to insert data
    await sequelize.query(
      `INSERT INTO LHBFinalInspection (
        SectionId,
        DepartmentId,
        WheeltypeId,
        WheelNo,
        Shift,
        wheelid,
        AxleNo,
        ABSide,
        WheelDia,
        WheelRG,
        WheelFLG,
        FC,
        Size,
        Oval,
        Tap,
        ShoulderSize,
        JrWaiviness,
        BDMake,
        BDSize,
        EndHole,
        BRGRemainLife,
        BRGMake,
        BRGNo,
        MEP,
        USTName,
        FittingDt,
        ECATest,
        InspectorSign,
        createdBy
      ) VALUES (
        :SectionId,
        :DepartmentId,
        :WheeltypeId,
        :WheelNo,
        :Shift,
        :wheelid,
        :AxleNo,
        :ABSide,
        :WheelDia,
        :WheelRG,
        :WheelFLG,
        :FC,
        :Size,
        :Oval,
        :Tap,
        :ShoulderSize,
        :JrWaiviness,
        :BDMake,
        :BDSize,
        :EndHole,
        :BRGRemainLife,
        :BRGMake,
        :BRGNo,
        :MEP,
        :USTName,
        :FittingDt,
        :ECATest,
        :InspectorSign,
        :createdBy
      )`,
      {
        replacements: {
          SectionId,
          DepartmentId,
          WheeltypeId,
          WheelNo,
          Shift,
          wheelid,
          AxleNo,
          ABSide,
          WheelDia,
          WheelRG,
          WheelFLG,
          FC,
          Size,
          Oval,
          Tap,
          ShoulderSize,
          JrWaiviness,
          BDMake,
          BDSize,
          EndHole,
          BRGRemainLife,
          BRGMake,
          BRGNo,
          MEP,
          USTName,
          FittingDt,
          ECATest,
          InspectorSign,
          createdBy
        },
        type: QueryTypes.INSERT
      }
    );

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
});


// app.post("/api/data", async (req, res) => {
//   const {
//     SectionId,
//     DepartmentId,
//     WheeltypeId,
//     WheelNo,
//     Shift,
//     wheelid,
//     AxleNo,
//     ABSide,
//     WheelDia,
//     WheelRG,
//     WheelFLG,
//     FC,
//     Size,
//     Oval,
//     Tap,
//     ShoulderSize,
//     JrWaiviness,
//     BDMake,
//     BDSize,
//     EndHole,
//     BRGRemainLife,
//     BRGMake,
//     BRGNo,
//     MEP,
//     USTName,
//     FittingDt,
//     ECATest,
//     InspectorSign,
//     createdBy,
//   } = req.body;

//   try {
//     // Create a new WheelReport entry
//     const wheelReport = await LHBFinalInspection.create({
//       SectionId,
//       DepartmentId,
//       WheeltypeId,
//       WheelNo,
//     Shift,
//     wheelid,
//       AxleNo,
//       ABSide,
//       WheelDia,
//       WheelRG,
//       WheelFLG,
//       FC,
//       Size,
//       Oval,
//       Tap,
//       ShoulderSize,
//       JrWaiviness,
//       BDMake,
//       BDSize,
//       EndHole,
//       BRGRemainLife,
//       BRGMake,
//       BRGNo,
//       MEP,
//       USTName,
//       FittingDt,
//       ECATest,
//       InspectorSign,
//       createdBy,
//     });

//     // console.log("Data saved successfully:", wheelReport);

//     res.status(200).json(wheelReport);

//     console.log("Data saved successfully:", res);
//   } catch (error) {
//     console.error("Error saving data to the database:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// -----------------------------LHB Pre-Inspection Api's -----------------------------------------------------------

app.get("/prelhb/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBScheduledPreIinspection.findAll({
      where: {
        AxleNumber: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/prelhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBScheduledPreIinspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/prelhb/data", async (req, res) => {
  const {
    SectionId,
    DepartmentId,
    WheeltypeId,
    ShopSrNumber,
    AxleNumber,
    ReceiveDate,
    DispatchDate,
    CoachNumber,
    DiameterIN,
    DiameterOUT,
    FlageIN,
    FlageOUT,
    BDMake,
    BDSizeIN,
    BDSizeOUT,
    RodGaugeIN,
    RodGaugeOUT,
    SoundTestIN,
    SoundTestOUT,
    TypeOfRepair,
    USTName,
    MatungaRemark,
    InspectorSign,
    DiscParticularA,
    DiscParticularB,
    CTRBA,
    CTRBB,
    createdBy,
  } = req.body;

  try {
    // Custom query to insert data into the LHBScheduledPreIinspection table
    const query = `
      INSERT INTO LHBPreIinspection 
        (SectionId, DepartmentId, WheeltypeId, ShopSrNumber, AxleNumber, ReceiveDate, DispatchDate, CoachNumber, 
         DiameterIN, DiameterOUT, FlageIN, FlageOUT, BDMake, BDSizeIN, BDSizeOUT, RodGaugeIN, RodGaugeOUT, 
         SoundTestIN, SoundTestOUT, TypeOfRepair, USTName, MatungaRemark, InspectorSign, DiscParticularA, 
         DiscParticularB, CTRBA, CTRBB, createdBy, createdDate, isActive) 
      VALUES 
        (:SectionId, :DepartmentId, :WheeltypeId, :ShopSrNumber, :AxleNumber, :ReceiveDate, :DispatchDate, :CoachNumber, 
         :DiameterIN, :DiameterOUT, :FlageIN, :FlageOUT, :BDMake, :BDSizeIN, :BDSizeOUT, :RodGaugeIN, :RodGaugeOUT, 
         :SoundTestIN, :SoundTestOUT, :TypeOfRepair, :USTName, :MatungaRemark, :InspectorSign, :DiscParticularA, 
         :DiscParticularB, :CTRBA, :CTRBB, :createdBy, GETDATE(), 1)
    `;

    // Execute the custom query
    const [result, metadata] = await sequelize.query(query, {
      replacements: {
        SectionId,
        DepartmentId,
        WheeltypeId,
        ShopSrNumber,
        AxleNumber,
        ReceiveDate,
        DispatchDate,
        CoachNumber,
        DiameterIN,
        DiameterOUT,
        FlageIN,
        FlageOUT,
        BDMake,
        BDSizeIN,
        BDSizeOUT,
        RodGaugeIN,
        RodGaugeOUT,
        SoundTestIN,
        SoundTestOUT,
        TypeOfRepair,
        USTName,
        MatungaRemark,
        InspectorSign,
        DiscParticularA,
        DiscParticularB,
        CTRBA,
        CTRBB,
        createdBy,
      },
    });

    res.status(200).json({ message: "Data saved successfully", result });

    console.log("Data saved successfully:", result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//---------------------------Api's of the Graph/Charts ------------------------------------------------------------------

// SQL Queries
const summaryReportQuery = "SELECT TOP 1000 * FROM SummaryReport";
const wheelTypeQuery = "SELECT TOP 1000 * FROM Wheeltype";

// API endpoint to get the data for the React app
app.get("/api/dashboard-data", async (req, res) => {
  try {
    // Fetch data from the database
    // const summaryData = await getData(summaryReportQuery);
    // const wheelTypeData = await getData(wheelTypeQuery);
    const summaryData = await sequelize.query(summaryReportQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
    const wheelTypeData = await sequelize.query(wheelTypeQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Merge summaryData with wheelTypeData on WheeltypeId
    const mergedData = summaryData.map((entry) => {
      const wheelType = wheelTypeData.find(
        (type) => type.WheeltypeId === entry.WheeltypeId
      );
      return {
        ...entry,
        WheeltypeName: wheelType ? wheelType.WheeltypeName : null,
      };
    });

    // Data preparation for charts
    // Replace 'Operation' with 'Operations' to unify stages
    mergedData.forEach((row) => {
      if (row.WheelStageName === "Operation") {
        row.WheelStageName = "Operations";
      }
    });

    // Aggregating counts for each stage
    const inwardCount = mergedData.filter(
      (row) => row.WheelStageName === "Inward"
    ).length;
    const preinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "Preinspection"
    ).length;
    const finalinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "Finalinspection"
    ).length;
    const dispatchCount = mergedData.filter(
      (row) => row.WheelStageName === "Dispatch"
    ).length;

    // Group by WheeltypeName for operations
    const operationCounts = mergedData
      .filter((row) => row.WheelStageName === "Operations")
      .reduce((acc, row) => {
        acc[row.WheeltypeName] = (acc[row.WheeltypeName] || 0) + 1;
        return acc;
      }, {});

    // Prepare data for the Sankey diagram
    const labels = [
      "Inward",
      "Preinspection",
      ...Object.keys(operationCounts),
      "Finalinspection",
      "Dispatch",
    ];
    const sources = [];
    const targets = [];
    const values = [];

    // Inward -> Preinspection
    sources.push(labels.indexOf("Inward"));
    targets.push(labels.indexOf("Preinspection"));
    values.push(inwardCount);

    // Preinspection -> Operations (aggregate by WheeltypeName)
    Object.entries(operationCounts).forEach(([wheelType, count]) => {
      sources.push(labels.indexOf("Preinspection"));
      targets.push(labels.indexOf(wheelType));
      values.push(count);
    });

    // Operations -> Finalinspection (for each WheeltypeName)
    Object.entries(operationCounts).forEach(([wheelType, count]) => {
      sources.push(labels.indexOf(wheelType));
      targets.push(labels.indexOf("Finalinspection"));
      values.push(count);
    });

    // Finalinspection -> Dispatch
    sources.push(labels.indexOf("Finalinspection"));
    targets.push(labels.indexOf("Dispatch"));
    values.push(finalinspectionCount);

    // Data for charts
    const stageCounts = mergedData.reduce((acc, row) => {
      acc[row.WheelStageName] = (acc[row.WheelStageName] || 0) + 1;
      return acc;
    }, {});

    // Calculate average stage durations
    mergedData.forEach((row) => {
      row.StageDuration = Math.abs(
        new Date(row.WheelStageExitTimestamp) -
          new Date(row.WheelStageEnrtyTimestamp)
      );
    });

    const stageDurations = Object.entries(
      mergedData.reduce((acc, row) => {
        acc[row.WheelStageName] = acc[row.WheelStageName] || [];
        acc[row.WheelStageName].push(row.StageDuration);
        return acc;
      }, {})
    ).reduce((acc, [stage, durations]) => {
      acc[stage] = durations.reduce((sum, d) => sum + d, 0) / durations.length;
      return acc;
    }, {});

    // Send data as JSON to the client-side
    res.json({ labels, sources, targets, values, stageCounts, stageDurations });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).send("Error retrieving data from database");
  }
});

//------------------------------ LHB Scheduled Pre Inspection Api's ----------------------------------------------------------------------------
app.get("/inward/getdata/:WheelNo", async (req, res) => {
  const wheelno = req.params.WheelNo;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBDivisionPreInspection.findAll({
      where: {
        WheelNo: wheelno, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/inward/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBDivisionPreInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/inward/data", async (req, res) => {
  const {
    WheelNo,
    LooryNo,
    POHDate,
    // returndate,
    divisionreport,
    matungareport,
    createdBy,
    SectionId,
    DepartmentId,
    WheeltypeId,
    modifiedBy,
  } = req.body;

  try {
    // Create a new WheelReport entry
    const wheelReport = await LHBDivisionPreInspection.create({
      WheelNo,
      LooryNo,
      POHDate,
      // returndate,
      divisionreport,
      matungareport,
      createdBy,
      SectionId,
      DepartmentId,
      WheeltypeId,
      modifiedBy,
    });

    // console.log("Data saved successfully:", wheelReport);

    res.status(200).json(wheelReport);

    console.log("Data saved successfully:", res);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ Press-ON Of LHB Wheel Api's ----------------------------------------------------------------------------

app.get("/pressonlhb/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressON.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/pressonlhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBPressON.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/pressonlhb/data", async (req, res) => {
  const {
    wheelid,
    SectionId,
    DepartmentId,
    WheeltypeId,
    WheelNo,
    AxleNo,
    ATLNo,
    WheelSeatSize,
    BDSeatSize,
    RAValue,
    OperatorName,
    WheelDiscAVTLNO,
    WheelDiscABoreSizeByOperator,
    WheelDiscARAValue,
    WheelDiscAOperatorName,
    WheelDiscABWheelSeatSize,
    WheelDiscAAllow,
    WheelDiscAPressOnPressure,
    WheelDiscARDNo,
    WheelDiscAWheelDiscParticulars,
    WheelDiscATopXAxis,
    WheelDiscATopYAxis,
    WheelDiscAMiddleXAxis,
    WheelDiscAMiddleYAxis,
    WheelDiscALowerXAxis,
    WheelDiscALowerYAxis,
    WheelDiscAAvgXAxis,
    WheelDiscAAvgYAxis,
    WheelDiscBVTLNo,
    WheelDiscBBoreSizeByOperator,
    WheelDiscBRAValue,
    WheelDiscBOperatorName,
    WheelDiscBBWheelSeatSize,
    WheelDiscBAllow,
    WheelDiscBPressOnPressure,
    WheelDiscBRDNo,
    WheelDiscBWheelDiscParticulars,
    WheelDiscBTopXAxis,
    WheelDiscBTopYAxis,
    WheelDiscBMiddleXAxis,
    WheelDiscBMiddleYAxis,
    WheelDiscBLowerXAxis,
    WheelDiscBLowerYAxis,
    WheelDiscBAvgXAxis,
    WheelDiscBAvgYAxis,
    BrakeDiscABBDSeatSize,
    BrakeDiscAAllow,
    BrakeDiscAPressOnPressure,
    BrakeDiscABDThickness,
    BrakeDiscABrakeDiscParticulars,
    BrakeDiscATopXAxis,
    BrakeDiscATopYAxis,
    BrakeDiscAMiddleXAxis,
    BrakeDiscAMiddleYAxis,
    BrakeDiscALowerXAxis,
    BrakeDiscALowerYAxis,
    BrakeDiscAAvgXAxis,
    BrakeDiscAAvgYAxis,
    BrakeDiscBBBDSeatSize,
    BrakeDiscBAllow,
    BrakeDiscBPressOnPressure,
    BrakeDiscBBDThickness,
    BrakeDiscBBrakeDiscParticulars,
    BrakeDiscBTopXAxis,
    BrakeDiscBTopYAxis,
    BrakeDiscBMiddleXAxis,
    BrakeDiscBMiddleYAxis,
    BrakeDiscBLowerXAxis,
    BrakeDiscBLowerYAxis,
    BrakeDiscBAvgXAxis,
    BrakeDiscBAvgYAxis,
    MCNo,
    Operator,
    Inspector,
    createdBy,
  } = req.body;

  try {
    // Raw SQL query to insert data
    await sequelize.query(
      `INSERT INTO LHBPressON (
        wheelid,
        SectionId,
        DepartmentId,
        WheeltypeId,
        WheelNo,
        AxleNo,
        ATLNo,
        WheelSeatSize,
        BDSeatSize,
        RAValue,
        OperatorName,
        WheelDiscAVTLNO,
        WheelDiscABoreSizeByOperator,
        WheelDiscARAValue,
        WheelDiscAOperatorName,
        WheelDiscABWheelSeatSize,
        WheelDiscAAllow,
        WheelDiscAPressOnPressure,
        WheelDiscARDNo,
        WheelDiscAWheelDiscParticulars,
        WheelDiscATopXAxis,
        WheelDiscATopYAxis,
        WheelDiscAMiddleXAxis,
        WheelDiscAMiddleYAxis,
        WheelDiscALowerXAxis,
        WheelDiscALowerYAxis,
        WheelDiscAAvgXAxis,
        WheelDiscAAvgYAxis,
        WheelDiscBVTLNo,
        WheelDiscBBoreSizeByOperator,
        WheelDiscBRAValue,
        WheelDiscBOperatorName,
        WheelDiscBBWheelSeatSize,
        WheelDiscBAllow,
        WheelDiscBPressOnPressure,
        WheelDiscBRDNo,
        WheelDiscBWheelDiscParticulars,
        WheelDiscBTopXAxis,
        WheelDiscBTopYAxis,
        WheelDiscBMiddleXAxis,
        WheelDiscBMiddleYAxis,
        WheelDiscBLowerXAxis,
        WheelDiscBLowerYAxis,
        WheelDiscBAvgXAxis,
        WheelDiscBAvgYAxis,
        BrakeDiscABBDSeatSize,
        BrakeDiscAAllow,
        BrakeDiscAPressOnPressure,
        BrakeDiscABDThickness,
        BrakeDiscABrakeDiscParticulars,
        BrakeDiscATopXAxis,
        BrakeDiscATopYAxis,
        BrakeDiscAMiddleXAxis,
        BrakeDiscAMiddleYAxis,
        BrakeDiscALowerXAxis,
        BrakeDiscALowerYAxis,
        BrakeDiscAAvgXAxis,
        BrakeDiscAAvgYAxis,
        BrakeDiscBBBDSeatSize,
        BrakeDiscBAllow,
        BrakeDiscBPressOnPressure,
        BrakeDiscBBDThickness,
        BrakeDiscBBrakeDiscParticulars,
        BrakeDiscBTopXAxis,
        BrakeDiscBTopYAxis,
        BrakeDiscBMiddleXAxis,
        BrakeDiscBMiddleYAxis,
        BrakeDiscBLowerXAxis,
        BrakeDiscBLowerYAxis,
        BrakeDiscBAvgXAxis,
        BrakeDiscBAvgYAxis,
        MCNo,
        Operator,
        Inspector,
        createdBy
      ) VALUES (
        :wheelid,
        :SectionId,
        :DepartmentId,
        :WheeltypeId,
        :WheelNo,
        :AxleNo,
        :ATLNo,
        :WheelSeatSize,
        :BDSeatSize,
        :RAValue,
        :OperatorName,
        :WheelDiscAVTLNO,
        :WheelDiscABoreSizeByOperator,
        :WheelDiscARAValue,
        :WheelDiscAOperatorName,
        :WheelDiscABWheelSeatSize,
        :WheelDiscAAllow,
        :WheelDiscAPressOnPressure,
        :WheelDiscARDNo,
        :WheelDiscAWheelDiscParticulars,
        :WheelDiscATopXAxis,
        :WheelDiscATopYAxis,
        :WheelDiscAMiddleXAxis,
        :WheelDiscAMiddleYAxis,
        :WheelDiscALowerXAxis,
        :WheelDiscALowerYAxis,
        :WheelDiscAAvgXAxis,
        :WheelDiscAAvgYAxis,
        :WheelDiscBVTLNo,
        :WheelDiscBBoreSizeByOperator,
        :WheelDiscBRAValue,
        :WheelDiscBOperatorName,
        :WheelDiscBBWheelSeatSize,
        :WheelDiscBAllow,
        :WheelDiscBPressOnPressure,
        :WheelDiscBRDNo,
        :WheelDiscBWheelDiscParticulars,
        :WheelDiscBTopXAxis,
        :WheelDiscBTopYAxis,
        :WheelDiscBMiddleXAxis,
        :WheelDiscBMiddleYAxis,
        :WheelDiscBLowerXAxis,
        :WheelDiscBLowerYAxis,
        :WheelDiscBAvgXAxis,
        :WheelDiscBAvgYAxis,
        :BrakeDiscABBDSeatSize,
        :BrakeDiscAAllow,
        :BrakeDiscAPressOnPressure,
        :BrakeDiscABDThickness,
        :BrakeDiscABrakeDiscParticulars,
        :BrakeDiscATopXAxis,
        :BrakeDiscATopYAxis,
        :BrakeDiscAMiddleXAxis,
        :BrakeDiscAMiddleYAxis,
        :BrakeDiscALowerXAxis,
        :BrakeDiscALowerYAxis,
        :BrakeDiscAAvgXAxis,
        :BrakeDiscAAvgYAxis,
        :BrakeDiscBBBDSeatSize,
        :BrakeDiscBAllow,
        :BrakeDiscBPressOnPressure,
        :BrakeDiscBBDThickness,
        :BrakeDiscBBrakeDiscParticulars,
        :BrakeDiscBTopXAxis,
        :BrakeDiscBTopYAxis,
        :BrakeDiscBMiddleXAxis,
        :BrakeDiscBMiddleYAxis,
        :BrakeDiscBLowerXAxis,
        :BrakeDiscBLowerYAxis,
        :BrakeDiscBAvgXAxis,
        :BrakeDiscBAvgYAxis,
        :MCNo,
        :Operator,
        :Inspector,
        :createdBy
      )`,
      {
        replacements: {
          wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          WheelNo,
          AxleNo,
          ATLNo,
          WheelSeatSize,
          BDSeatSize,
          RAValue,
          OperatorName,
          WheelDiscAVTLNO,
          WheelDiscABoreSizeByOperator,
          WheelDiscARAValue,
          WheelDiscAOperatorName,
          WheelDiscABWheelSeatSize,
          WheelDiscAAllow,
          WheelDiscAPressOnPressure,
          WheelDiscARDNo,
          WheelDiscAWheelDiscParticulars,
          WheelDiscATopXAxis,
          WheelDiscATopYAxis,
          WheelDiscAMiddleXAxis,
          WheelDiscAMiddleYAxis,
          WheelDiscALowerXAxis,
          WheelDiscALowerYAxis,
          WheelDiscAAvgXAxis,
          WheelDiscAAvgYAxis,
          WheelDiscBVTLNo,
          WheelDiscBBoreSizeByOperator,
          WheelDiscBRAValue,
          WheelDiscBOperatorName,
          WheelDiscBBWheelSeatSize,
          WheelDiscBAllow,
          WheelDiscBPressOnPressure,
          WheelDiscBRDNo,
          WheelDiscBWheelDiscParticulars,
          WheelDiscBTopXAxis,
          WheelDiscBTopYAxis,
          WheelDiscBMiddleXAxis,
          WheelDiscBMiddleYAxis,
          WheelDiscBLowerXAxis,
          WheelDiscBLowerYAxis,
          WheelDiscBAvgXAxis,
          WheelDiscBAvgYAxis,
          BrakeDiscABBDSeatSize,
          BrakeDiscAAllow,
          BrakeDiscAPressOnPressure,
          BrakeDiscABDThickness,
          BrakeDiscABrakeDiscParticulars,
          BrakeDiscATopXAxis,
          BrakeDiscATopYAxis,
          BrakeDiscAMiddleXAxis,
          BrakeDiscAMiddleYAxis,
          BrakeDiscALowerXAxis,
          BrakeDiscALowerYAxis,
          BrakeDiscAAvgXAxis,
          BrakeDiscAAvgYAxis,
          BrakeDiscBBBDSeatSize,
          BrakeDiscBAllow,
          BrakeDiscBPressOnPressure,
          BrakeDiscBBDThickness,
          BrakeDiscBBrakeDiscParticulars,
          BrakeDiscBTopXAxis,
          BrakeDiscBTopYAxis,
          BrakeDiscBMiddleXAxis,
          BrakeDiscBMiddleYAxis,
          BrakeDiscBLowerXAxis,
          BrakeDiscBLowerYAxis,
          BrakeDiscBAvgXAxis,
          BrakeDiscBAvgYAxis,
          MCNo,
          Operator,
          Inspector,
          createdBy
        }
      }
    );

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
});


// app.post("/pressonlhb/data", async (req, res) => {
//   const {
//     SectionId,
//     DepartmentId,
//     WheeltypeId,
//     WheelNo,
//     AxleNo,
//     ATLNo,
//     WheelSeatSize,
//     BDSeatSize,
//     RAValue,
//     OperatorName,
//     WheelDiscAVTLNO,
//     WheelDiscABoreSizeByOperator,
//     WheelDiscARAValue,
//     WheelDiscAOperatorName,
//     WheelDiscABWheelSeatSize,
//     WheelDiscAAllow,
//     WheelDiscAPressOnPressure,
//     WheelDiscARDNo,
//     WheelDiscAWheelDiscParticulars,
//     WheelDiscATopXAxis,
//     WheelDiscATopYAxis,
//     WheelDiscAMiddleXAxis,
//     WheelDiscAMiddleYAxis,
//     WheelDiscALowerXAxis,
//     WheelDiscALowerYAxis,
//     WheelDiscAAvgXAxis,
//     WheelDiscAAvgYAxis,
//     WheelDiscBVTLNo,
//     WheelDiscBBoreSizeByOperator,
//     WheelDiscBRAValue,
//     WheelDiscBOperatorName,
//     WheelDiscBBWheelSeatSize,
//     WheelDiscBAllow,
//     WheelDiscBPressOnPressure,
//     WheelDiscBRDNo,
//     WheelDiscBWheelDiscParticulars,
//     WheelDiscBTopXAxis,
//     WheelDiscBTopYAxis,
//     WheelDiscBMiddleXAxis,
//     WheelDiscBMiddleYAxis,
//     WheelDiscBLowerXAxis,
//     WheelDiscBLowerYAxis,
//     WheelDiscBAvgXAxis,
//     WheelDiscBAvgYAxis,
//     BrakeDiscABBDSeatSize,
//     BrakeDiscAAllow,
//     BrakeDiscAPressOnPressure,
//     BrakeDiscABDThickness,
//     BrakeDiscABrakeDiscParticulars,
//     BrakeDiscATopXAxis,
//     BrakeDiscATopYAxis,
//     BrakeDiscAMiddleXAxis,
//     BrakeDiscAMiddleYAxis,
//     BrakeDiscALowerXAxis,
//     BrakeDiscALowerYAxis,
//     BrakeDiscAAvgXAxis,
//     BrakeDiscAAvgYAxis,
//     BrakeDiscBBBDSeatSize,
//     BrakeDiscBAllow,
//     BrakeDiscBPressOnPressure,
//     BrakeDiscBBDThickness,
//     BrakeDiscBBrakeDiscParticulars,
//     BrakeDiscBTopXAxis,
//     BrakeDiscBTopYAxis,
//     BrakeDiscBMiddleXAxis,
//     BrakeDiscBMiddleYAxis,
//     BrakeDiscBLowerXAxis,
//     BrakeDiscBLowerYAxis,
//     BrakeDiscBAvgXAxis,
//     BrakeDiscBAvgYAxis,
//     MCNo,
//     Operator,
//     Inspector,
//     createdBy,
//   } = req.body;

//   try {
//     // Create a new WheelReport entry
//     const wheelReport = await LHBPressON.create({
//       SectionId,
//       DepartmentId,
//       WheeltypeId,
//       WheelNo,
//       AxleNo,
//       ATLNo,
//       WheelSeatSize,
//       BDSeatSize,
//       RAValue,
//       OperatorName,
//       WheelDiscAVTLNO,
//       WheelDiscABoreSizeByOperator,
//       WheelDiscARAValue,
//       WheelDiscAOperatorName,
//       WheelDiscABWheelSeatSize,
//       WheelDiscAAllow,
//       WheelDiscAPressOnPressure,
//       WheelDiscARDNo,
//       WheelDiscAWheelDiscParticulars,
//       WheelDiscATopXAxis,
//       WheelDiscATopYAxis,
//       WheelDiscAMiddleXAxis,
//       WheelDiscAMiddleYAxis,
//       WheelDiscALowerXAxis,
//       WheelDiscALowerYAxis,
//       WheelDiscAAvgXAxis,
//       WheelDiscAAvgYAxis,
//       WheelDiscBVTLNo,
//       WheelDiscBBoreSizeByOperator,
//       WheelDiscBRAValue,
//       WheelDiscBOperatorName,
//       WheelDiscBBWheelSeatSize,
//       WheelDiscBAllow,
//       WheelDiscBPressOnPressure,
//       WheelDiscBRDNo,
//       WheelDiscBWheelDiscParticulars,
//       WheelDiscBTopXAxis,
//       WheelDiscBTopYAxis,
//       WheelDiscBMiddleXAxis,
//       WheelDiscBMiddleYAxis,
//       WheelDiscBLowerXAxis,
//       WheelDiscBLowerYAxis,
//       WheelDiscBAvgXAxis,
//       WheelDiscBAvgYAxis,
//       BrakeDiscABBDSeatSize,
//       BrakeDiscAAllow,
//       BrakeDiscAPressOnPressure,
//       BrakeDiscABDThickness,
//       BrakeDiscABrakeDiscParticulars,
//       BrakeDiscATopXAxis,
//       BrakeDiscATopYAxis,
//       BrakeDiscAMiddleXAxis,
//       BrakeDiscAMiddleYAxis,
//       BrakeDiscALowerXAxis,
//       BrakeDiscALowerYAxis,
//       BrakeDiscAAvgXAxis,
//       BrakeDiscAAvgYAxis,
//       BrakeDiscBBBDSeatSize,
//       BrakeDiscBAllow,
//       BrakeDiscBPressOnPressure,
//       BrakeDiscBBDThickness,
//       BrakeDiscBBrakeDiscParticulars,
//       BrakeDiscBTopXAxis,
//       BrakeDiscBTopYAxis,
//       BrakeDiscBMiddleXAxis,
//       BrakeDiscBMiddleYAxis,
//       BrakeDiscBLowerXAxis,
//       BrakeDiscBLowerYAxis,
//       BrakeDiscBAvgXAxis,
//       BrakeDiscBAvgYAxis,
//       MCNo,
//       Operator,
//       Inspector,
//       createdBy,
//     });

//     // console.log("Data saved successfully:", wheelReport);

//     res.status(200).json(wheelReport);

//     console.log("Data saved successfully:", res);
//   } catch (error) {
//     console.error("Error saving data to the database:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });


//------------------------------ Press-OFF Of LHB Wheel Api's ----------------------------------------------------------------------------

app.get("/pressofflhb/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressOff.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/pressofflhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBPressOff.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// app.post("/pressofflhb/data", async (req, res) => {
//   const {
//     wheelid,
//     SectionID,
//     DepartmentID,
//     WheeltypeID,
//     Date,
//     OperatorTNo,
//     InspectorTNo,
//     ShopSNo,
//     TypeOfWheel,
//     WheelPressedOff,
//     DiscSrNo,
//     AxleNo,
//     Reason,
//     PressedOffRemark,
//     createdBy,
//   } = req.body;

//   try {
//     // Create a new WheelReport entry
//     const wheelReport = await LHBPressOff.create({
//       // wheelid,
//       wheelid,
//       SectionID,
//       DepartmentID,
//       WheeltypeID,
//       Date,
//       OperatorTNo,
//       InspectorTNo,
//       ShopSNo,
//       TypeOfWheel,
//       WheelPressedOff,
//       DiscSrNo,
//       AxleNo,
//       Reason,
//       PressedOffRemark,
//       createdBy,
//     });

//     // console.log("Data saved successfully:", wheelReport);

//     res.status(200).json(wheelReport);

//     console.log("Data saved successfully:", res);
//   } catch (error) {
//     console.error("Error saving data to the database:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.post("/pressofflhb/data", async (req, res) => {
  const {
    wheelid,
    SectionID,
    DepartmentID,
    WheeltypeID,
    Date,
    OperatorTNo,
    InspectorTNo,
    ShopSNo,
    TypeOfWheel,
    WheelPressedOff,
    DiscSrNo,
    AxleNo,
    Reason,
    PressedOffRemark,
    createdBy,
  } = req.body;

  try {
    // Raw SQL query to insert data
    // await sequelize.query(`SET IDENTITY_INSERT PressOff ON`);
    await sequelize.query(
      `INSERT INTO PressOff (
        wheelid,
        SectionID,
        DepartmentID,
        WheeltypeID,
        Date,
        OperatorTNo,
        InspectorTNo,
        ShopSNo,
        TypeOfWheel,
        WheelPressedOff,
        DiscSrNo,
        AxleNo,
        Reason,
        PressedOffRemark,
        createdBy
      ) VALUES (
        :wheelid,
        :SectionID,
        :DepartmentID,
        :WheeltypeID,
        :Date,
        :OperatorTNo,
        :InspectorTNo,
        :ShopSNo,
        :TypeOfWheel,
        :WheelPressedOff,
        :DiscSrNo,
        :AxleNo,
        :Reason,
        :PressedOffRemark,
        :createdBy
      )`,
      {
        replacements: {
          wheelid,
          SectionID,
          DepartmentID,
          WheeltypeID,
          Date,
          OperatorTNo,
          InspectorTNo,
          ShopSNo,
          TypeOfWheel,
          WheelPressedOff,
          DiscSrNo,
          AxleNo,
          Reason,
          PressedOffRemark,
          createdBy,
        },
        type: QueryTypes.INSERT,
      }
    );

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------Press-Off/final Inspection (Pending Tasks Page) Api's -----------------------------------------------------------

app.get("/summaryreport/heavyrepair/pressofftable", async (req, res) => {
  try {
    const heavyrepairData = await SummaryReport.findAll({
      where: {
        TypeofRepair: "HeavyRepair",
        // attributes: ['WheelNo', 'DateOfEntry']
      },
    });

    res.json(heavyrepairData);
  } catch (error) {
    console.error("Error fetching heavy repair data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get(
  "/summaryreport/normalrepair/finalinspectiontable",
  async (req, res) => {
    try {
      const normalRepairData = await SummaryReport.findAll({
        where: {
          TypeOfRepair: "NormalRepair",
          DepartmentId: 2,
        },
      });
      res.json(normalRepairData);
    } catch (error) {
      console.log("Error fetching Normal Repair Data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get(
  "/summaryreport/dataComingFromPressOn/finalinspectiontable",
  async (req, res) => {
    try {
      const pressOnApprovedData = await SummaryReport.findAll({
        where: {
          DepartmentID:3,
          WheelStageName:"LHBPressOn"
        },
      });
      res.json(pressOnApprovedData);
    } catch (error) {
      console.log("Error fetching Press On Approved Data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/summaryreport/pendingdataof/pressontable", async (req, res) => {
  try {
    const pressOnPendingData = await SummaryReport.findAll({
      where: {
        // SectionID: 1,
        // DepartmentID: 1,
        // WheeltypeID: 1,
        WheelStageName:"LHBPressOff",
      },
    });
    res.json(pressOnPendingData);
  } catch (error) {
    console.log("Error fetching press on pending Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/summaryreport/pendingdataof/dispatchtable", async (req, res) => {
  try {
    const dispatchPendingData = await SummaryReport.findAll({
      where: {
        // SectionID: 1,
        DepartmentID: 4,
        // WheeltypeID: 1,
        WheelStageName:"LHBFinalInspection",
      },
    });
    res.json(dispatchPendingData);
  } catch (error) {
    console.log("Error fetching dispatch pending Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------ Wheel Dispatch Record Api's ----------------------------------------------------------------------------
app.get("/dispatch/getdata/:WheelNo", async (req, res) => {
  const wheelno = req.params.WheelNo;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await WheelsDispatchRecord.findAll({
      where: {
        WheelNo: wheelno, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/dispatch/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await WheelsDispatchRecord.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/dispatch/data", async (req, res) => {
  const {
    wheelid,
    date,
    DivisionCarshed,
    LooryNo,
    WheelNo,
    TypeOfWheel,
    TradeDiameter,
    WheelGauge,
    AxleUSTCode,
    remark,
    createdBy,
    SectionId,
    DepartmentId,
    WheeltypeId,
  } = req.body;

  try {
    // Custom query to insert data into the LHBScheduledPreIinspection table
    const query = `
      INSERT INTO WheelsDispatchRecord 
        (wheelid,SectionId, DepartmentId, WheeltypeId, date, DivisionCarshed, LooryNo, WheelNo, TypeOfWheel, 
         TradeDiameter, WheelGauge, AxleUSTCode, remark, createdBy, createdDate, isActive) 
      VALUES 
        (:wheelid,:SectionId, :DepartmentId, :WheeltypeId, :date, :DivisionCarshed, :LooryNo, :WheelNo, :TypeOfWheel, 
         :TradeDiameter, :WheelGauge, :AxleUSTCode, :remark,  :createdBy, GETDATE(), 1)
    `;

    // Execute the custom query
    const [result, metadata] = await sequelize.query(query, {
      replacements: {
        wheelid,
        date,
        DivisionCarshed,
        LooryNo,
        WheelNo,
        TypeOfWheel,
        TradeDiameter,
        WheelGauge,
        AxleUSTCode,
        remark,
        createdBy,
        SectionId,
        DepartmentId,
        WheeltypeId,
      },
    });

    res.status(200).json({ message: "Data saved successfully", result });

    console.log("Data saved successfully:", result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ Server ----------------------------------------------------------------------------
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected...");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
