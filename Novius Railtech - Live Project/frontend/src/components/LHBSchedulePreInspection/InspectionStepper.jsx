import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function InspectionStepper({ activeStep }) {
  const steps = [
    "Details",
    "Coach Details",
    "BD Details",
    "Rod Gauge And Sound Details",
    "Repair And UST Details",
    "Disc Particular/CTRB Details"
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
