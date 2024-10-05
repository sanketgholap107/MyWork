import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import { useState } from "react";
import ProceedSubmitWheelDispatch from './ProceedSubmitWheelDispatch';

function ParentLHBWheelDispatchRecordForm() {
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
        SectionId: 1,
        DepartmentId: 5,
        WheeltypeId: 1,
      });
    
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          {/* <Route
            path="/"
            element={<Navigate to="/wheelsdispatchrecordform" replace />}
          /> */}
          <Route
            path="/wheelsdispatchrecordform/*"
            element={
              <WheelDispatchRecordForm
                formDataWheelDispatch={formDataWheelDispatch}
                setformDataWheelDispatch={setformDataWheelDispatch}
              />
            }
          />
          <Route
            path="/proceedsubmitlhbwheelsdispatch"
            element={
              <ProceedSubmitWheelDispatch formDataWheelDispatch={formDataWheelDispatch} setformDataWheelDispatch={setformDataWheelDispatch} />
            }
          />
          <Route path="/viewallentrylhbwheelsdispatch" element={<AllEntry />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLHBWheelDispatchRecordForm