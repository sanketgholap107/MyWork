import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscBsideDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange,
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
    if (!formDataPressOnLHB.BrakeDiscBBBDSeatSize) {
      newErrors.BrakeDiscBBBDSeatSize = "B' BD Seat Size is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBBBDSeatSize)) {
      newErrors.BrakeDiscBBBDSeatSize = "B' BD Wheel Seat Size must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscBAllow) {
      newErrors.BrakeDiscBAllow = "Allow is required.";
    }else if (!/^\d+(\.\d+)?$/.test(formDataPressOnLHB.BrakeDiscBAllow)) {
      newErrors.BrakeDiscBAllow = "Allow must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscBPressOnPressure) {
      newErrors.BrakeDiscBPressOnPressure = "Press-On Pressure is required.";
    }

    if (!formDataPressOnLHB.BrakeDiscBBDThickness) {
      newErrors.BrakeDiscBBDThickness = "BD Thickness is required.";
    }else if (!/^\d+$/.test(formDataPressOnLHB.BrakeDiscBBDThickness)) {
      newErrors.BrakeDiscBBDThickness = "BD Thickness must be numeric.";
    }

    if (!formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars) {
      newErrors.BrakeDiscBBrakeDiscParticulars = "Brake Disc make & Particulars is required.";
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
    navigate("/LHBPressOnForm/brakediscBBoresize_details");
    }
  };

  const handleBack = () => {
    navigate("/LHBPressOnForm/brakediscABoresize_details");
  };

  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Brake Disc B Side Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>B' BD Seat Size:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBBBDSeatSize"
                  value={formDataPressOnLHB.BrakeDiscBBBDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' BD Seat Size"
                />
                {errors.BrakeDiscBBBDSeatSize && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBBBDSeatSize}</p>
                )}
              </div>
              <div>
                <label>Allow:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBAllow"
                  value={formDataPressOnLHB.BrakeDiscBAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                />
                {errors.BrakeDiscBAllow && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBAllow}</p>
                )}
              </div>
              <div>
                <label>Press-On Pressure in Ton:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBPressOnPressure"
                  value={formDataPressOnLHB.BrakeDiscBPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />
                {errors.BrakeDiscBPressOnPressure && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBPressOnPressure}</p>
                )}
              </div>
            </div>
            <div className="row-2">
            <div>
                <label>BD Thickness:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBBDThickness"
                  value={formDataPressOnLHB.BrakeDiscBBDThickness}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness"
                />
                {errors.BrakeDiscBBDThickness && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBBDThickness}</p>
                )}
              </div>
              <div>
                <label>Brake Disc make & Particulars:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BrakeDiscBBrakeDiscParticulars"
                  value={formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc make & Particulars"
                />
                {errors.BrakeDiscBBrakeDiscParticulars && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.BrakeDiscBBrakeDiscParticulars}</p>
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
              <div>
              
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
              <div>
                
              </div>
              
            </div>
            <div className="row-3">
              
             
              <div>
                
              </div>
              <div>
                
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

export default BrakeDiscBsideDetails;
