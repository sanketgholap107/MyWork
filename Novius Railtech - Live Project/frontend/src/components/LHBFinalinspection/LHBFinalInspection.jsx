import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AxleDetails from "./AxleDetails.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import Wheeldetails from "./WheelDetails.jsx";
import JournalDetails from "./JournalDetails.jsx";
import BDDetails from "./BDDetails.jsx";
import BRGDetails from "./BRGDetails.jsx";
import GeneralInspection from "./GeneralInspection.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function LHBFinalInspection({ formDataFinal, setFormDataFinal }) {
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataFinal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 style={{ marginTop: "20px", textAlign: "left" }}></h1>
      <Breadcrumbs />
      <InspectionStepper activeStep={activeStep} />
      <hr></hr>
      <div className="containerLHB">
        <div>
          <SidebarLHB setActiveStep={setActiveStep} />
        </div>
        <div className="contentLHB">
          {/* <div> */}
          {/* <div className="form_headline">
              <select>
                <option>need to write something here !</option>
                <option></option>
              </select>
            </div> */}
          {/* </div> */}
          <div>
            {" "}
            {/* Content section for routed components */}
            <Routes>
              <Route
                path="axle_details"
                element={
                  <AxleDetails
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheel_details"
                element={
                  <Wheeldetails
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="journal_details"
                element={
                  <JournalDetails
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="bd_details"
                element={
                  <BDDetails
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="brg_details"
                element={
                  <BRGDetails
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="general_details"
                element={
                  <GeneralInspection
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
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

export default LHBFinalInspection;
