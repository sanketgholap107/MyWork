import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CoachDetails({
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
    if (!formData.CoachNumber) {
      newErrors.CoachNumber = "Coach Number is required.";
    } else if (!/^\d+$/.test(formData.CoachNumber)) {
      newErrors.CoachNumber = "Coach Number must be numeric.";
    }

    if (!formData.DiameterIN) {
      newErrors.DiameterIN = "Diameter IN is required.";
    } else if (!/^\d+$/.test(formData.DiameterIN)) {
      newErrors.DiameterIN = "Diameter IN must be numeric.";
    }

    if (!formData.DiameterOUT) {
      newErrors.DiameterOUT = "Diameter OUT is required.";
    } else if (!/^\d+$/.test(formData.DiameterOUT)) {
      newErrors.DiameterOUT = "Diameter OUT must be numeric.";
    }

    if (!formData.FlageIN) {
      newErrors.FlageIN = "Flage IN is required.";
    }
    if (!formData.FlageOUT) {
      newErrors.FlageOUT = "Flage OUT is required.";
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
    navigate("/LHBSchedulePreInspection/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/LHBSchedulePreInspection/details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // setIsBackNavigation(false); // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/bd_details");
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
      <h2>COACH Details for LHB SCHEDULE PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Coach No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CoachNumber"
                  value={formData.CoachNumber}
                  onChange={handleChange}
                  placeholder="Enter Coach No."
                />
                {errors.CoachNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CoachNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Diameter IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiameterIN"
                  value={formData.DiameterIN}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN"
                />
                {errors.DiameterIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiameterIN}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Diameter OUT:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiameterOUT"
                  value={formData.DiameterOUT}
                  onChange={handleChange}
                  placeholder="Enter Diameter OUT"
                />
                {errors.DiameterOUT && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiameterOUT}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Flage IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FlageIN"
                  value={formData.FlageIN}
                  onChange={handleChange}
                  placeholder="Enter Flage IN"
                />
                {errors.FlageIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FlageIN}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Flage OUT:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FlageOUT"
                  value={formData.FlageOUT}
                  onChange={handleChange}
                  placeholder="Enter Flage OUT"
                />
                {errors.FlageOUT && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FlageOUT}
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
              <button onClick={handleBack}>Back</button>
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

export default CoachDetails;
