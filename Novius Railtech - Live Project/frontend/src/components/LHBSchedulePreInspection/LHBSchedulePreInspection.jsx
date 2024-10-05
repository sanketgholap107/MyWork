import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./Details.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import DiscParticularOrCTRBDetails from "./DiscParticularOrCTRBDetails.jsx";
import BDDetails from "./BDDetails.jsx";
import CoachDetails from "./CoachDetails.jsx";
import RepairAndUSTDetails from "./RepairAndUSTDetails.jsx";
import RodGaugeAndSoundDetails from "./RodGaugeAndSoundDetails.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function LHBSchedulePreInspection({ formData, setFormData }) {
  // State for stepper
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
    setFormData((prevState) => ({
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
        <div>
          <SidebarLHB />
        </div>
        <div className="contentLHB">
          <div>
            <Routes>
              <Route
                path="details"
                element={
                  <Details
                    formData={formData}
                    setFormData={setFormData}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="discparticularOrCTRB_details"
                element={
                  <DiscParticularOrCTRBDetails
                    formData={formData}
                    setFormData={setFormData}
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
                    formData={formData}
                    setFormData={setFormData}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="Rodgaugeandsound_details"
                element={
                  <RodGaugeAndSoundDetails
                    formData={formData}
                    setFormData={setFormData}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="coach_details"
                element={
                  <CoachDetails
                    formData={formData}
                    setFormData={setFormData}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="repairandust_details"
                element={
                  <RepairAndUSTDetails
                    formData={formData}
                    setFormData={setFormData}
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

export default LHBSchedulePreInspection;
