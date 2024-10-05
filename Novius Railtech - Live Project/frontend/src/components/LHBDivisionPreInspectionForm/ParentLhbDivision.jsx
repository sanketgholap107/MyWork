import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import LHBDivisionPreInspectionForm from './LHBDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivision from './ProceedSubmitDivision';
import AllEntryDivision from './AllEntryDivision';

function ParentLhbDivision() {
    const [formDataDivision, setFormDataDivision] = useState({
        WheelNo: "",
        LooryNo: "",
        POHDate: "",
        returndate: "",
        divisionreport: "",
        matungareport: "",
        SectionId: 1,
        DepartmentId:1,
        WheeltypeId:1,
        createdBy: "ADMIN",
        modifiedBy: "admin",
        modifiedDate:"",
      });
  return (
    <div>
        {/* <Router> */}
        <Routes>
          {/* <Route
            path="/"
            element={<Navigate to="/LHBDivisionPreInspectionForm" replace />}
          /> */}
          <Route
            path="/LHBDivisionPreInspectionForm/*"
            element={
              <LHBDivisionPreInspectionForm
                formDataDivision={formDataDivision}
                setFormDataDivision={setFormDataDivision}
              />
            }
          />
          <Route
            path="/proceedsubmitLHBDivision"
            element={
              <ProceedSubmitDivision formDataDivision={formDataDivision} setFormDataDivision={setFormDataDivision} />
            }
          />
          <Route path="/viewallentryLHBDivision" element={<AllEntryDivision />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLhbDivision