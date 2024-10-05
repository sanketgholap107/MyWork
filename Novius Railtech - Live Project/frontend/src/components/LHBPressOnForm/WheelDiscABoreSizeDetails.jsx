import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDiscABoreSizeDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange,
  onNextStep,
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
    if (!formDataPressOnLHB.WheelDiscATopXAxis) {
      newErrors.WheelDiscATopXAxis = "Top X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscATopXAxis)) {
      newErrors.WheelDiscATopXAxis = "Top X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscATopYAxis) {
      newErrors.WheelDiscATopYAxis = "Top Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscATopYAxis)) {
      newErrors.WheelDiscATopYAxis = "Top Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscAMiddleXAxis) {
      newErrors.WheelDiscAMiddleXAxis = "Middle X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscAMiddleXAxis)) {
      newErrors.WheelDiscAMiddleXAxis = "Middle X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscAMiddleYAxis) {
      newErrors.WheelDiscAMiddleYAxis = "Middle Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscAMiddleYAxis)) {
      newErrors.WheelDiscAMiddleYAxis = "Middle Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscALowerXAxis) {
      newErrors.WheelDiscALowerXAxis = "Lower X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscALowerXAxis)) {
      newErrors.WheelDiscALowerXAxis = "Lower X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscALowerYAxis) {
      newErrors.WheelDiscALowerYAxis = "Lower Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscALowerYAxis)) {
      newErrors.WheelDiscALowerYAxis = "Lower Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscAAvgXAxis) {
      newErrors.WheelDiscAAvgXAxis = "Average X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscAAvgXAxis)) {
      newErrors.WheelDiscAAvgXAxis = "Average X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.WheelDiscAAvgYAxis) {
      newErrors.WheelDiscAAvgYAxis = "Average Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscAAvgYAxis)) {
      newErrors.WheelDiscAAvgYAxis = "Average Y-Axis must be numeric.";
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
    navigate("/LHBPressOnForm/wheeldiscB_details");
    }
  };

  const handleBack = () => {
    navigate("/LHBPressOnForm/wheeldiscA_details");
  };


  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Wheel Disc A Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>Top X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscATopXAxis"
                  value={formDataPressOnLHB.WheelDiscATopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />
                {errors.WheelDiscATopXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscATopXAxis}</p>
                )}
              </div>
              <div>
                <label>Top Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscATopYAxis"
                  value={formDataPressOnLHB.WheelDiscATopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                {errors.WheelDiscATopYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscATopYAxis}</p>
                )}
              </div>
              <div>
                <label>Middle X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAMiddleXAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />
                {errors.WheelDiscAMiddleXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAMiddleXAxis}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Middle Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAMiddleYAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                {errors.WheelDiscAMiddleYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAMiddleYAxis}</p>
                )}
              </div>
              <div>
                <label>Lower X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscALowerXAxis"
                  value={formDataPressOnLHB.WheelDiscALowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />
                  {errors.WheelDiscALowerXAxis && (
                    <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscALowerXAxis}</p>
                  )}
              </div>
              
              <div>
                <label>Lower Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscALowerYAxis"
                  value={formDataPressOnLHB.WheelDiscALowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                {errors.WheelDiscALowerYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscALowerYAxis}</p>
                )}
              </div>
            </div>
            <div className="row-3">
              
             
              <div>
                <label>Avg X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAAvgXAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                />
                {errors.WheelDiscAAvgXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAAvgXAxis}</p>
                )}
              </div>
              <div>
                <label>Avg Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAAvgYAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                />
                {errors.WheelDiscAAvgYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAAvgYAxis}</p>
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

export default WheelDiscABoreSizeDetails;
