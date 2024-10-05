import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelsDiscAsideDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file);  // Set the single file to state
      }
    },
  });

  const handleBack = () => {
    navigate("/LHBPressOnForm/wheel_details");
  };

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


  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOnLHB.WheelDiscAVTLNO) {
      newErrors.WheelDiscAVTLNO = "VTL No is required.";
    }

    if (!formDataPressOnLHB.WheelDiscABoreSizeByOperator) {
      newErrors.WheelDiscABoreSizeByOperator = "Bore Size By Operator is required.";
    }

    if (!formDataPressOnLHB.WheelDiscARAValue) {
      newErrors.WheelDiscARAValue = "RA Value is required.";
    }

    if (!formDataPressOnLHB.WheelDiscAOperatorName) {
      newErrors.WheelDiscAOperatorName = "Operator Name is required.";
    }

    if (!formDataPressOnLHB.WheelDiscABWheelSeatSize) {
      newErrors.WheelDiscABWheelSeatSize = "B' Wheel Seat Size is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscABWheelSeatSize)) {
      newErrors.WheelDiscABWheelSeatSize = "B' Wheel Seat Size must be numeric.";
    }

    if (!formDataPressOnLHB.WheelDiscAAllow) {
      newErrors.WheelDiscAAllow = "Allow is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscAAllow)) {
      newErrors.WheelDiscAAllow = "Allow must be numeric.";
    }

    if (!formDataPressOnLHB.WheelDiscAPressOnPressure) {
      newErrors.WheelDiscAPressOnPressure = "Press-On Pressure is required.";
    }

    if (!formDataPressOnLHB.WheelDiscARDNo) {
      newErrors.WheelDiscARDNo = "RD No is required.";
    }

    if (!formDataPressOnLHB.WheelDiscAWheelDiscParticulars) {
      newErrors.WheelDiscAWheelDiscParticulars = "Wheel Disc Particulars is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
    navigate("/LHBPressOnForm/wheeldiscABoresize_details");
    }
  };

  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Wheel Disc A Side Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>VTL No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAVTLNO"
                  value={formDataPressOnLHB.WheelDiscAVTLNO}
                  onChange={handleChange}
                  placeholder="Enter VTL No."
                />
                {errors.WheelDiscAVTLNO && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAVTLNO}</p>
                )}
              </div>
              <div>
                <label>Bore Size By Operator:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscABoreSizeByOperator"
                  value={formDataPressOnLHB.WheelDiscABoreSizeByOperator}
                  onChange={handleChange}
                  placeholder="Enter Bore Size By Operator"
                />
                {errors.WheelDiscABoreSizeByOperator && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscABoreSizeByOperator}</p>
                )}
              </div>
              <div>
                <label>RA Value:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscARAValue"
                  value={formDataPressOnLHB.WheelDiscARAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />
                {errors.WheelDiscARAValue && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscARAValue}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Operator Name:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAOperatorName"
                  value={formDataPressOnLHB.WheelDiscAOperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />
                {errors.WheelDiscAOperatorName && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAOperatorName}</p>
                )}
              </div>
              <div>
                <label>B' Wheel Seat Size:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscABWheelSeatSize"
                  value={formDataPressOnLHB.WheelDiscABWheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' Wheel Seat Size"
                />
                {errors.WheelDiscABWheelSeatSize && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscABWheelSeatSize}</p>
                )}
              </div>
              
              <div>
                <label>Allow:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAAllow"
                  value={formDataPressOnLHB.WheelDiscAAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                />
                {errors.WheelDiscAAllow && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAAllow}</p>
                )}
              </div>
            </div>
            <div className="row-3">
              
             
              <div>
                <label>Press-On Pressure in Ton:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAPressOnPressure"
                  value={formDataPressOnLHB.WheelDiscAPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />
                {errors.WheelDiscAPressOnPressure && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAPressOnPressure}</p>
                )}
              </div>
              <div>
                <label>RD No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscARDNo"
                  value={formDataPressOnLHB.WheelDiscARDNo}
                  onChange={handleChange}
                  placeholder="Enter RD No."
                />
                {errors.WheelDiscARDNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscARDNo}</p>
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
                <label>Wheel Disc Particulars:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscAWheelDiscParticulars"
                  value={formDataPressOnLHB.WheelDiscAWheelDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Particulars"
                />
                {errors.WheelDiscAWheelDiscParticulars && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscAWheelDiscParticulars}</p>
                )}
              </div>
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

export default WheelsDiscAsideDetails;
