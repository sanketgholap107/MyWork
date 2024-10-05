import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function InspectionStepper({ activeStep }) {
  const steps = [
    "Axle Details",
    "Wheel Details",
    "Journal Details",
    "BD Details",
    "BRG Details",
    "General Inspection",
  ];

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default InspectionStepper;
