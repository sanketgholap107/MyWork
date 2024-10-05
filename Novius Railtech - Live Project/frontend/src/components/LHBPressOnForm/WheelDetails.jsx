import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange ,
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

  const location = useLocation();
  const { WheelNo,wheelid } = location.state || {};

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOnLHB((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid:wheelid
      }));
    }
  }, [WheelNo,wheelid, setFormDataPressOnLHB]);


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
    if (!formDataPressOnLHB.WheelNo) {
      newErrors.WheelNo = "Wheel No is required.";
    } else if (!/^\d+$/.test(formDataPressOnLHB.WheelNo)) {
      newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataPressOnLHB.AxleNo) {
      newErrors.AxleNo = "Axle No is required.";
    }

    if (!formDataPressOnLHB.ATLNo) {
      newErrors.ATLNo = "ATL No is required.";
    }

    if (!formDataPressOnLHB.WheelSeatSize) {
      newErrors.WheelSeatSize = "Wheel Seat Size No is required.";
    }

    if (!formDataPressOnLHB.BDSeatSize) {
      newErrors.BDSeatSize = "BD Seat Size No is required.";
    }

    if (!formDataPressOnLHB.ATLNo) {
      newErrors.RAValue = "RA Value is required.";
    }

    if (!formDataPressOnLHB.ATLNo) {
      newErrors.OperatorName = "Operator Name is required.";
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
    navigate("/LHBPressOnForm/wheeldiscA_details");
    }
  };

  return (
    <div className="component">
      <h2 style={{ textAlign:"center",backgroundColor:"black",color:"white", opacity:1}}>PRESS-ON OF LHB WHEEL FORM </h2>
      <h2>Wheel Details for PRESS-ON OF LHB WHEEL Form</h2>
      
      <div className="page-border">
        <div className="page-contentLHB">
          
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>Wheel No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataPressOnLHB.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />
                {errors.WheelNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelNo}</p>
                )}
              </div>
              <div>
                <label>Axle No:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOnLHB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />
                {errors.AxleNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.AxleNo}</p>
                )}
              </div>
              <div>
                <label>ATL No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="ATLNo"
                  value={formDataPressOnLHB.ATLNo}
                  onChange={handleChange}
                  placeholder="Enter ATL No."
                />
                {errors.ATLNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.ATLNo}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Wheel Seat Size:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelSeatSize"
                  value={formDataPressOnLHB.WheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter Wheel Seat Size"
                />
                {errors.WheelSeatSize && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.WheelSeatSize}</p>
                )}
              </div>
              <div>
                <label>BD Seat Size:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="BDSeatSize"
                  value={formDataPressOnLHB.BDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter BD Seat Size"
                />
                {errors.BDSeatSize && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.BDSeatSize}</p>
                )}
              </div>
              
              <div>
                <label>RA Value(1.6 Max):<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="RAValue"
                  value={formDataPressOnLHB.RAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />
                {errors.RAValue && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.RAValue}</p>
                )}
              </div>
            </div>
            <div className="row-3">
              
             
              <div>
                <label>Operator Name:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="OperatorName"
                  value={formDataPressOnLHB.OperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />
                {errors.OperatorName && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.OperatorName}</p>
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
                
                
              </div>
              <div>
                
              </div>
            </div>
            <div className="btn-container">
              <button onClick={saveandcontinue}>Save & Continue</button>
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

export default WheelDetails;
