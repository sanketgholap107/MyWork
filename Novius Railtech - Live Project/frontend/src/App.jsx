import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import AddWheel from "./components/AddWheel";
import PendingTasks from "./components/PendingTasks";
import "./App.css";
// import ParentLhb from "./components/LHBPreInspection/ParentLhb";
// import LHBPreInspection from "./components/LHBPreInspection/LHBPreInspection";
import LoginForm from "./components/Login";
import LHBSchedulePreInspection from "./components/LHBSchedulePreInspection/LHBSchedulePreInspection";
import ProceedSubmit from "./components/LHBSchedulePreInspection/ProceedSubmit";
import AllEntry from "./components/LHBSchedulePreInspection/AllEntry";
import LHBDivisionPreInspectionForm from "./components/LHBDivisionPreInspectionForm/LHBDivisionPreInspectionForm";
import ProceedSubmitDivision from "./components/LHBDivisionPreInspectionForm/ProceedSubmitDivision";
import AllEntryDivision from "./components/LHBDivisionPreInspectionForm/AllEntryDivision";
import LHBFinalInspection from "./components/LHBFinalinspection/LHBFinalInspection";
import ProceedSubmitFinal from "./components/LHBFinalinspection/ProceedSubmit";
import AllEntryFinal from "./components/LHBFinalinspection/AllEntry";
import LHBPressOffForm from "./components/LHBPressOffForm/LHBPressOffForm";
import ProceedSubmitPressOff from "./components/LHBPressOffForm/ProceedSubmitPressOff";
import AllEntryPressOff from "./components/LHBPressOffForm/AllEntryPressOff";
import ProtectedRoute from "./components/ProtectedRoute";
import ProceedSubmitPressOn from "./components/LHBPressOnForm/ProceedSubmitPressOn";
import LHBPressOnForm from "./components/LHBPressOnForm/LHBPressOnForm";
import AllEntryPressOn from "./components/LHBPressOnForm/AllEntryPressOn";
import ProceedSubmitWheelDispatch from "./components/LHBWheelDispatchRecordForm/ProceedSubmitWheelDispatch";
import AllEntryWheelDispatch from "./components/LHBWheelDispatchRecordForm/AllEntryWheelDispatch";
import Wheelsdispatchrecordform from "./components/LHBWheelDispatchRecordForm/WheelDispatchRecordForm";

function App() {
  const [formData, setFormData] = useState({
    ShopSrNo: "",
    AxleNumber: "",
    ReceiveDate: "",
    DispatchDate: "",
    CoachNo: "",
    Diameter: "",
    DiameterINOUT: "",
    Flage: "",
    FlageINOUT: "",
    BDMake: "",
    BDSize: "",
    BDSizeINOUT: "",
    RODGauge: "",
    RODGaugeINOUT: "",
    SoundTest: "",
    SoundTestINOUT: "",
    TypeOfRepair: "",
    USTName: "",
    MatungaRemark: "",
    InspectorSign: "",
    DiscParticularA: "",
    DiscParticularB: "",
    CTRBA: "",
    CTRBB: "",
    createdBy: "ADMIN",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 1,
  });

  const [formDataDivision, setFormDataDivision] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    // returndate: "",
    divisionreport: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  const [formDataFinal, setFormDataFinal] = useState({
    SectionId: 1,
    DepartmentId: 4,
    WheeltypeId: 1,
    WheelNo:"",
    Shift:"",
    wheelid:"",
    AxleNo: "",
    ABSide: "",
    WheelDia: "",
    WheelRG: "",
    WheelFLG: "",
    FC: "",
    Size: "",
    Oval: "",
    Tap: "",
    ShoulderSize: "",
    JrWaiviness: "",
    BDMake: "",
    BDSize: "",
    EndHole: "",
    BRGRemainLife: "",
    BRGMake: "",
    BRGNo: "",
    MEP: "",
    USTName: "",
    FittingDt: "",
    ECATest: "",
    InspectorSign: "",
    createdBy: "ADMIN",
  });

  const [formDataPressOffLHB, setFormDataPressOffLHB] = useState({
    Date: "",
    OperatorTNo: "",
    InspectorTNo: "",
    ShopSNo: "",
    TypeOfWheel: "",
    WheelPressedOff: "",
    DiscSrNo: "",
    AxleNo: "",
    Reason: "",
    Remark: "",
    wheelid:"",
    SectionID: 1,
    DepartmentID: 2,
    WheeltypeID: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  const [formDataPressOnLHB, setFormDataPressOnLHB] = useState({
    WheelNo:"",
    AxleNo:"",
    ATLNo:"",
    WheelSeatSize:"",
    BDSeatSize:"",
    RAValue:"",
    OperatorName:"",
    WheelDiscAVTLNO:"",
    WheelDiscABoreSizeByOperator:"",
    WheelDiscARAValue:"",
    WheelDiscAOperatorName:"",
    WheelDiscAABoreSize:"",
    WheelDiscABWheelSeatSize:"",
    WheelDiscAAllow:"",
    WheelDiscAPressOnPressure:"",
    WheelDiscARDNo:"",
    WheelDiscAWheelDiscParticulars:"",
    WheelDiscATopXAxis:"",
    WheelDiscATopYAxis:"",
    WheelDiscAMiddleXAxis:"",
    WheelDiscAMiddleYAxis:"",
    WheelDiscALowerXAxis:"",
    WheelDiscALowerYAxis:"",
    WheelDiscAAvgXAxis:"",
    WheelDiscAAvgYAxis:"",
    WheelDiscBVTLNo:"",
    WheelDiscBBoreSizeByOperator:"",
    WheelDiscBRAValue:"",
    WheelDiscBOperatorName:"",
    WheelDiscBABoreSize:"",
    WheelDiscBBWheelSeatSize:"",
    WheelDiscBAllow:"",
    WheelDiscBPressOnPressure:"",
    WheelDiscBRDNo:"",
    WheelDiscBWheelDiscParticulars:"",
    WheelDiscBTopXAxis:"",
    WheelDiscBTopYAxis:"",
    WheelDiscBMiddleXAxis:"",
    WheelDiscBMiddleYAxis:"",
    WheelDiscBLowerXAxis:"",
    WheelDiscBLowerYAxis:"",
    WheelDiscBAvgXAxis:"",
    WheelDiscBAvgYAxis:"",
    BrakeDiscAABoreSize:"",
    BrakeDiscABBDSeatSize:"",
    BrakeDiscAAllow:"",
    BrakeDiscAPressOnPressure:"",
    BrakeDiscABDThickness:"",
    BrakeDiscABrakeDiscParticulars:"",
    BrakeDiscATopXAxis:"",
    BrakeDiscATopYAxis:"",
    BrakeDiscAMiddleXAxis:"",
    BrakeDiscAMiddleYAxis:"",
    BrakeDiscALowerXAxis:"",
    BrakeDiscALowerYAxis:"",
    BrakeDiscAAvgXAxis:"",
    BrakeDiscAAvgYAxis:"",
    BrakeDiscBABoreSize:"",
    BrakeDiscBBBDSeatSize:"",
    BrakeDiscBAllow:"",
    BrakeDiscBPressOnPressure:"",
    BrakeDiscBBDThickness:"",
    BrakeDiscBBrakeDiscParticulars:"",
    BrakeDiscBTopXAxis:"",
    BrakeDiscBTopYAxis:"",
    BrakeDiscBMiddleXAxis:"",
    BrakeDiscBMiddleYAxis:"",
    BrakeDiscBLowerXAxis:"",
    BrakeDiscBLowerYAxis:"",
    BrakeDiscBAvgXAxis:"",
    BrakeDiscBAvgYAxis:"",
    MCNo:"",
    Operator:"",
    Inspector:"",  
    wheelid:"",  
    SectionId: 1,
    DepartmentId:3,
    WheeltypeId:1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate:"",
  });

  const [formDataWheelDispatch, setformDataWheelDispatch] = useState({
    date: "",
    DivisionCarshed: "",
    LooryNo: "",
    WheelNo: "",
    TypeOfWheel: "",
    TradeDiameter: "",
    WheelGauge: "",
    AxleUSTCode: "",
    remark: "",
    createdBy: "ADMIN",
    wheelid:"",
    SectionId: 1,
    DepartmentId: 5,
    WheeltypeId: 1,
  });
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add_wheel" element={<AddWheel />} />
            <Route path="/pending_tasks" element={<PendingTasks />} />
            <Route path="/lhbpreinspection/*" element={<LHBPreInspection />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_wheel"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddWheel />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending_tasks"
            element={
              <ProtectedRoute>
                <Layout>
                  <PendingTasks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/LHBSchedulePreInspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBSchedulePreInspection
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/LHBDivisionPreInspectionForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBDivisionPreInspectionForm
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/LHBPressOffForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBPressOffForm
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmitpressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitPressOff
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentrypressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryPressOff />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmit"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmit
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentry"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntry />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitLHBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitDivision
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentryLHBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryDivision />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/lhbfinalinspection/*" element={<Layout> </Layout>} /> */}
          <Route
            path="/lhbfinalinspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBFinalInspection
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmitFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitFinal
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentryFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryFinal />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
                path="/LHBPressOnForm/*"
                element={
                  <Layout>
                  <LHBPressOnForm
                  formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
                  />
                  </Layout>
                }
              />
              <Route
                path="/proceedsubmitlhbpresson"
                element={
                  <Layout>
                  <ProceedSubmitPressOn formDataPressOnLHB={formDataPressOnLHB} setFormDataPressOnLHB={setFormDataPressOnLHB} />
                  </Layout>
                }
              />
              <Route path="/viewallentrylhbpresson" element={<Layout><AllEntryPressOn /></Layout>} />

              <Route
            path="/wheelsdispatchrecordform/*"
            element={
              <Layout>
              <Wheelsdispatchrecordform
                formDataWheelDispatch={formDataWheelDispatch}
                setformDataWheelDispatch={setformDataWheelDispatch}
              />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmitlhbwheelsdispatch"
            element={
              <Layout>
              <ProceedSubmitWheelDispatch formDataWheelDispatch={formDataWheelDispatch} setformDataWheelDispatch={setformDataWheelDispatch} />
              </Layout>
            }
          />
          <Route path="/viewallentrylhbwheelsdispatch" element={<Layout><AllEntryWheelDispatch /></Layout>} />
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}

export default App;
