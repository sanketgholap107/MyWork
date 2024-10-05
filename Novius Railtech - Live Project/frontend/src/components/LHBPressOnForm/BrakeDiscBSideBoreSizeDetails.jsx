import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscBSideBoreSizeDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange,
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
    if (!formDataPressOnLHB.BrakeDiscBTopXAxis) {
      newErrors.BrakeDiscBTopXAxis = "Top X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBTopXAxis)) {
      newErrors.BrakeDiscBTopXAxis = "Top X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBTopYAxis) {
      newErrors.BrakeDiscBTopYAxis = "Top Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBTopYAxis)) {
      newErrors.BrakeDiscBTopYAxis = "Top Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBMiddleXAxis) {
      newErrors.BrakeDiscBMiddleXAxis = "Middle X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBMiddleXAxis)) {
      newErrors.BrakeDiscBMiddleXAxis = "Middle X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBMiddleYAxis) {
      newErrors.BrakeDiscBMiddleYAxis = "Middle Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBMiddleYAxis)) {
      newErrors.BrakeDiscBMiddleYAxis = "Middle Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBLowerXAxis) {
      newErrors.BrakeDiscBLowerXAxis = "Lower X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBLowerXAxis)) {
      newErrors.BrakeDiscBLowerXAxis = "Lower X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBLowerYAxis) {
      newErrors.BrakeDiscBLowerYAxis = "Lower Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBLowerYAxis)) {
      newErrors.BrakeDiscBLowerYAxis = "Lower Y-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBAvgXAxis) {
      newErrors.BrakeDiscBAvgXAxis = "Average X-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBAvgXAxis)) {
      newErrors.BrakeDiscBAvgXAxis = "Average X-Axis must be numeric.";
    }
    
    if (!formDataPressOnLHB.BrakeDiscBAvgYAxis) {
      newErrors.BrakeDiscBAvgYAxis = "Average Y-Axis is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBAvgYAxis)) {
      newErrors.BrakeDiscBAvgYAxis = "Average Y-Axis must be numeric.";
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
    navigate("/LHBPressOnForm/operator_details");
    }
  };

  const handleBack = () => {
    navigate("/LHBPressOnForm/brakediscB_details");
  };

  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Brake Disc B Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>Top X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBTopXAxis"
                  value={formDataPressOnLHB.BrakeDiscBTopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />
                {errors.BrakeDiscBTopXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBTopXAxis}</p>
                )}
              </div>
              <div>
                <label>Top Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBTopYAxis"
                  value={formDataPressOnLHB.BrakeDiscBTopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                {errors.BrakeDiscBTopYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBTopYAxis}</p>
                )}
              </div>
              <div>
                <label>Middle X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBMiddleXAxis"
                  value={formDataPressOnLHB.BrakeDiscBMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />
                {errors.BrakeDiscBMiddleXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBMiddleXAxis}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Middle Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBMiddleYAxis"
                  value={formDataPressOnLHB.BrakeDiscBMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                {errors.BrakeDiscBMiddleYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBMiddleYAxis}</p>
                )}
              </div>
              <div>
                <label>Lower X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBLowerXAxis"
                  value={formDataPressOnLHB.BrakeDiscBLowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />
                {errors.BrakeDiscBLowerXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBLowerXAxis}</p>
                )}
              </div>
              
              <div>
                <label>Lower Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBLowerYAxis"
                  value={formDataPressOnLHB.BrakeDiscBLowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                {errors.BrakeDiscBLowerYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBLowerYAxis}</p>
                )}
              </div>
            </div>
            <div className="row-3">
              
             
              <div>
                <label>Avg X-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBAvgXAxis"
                  value={formDataPressOnLHB.BrakeDiscBAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                />
                {errors.BrakeDiscBAvgXAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBAvgXAxis}</p>
                )}
              </div>
              <div>
                <label>Avg Y-axis:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBAvgYAxis"
                  value={formDataPressOnLHB.BrakeDiscBAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                />
                {errors.BrakeDiscBAvgYAxis && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBAvgYAxis}</p>
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

export default BrakeDiscBSideBoreSizeDetails;
