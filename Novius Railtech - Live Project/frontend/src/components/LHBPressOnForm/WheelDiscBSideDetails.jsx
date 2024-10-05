import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDiscBSideDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange ,
  onNextStep,
  onResetStep,}) {
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
    navigate("/LHBPressOnForm/wheeldiscABoresize_details");
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
    if (!formDataPressOnLHB.WheelDiscBVTLNo) {
      newErrors.WheelDiscBVTLNo = "VTL No is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBBoreSizeByOperator) {
      newErrors.WheelDiscBBoreSizeByOperator = "Bore Size By Operator is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBRAValue) {
      newErrors.WheelDiscBRAValue = "RA Value is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBOperatorName) {
      newErrors.WheelDiscBOperatorName = "Operator Name is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBBWheelSeatSize) {
      newErrors.WheelDiscBBWheelSeatSize = "B' Wheel Seat Size is required.";
    }else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscBBWheelSeatSize)) {
      newErrors.WheelDiscBBWheelSeatSize = "B' Wheel Seat Size must be numeric.";
    }

    if (!formDataPressOnLHB.WheelDiscBAllow) {
      newErrors.WheelDiscBAllow = "Allow is required.";
    }else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.WheelDiscBAllow)) {
      newErrors.WheelDiscBAllow = "Allow must be numeric.";
    }

    if (!formDataPressOnLHB.WheelDiscBPressOnPressure) {
      newErrors.WheelDiscBPressOnPressure = "Press-On Pressure is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBRDNo) {
      newErrors.WheelDiscBRDNo = "RD No is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBWheelDiscParticulars) {
      newErrors.WheelDiscBWheelDiscParticulars = "Wheel Disc Particulars is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
    navigate("/LHBPressOnForm/wheeldiscBBoresize_details");
    }
  };

  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Wheel Disc B Side Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>VTL No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBVTLNo"
                  value={formDataPressOnLHB.WheelDiscBVTLNo}
                  onChange={handleChange}
                  placeholder="Enter VTL No."
                />
                {errors.WheelDiscBVTLNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBVTLNo}</p>
                )}
              </div>
              <div>
                <label>Bore Size By Operator:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBBoreSizeByOperator"
                  value={formDataPressOnLHB.WheelDiscBBoreSizeByOperator}
                  onChange={handleChange}
                  placeholder="Enter Bore Size By Operator"
                />
                {errors.WheelDiscBBoreSizeByOperator && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBBoreSizeByOperator}</p>
                )}
              </div>
              <div>
                <label>RA Value:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBRAValue"
                  value={formDataPressOnLHB.WheelDiscBRAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />
                {errors.WheelDiscBRAValue && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBRAValue}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Operator Name:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBOperatorName"
                  value={formDataPressOnLHB.WheelDiscBOperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />
                {errors.WheelDiscBOperatorName && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBOperatorName}</p>
                )}
              </div>
              <div>
                <label>B' Wheel Seat Size:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBBWheelSeatSize"
                  value={formDataPressOnLHB.WheelDiscBBWheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' Wheel Seat Size"
                />
                {errors.WheelDiscBBWheelSeatSize && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBBWheelSeatSize}</p>
                )}
              </div>
              
              <div>
                <label>Allow:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBAllow"
                  value={formDataPressOnLHB.WheelDiscBAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                />
                {errors.WheelDiscBAllow && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBAllow}</p>
                )}
              </div>
            </div>
            <div className="row-3">
              
             
              <div>
                <label>Press-On Pressure in Ton:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBPressOnPressure"
                  value={formDataPressOnLHB.WheelDiscBPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />
                {errors.WheelDiscBPressOnPressure && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBPressOnPressure}</p>
                )}
              </div>
              <div>
                <label>RD No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelDiscBRDNo"
                  value={formDataPressOnLHB.WheelDiscBRDNo}
                  onChange={handleChange}
                  placeholder="Enter RD No."
                />
                {errors.WheelDiscBRDNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBRDNo}</p>
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
                  name="WheelDiscBWheelDiscParticulars"
                  value={formDataPressOnLHB.WheelDiscBWheelDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Particulars"
                />
                {errors.WheelDiscBWheelDiscParticulars && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelDiscBWheelDiscParticulars}</p>
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

export default WheelDiscBSideDetails;
