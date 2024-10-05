import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function RodGaugeAndSoundDetails({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const [isBackNavigation, setIsBackNavigation] = useState(false); // State to track back navigation
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file); // Set the single file to state
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.RodGaugeIN) {
      newErrors.RodGaugeIN = "Rod Gauge IN is required.";
    }
    // else if (!/^\d+$/.test(formData.CoachNumber)) {
    //   newErrors.CoachNumber = "Coach Number must be numeric.";
    // }

    if (!formData.RodGaugeOUT) {
      newErrors.RodGaugeOUT = "Rod Gauge OUT is required.";
    }
    // else if (!/^\d+$/.test(formData.DiameterIN)) {
    //   newErrors.DiameterIN = "Diameter IN must be numeric.";
    // }

    if (!formData.SoundTestIN) {
      newErrors.SoundTestIN = "Sound Test IN is required.";
    }
    // else if (!/^\d+$/.test(formData.DiameterOUT)) {
    //   newErrors.DiameterOUT = "Diameter OUT must be numeric.";
    // }

    if (!formData.SoundTestOUT) {
      newErrors.SoundTestOUT = "Sound Test OUT is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormData((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/LHBSchedulePreInspection/axle_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/LHBSchedulePreInspection/bd_details");
  };


  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
       // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/repairandust_details");
    }
  };

  return (
    <div className="component">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        LHB SCHEDULE PRE INSPECTION FORM{" "}
      </h2>
      <h2>Rod Gauge and Sound Details for LHB SCHEDULE PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Rod Gauge IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="RodGaugeIN"
                  value={formData.RodGaugeIN}
                  onChange={handleChange}
                  placeholder="Enter Rod Gauge IN"
                />
                {errors.RodGaugeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RodGaugeIN}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Rod Gauge OUT:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="RodGaugeOUT"
                  value={formData.RodGaugeOUT}
                  onChange={handleChange}
                  placeholder="Enter Rod Gauge OUT"
                />
                {errors.RodGaugeOUT && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RodGaugeOUT}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Sound Test IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="SoundTestIN"
                  value={formData.SoundTestIN}
                  onChange={handleChange}
                  placeholder="Enter Sound Test IN"
                />
                {errors.SoundTestIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.SoundTestIN}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Sound Test OUT:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="SoundTestOUT"
                  value={formData.SoundTestOUT}
                  onChange={handleChange}
                  placeholder="Enter Sound Test OUT"
                />
                {errors.SoundTestOUT && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.SoundTestOUT}
                  </p>
                )}
              </div>

              <div className="file-container">
                <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image:
                </span>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="upload-icon">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="drag-drop">Drag & drop files</span>
                  <span className="drag-or">---------- or ----------</span>
                  <button className="browse-button">Browse</button>
                </div>
                <div className="uploading-section">
                  {file ? (
                    <div className="file-row">
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <span style={{ marginTop: "5px" }}>
                      No image uploaded yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formData.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
            </div>

            <div className="btn-container">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button
                onClick={handleBack}
              >
                Back
              </button>
              <button className="red_btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RodGaugeAndSoundDetails;
