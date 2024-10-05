import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import LHBPressOffForm from './LHBPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import ProceedSubmitPressOff from './ProceedSubmitPressOff';

function ParentLhbPressOff() {
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
        SectionId: 1,
        DepartmentId: 1,
        WheeltypeId: 1,
        createdBy: "ADMIN",
        modifiedBy: "admin",
        modifiedDate: "",
      });
    
      return (
        <div className="App">
          {/* <Router> */}
            <Routes>
              {/* <Route
                path="/"
                element={<Navigate to="/LHBPressOffForm" replace />}
              /> */}
              <Route
                path="/LHBPressOffForm/*"
                element={
                  <LHBPressOffForm
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                  />
                }
              />
              <Route
                path="/proceedsubmitpressoff"
                element={
                  <ProceedSubmitPressOff formDataPressOffLHB={formDataPressOffLHB} setFormDataPressOffLHB={setFormDataPressOffLHB} />
                }
              />
              <Route path="/viewallentrypressoff" element={<AllEntryPressOff />} />
            </Routes>
          {/* </Router> */}
        </div>
      );
}

export default ParentLhbPressOff