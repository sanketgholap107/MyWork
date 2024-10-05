import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BDDetails({
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
    if (!formData.BDMake) {
      newErrors.BDMake = "BD Make is required.";
    }
    // else if (!/^\d+$/.test(formData.CoachNumber)) {
    //   newErrors.CoachNumber = "Coach Number must be numeric.";
    // }

    if (!formData.BDSizeIN) {
      newErrors.BDSizeIN = "BD Size IN is required.";
    }
    // else if (!/^\d+$/.test(formData.DiameterIN)) {
    //   newErrors.DiameterIN = "Diameter IN must be numeric.";
    // }

    if (!formData.BDSizeOUT) {
      newErrors.BDSizeOUT = "BD Size OUT is required.";
    }
    // else if (!/^\d+$/.test(formData.DiameterOUT)) {
    //   newErrors.DiameterOUT = "Diameter OUT must be numeric.";
    // }

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
    navigate("/LHBSchedulePreInspection/coach_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // setIsBackNavigation(false); // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/Rodgaugeandsound_details");
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
      <h2>BD Details for LHB SCHEDULE PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  BD Make:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDMake"
                  value={formData.BDMake}
                  onChange={handleChange}
                  placeholder="Enter BD Make"
                />
                {errors.BDMake && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDMake}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Size IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDSizeIN"
                  value={formData.BDSizeIN}
                  onChange={handleChange}
                  placeholder="Enter BD Size IN"
                />
                {errors.BDSizeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDSizeIN}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Size OUT:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDSizeOUT"
                  value={formData.BDSizeOUT}
                  onChange={handleChange}
                  placeholder="Enter BD Size OUT"
                />
                {errors.BDSizeOUT && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDSizeOUT}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
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
              <div></div>
              <div></div>
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

export default BDDetails;
