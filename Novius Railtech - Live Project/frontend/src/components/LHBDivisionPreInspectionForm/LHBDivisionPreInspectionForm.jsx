import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import WheelDetails from "./WheelDetails.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import ReportDetails from "./ReportDetails.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function LHBDivisionPreInspectionForm({
  formDataDivision,
  setFormDataDivision,
}) {

  const [activeStep, setActiveStep] = useState(0);

   // Function to move to the next step
   const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 1));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataDivision((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <>
      <h1 style={{ marginTop: "10px", textAlign: "left" }}></h1>
      <Breadcrumbs />
      <InspectionStepper activeStep={activeStep} />
      <hr></hr>
      <div className="containerLHB">
        <SidebarLHB />
        <div className="content">
          <div>
            <Routes>
              <Route
                path="wheel_details"
                element={
                  <WheelDetails
                    // formData={formData}
                    // setFormData={setFormData}
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="report_details"
                element={
                  <ReportDetails
                    // formData={formData}
                    // setFormData={setFormData}
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {/* </Router> */}
    </>
  );
}

export default LHBDivisionPreInspectionForm;
