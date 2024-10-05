import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarLHB from "./SidebarLHB.jsx";
import WheelDetails from "./WheelDetails.jsx";
import DivisionorCarshedDetails from "./DivisionorCarshedDetails.jsx";
import WheelsDispatchBreadcrumbs from "./WheelsDispatchBreadcrumbs.jsx";
import WheelsDispatchStepper from "./WheelsDispatchStepper.jsx";


function Wheelsdispatchrecordform({ formDataWheelDispatch, setformDataWheelDispatch }) {


  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 9));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };


  // Function to update form data
  const handleInputChange = (name, value) => {
    setformDataWheelDispatch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 style={{ marginTop: "80px", textAlign: "left" }}></h1>
      <WheelsDispatchBreadcrumbs />
      <WheelsDispatchStepper activeStep={activeStep} />
      <hr></hr>

      <div className="containerLHB">


        <div>
          <SidebarLHB />
        </div>
        <div className="contentLHB">

          <div>


            <Routes>

              <Route
                path="wheel_details"
                element={
                  <WheelDetails
                    formDataWheelDispatch={formDataWheelDispatch}
                    setformDataWheelDispatch={setformDataWheelDispatch}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="divisionorcarshed_details"
                element={
                  <DivisionorCarshedDetails
                    formDataWheelDispatch={formDataWheelDispatch}
                    setformDataWheelDispatch={setformDataWheelDispatch}
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

export default Wheelsdispatchrecordform;
