import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscASideBoreSizeDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange, onNextStep,
  onResetStep, }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Lower Y-axis only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file);  // Set the single file to state
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
    console.log(formDataPressOnLHB);
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOnLHB.BrakeDiscATopXAxis) {
      newErrors.BrakeDiscATopXAxis = "Top X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscATopXAxis)) {
      newErrors.BrakeDiscATopXAxis = "Top X-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscATopYAxis) {
      newErrors.BrakeDiscATopYAxis = "Top Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscATopYAxis)) {
      newErrors.BrakeDiscATopYAxis = "Top Y-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscAMiddleXAxis) {
      newErrors.BrakeDiscAMiddleXAxis = "Middle X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscAMiddleXAxis)) {
      newErrors.BrakeDiscAMiddleXAxis = "Middle X-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscAMiddleYAxis) {
      newErrors.BrakeDiscAMiddleYAxis = "Middle Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscAMiddleYAxis)) {
      newErrors.BrakeDiscAMiddleYAxis = "Middle Y-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscALowerXAxis) {
      newErrors.BrakeDiscALowerXAxis = "Lower X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscALowerXAxis)) {
      newErrors.BrakeDiscALowerXAxis = "Lower X-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscALowerYAxis) {
      newErrors.BrakeDiscALowerYAxis = "Lower Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscALowerYAxis)) {
      newErrors.BrakeDiscALowerYAxis = "Lower Y-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscAAvgXAxis) {
      newErrors.BrakeDiscAAvgXAxis = "Average X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscAAvgXAxis)) {
      newErrors.BrakeDiscAAvgXAxis = "Average X-Axis must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscAAvgYAxis) {
      newErrors.BrakeDiscAAvgYAxis = "Average Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscAAvgYAxis)) {
      newErrors.BrakeDiscAAvgYAxis = "Average Y-Axis must be numeric.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  const handleCancel = () => {
    setFormDataPressOnLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/LHBPressOnForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBPressOnForm/brakediscB_details");
    }
  };


  const handleBack = () => {
    navigate("/LHBPressOnForm/brakediscA_details");
  };



  return (
    <div className="component">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "white", opacity: 1 }}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Brake Disc A Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">

          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>Top X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscATopXAxis"
                  value={formDataPressOnLHB.BrakeDiscATopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />
                {errors.BrakeDiscATopXAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscATopXAxis}</p>
                )}
              </div>
              <div>
                <label>Top Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscATopYAxis"
                  value={formDataPressOnLHB.BrakeDiscATopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                {errors.BrakeDiscATopYAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscATopYAxis}</p>
                )}
              </div>
              <div>
                <label>Middle X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscAMiddleXAxis"
                  value={formDataPressOnLHB.BrakeDiscAMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />
                {errors.BrakeDiscAMiddleXAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscAMiddleXAxis}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Middle Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscAMiddleYAxis"
                  value={formDataPressOnLHB.BrakeDiscAMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                {errors.BrakeDiscAMiddleYAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscAMiddleYAxis}</p>
                )}
              </div>
              <div>
                <label>Lower X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscALowerXAxis"
                  value={formDataPressOnLHB.BrakeDiscALowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />
                {errors.BrakeDiscALowerXAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscALowerXAxis}</p>
                )}
              </div>

              <div>
                <label>Lower Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscALowerYAxis"
                  value={formDataPressOnLHB.BrakeDiscALowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                {errors.BrakeDiscALowerYAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscALowerYAxis}</p>
                )}
              </div>
            </div>
            <div className="row-3">


              <div>
                <label>Avg X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscAAvgXAxis"
                  value={formDataPressOnLHB.BrakeDiscAAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                />
                {errors.BrakeDiscAAvgXAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscAAvgXAxis}</p>
                )}
              </div>
              <div>
                <label>Avg Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscAAvgYAxis"
                  value={formDataPressOnLHB.BrakeDiscAAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                />
                {errors.BrakeDiscAAvgYAxis && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.BrakeDiscAAvgYAxis}</p>
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
                  <span className="drag-drop" >Drag & drop files</span>
                  <span className="drag-or">--------- or ---------</span>
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
                  // value={formDataPressOnLHB.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
            </div>
            <div className="btn-container">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <div>
              <button className="back_btn" onClick={handleBack}>Back</button>
              </div>
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

export default BrakeDiscASideBoreSizeDetails;
