import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import AllEntryFinal from './AllEntry';

function ParentLHBFinal() {

    const [formDataFinal, setFormDataFinal] = useState({
        SectionId: 1,
        DepartmentId: 4,
        WheeltypeId: 1,
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
  return (
    <div>
        {/* <Router> */}
        <Routes>
          {/* <Route
            path="/"
            element={<Navigate to="/lhbfinalinspection" replace />}
          /> */}
          <Route
            path="/lhbfinalinspection/*"
            element={
              <LHBFinalInspection
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/proceedsubmit"
            element={
              <ProceedSubmit formData={formData} setFormData={setFormData} />
            }
          />
          <Route path="/viewallentryFinal" element={<AllEntryFinal />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLHBFinal