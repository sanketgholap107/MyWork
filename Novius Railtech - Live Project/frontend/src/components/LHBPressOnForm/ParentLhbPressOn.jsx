import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import AllEntryPressOn from './AllEntryPressOn';
import ProceedSubmitPressOn from './ProceedSubmitPressOn';
import LHBPressOnForm from './LHBPressOnForm';

function ParentLhbPressOn() {
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
        SectionId: 1,
        DepartmentId:1,
        WheeltypeId:1,
        createdBy: "ADMIN",
        modifiedBy: "admin",
        modifiedDate:"",
      });
    
      return (
        <div className="App">
          {/* <Router> */}
            <Routes>
              {/* <Route
                path="/"
                element={<Navigate to="/LHBPressOnForm" replace />}
              /> */}
              <Route
                path="/LHBPressOnForm/*"
                element={
                  <LHBPressOnForm
                  formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
                  />
                }
              />
              <Route
                path="/proceedsubmitlhbpresson"
                element={
                  <ProceedSubmitPressOn formDataPressOnLHB={formDataPressOnLHB} setFormDataPressOnLHB={setFormDataPressOnLHB} />
                }
              />
              <Route path="/viewallentrylhbpresson" element={<AllEntryPressOn />} />
            </Routes>
          {/* </Router> */}
        </div>
      );
}

export default ParentLhbPressOn