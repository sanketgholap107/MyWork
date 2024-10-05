import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LHBSchedulePreInspection from "./LHBSchedulePreInspection";
import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
import AllEntry from "../LHBPreInspection/AllEntry";

function ParentLhb() {
    const [formData, setFormData] = useState({
        ShopSrNo: "",
        AxleNumber:"",
          ReceiveDate: "",
          DispatchDate: "",
          CoachNo:"",
          Diameter: "",
          DiameterINOUT: "",
          Flage: "",
          FlageINOUT:"",
          BDMake: "",
          BDSize:"",
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
        SectionId:1,
              DepartmentId: 2,
              WheeltypeId:1,
      });
    
  return (
    // <Router>
        <Routes>
          {/* <Route
            path="/"
            element={<Navigate to="/LHBSchedulePreInspection" replace />}
          /> */}
          <Route
            path="/LHBSchedulePreInspection/*"
            element={
              <LHBSchedulePreInspection
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
          <Route path="/viewallentry" element={<AllEntry />} />
        </Routes>
    //   </Router>
  );
}

export default ParentLhb;
