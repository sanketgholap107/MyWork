import React, { useState,useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function AxleDetails({ formDataFinal, setFormDataFinal, onInputChange,onNextStep,
  onResetStep, }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file); // Set the single file to state
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const location = useLocation();
  const { WheelNo,wheelid } = location.state || {};

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataFinal((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid:wheelid
      }));
    }
  }, [WheelNo,wheelid, setFormDataFinal]);

  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinal.WheelNo) {
      newErrors.WheelNo = "Wheel No is required.";
    } else if (!/^\d+$/.test(formDataFinal.WheelNo)) {
      newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataFinal.AxleNo) {
      newErrors.AxleNo = "Axle No is required.";
    }

    if (!formDataFinal.Shift) {
      newErrors.Shift = "Shift is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const removeFile = () => {
    setFile(null); // Remove the file from state
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
    // console.log(formData);
  };

  const handleCancel = () => {
    setFormDataFinal((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 4,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/lhbfinalinspection/axle_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
    onNextStep();
    navigate("/lhbfinalinspection/wheel_details");
    }
  };

  return (
    <div className="component">
      {/* dropdown here */}
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>Axle Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Wheel No:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataFinal.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel Number"
                />
                {errors.WheelNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelNo}</p>
                )}
              </div>
              <div>
                <label>
                  Axle No:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataFinal.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                 
                />
                {errors.AxleNo && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px"  }}>{errors.AxleNo}</p>
                )}
              </div>
              <div>
                <label>
                  Shift:<span className="required-asterisk">*</span>
                </label>
                <select
                  id="dropdown"
                  name="Shift"
                  value={formDataFinal.Shift}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Shift 1">Shift 1</option>
                  <option value="Shift 2">Shift 2</option>
                  <option value="Shift 3">Shift 3</option>
                </select>
                {errors.Shift && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px", marginLeft:"2px" }}>{errors.Shift}</p>
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
                {/* {file ? (
                  <div className="image-preview-container" >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded Preview"
                      className="image-preview"
                    />
                    <button onClick={removeFile} className="remove-button">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <span className="upload-icon">
                      <IoCloudUploadOutline />
                    </span>
                    <span className="drag-drop">Drag & drop files</span>
                    <span className="drag-or">---------- or ----------</span>
                    <button className="browse-button">Browse</button>
                  </div>
                )} */}
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
              {/* <div className="file-upload">
                <label
                  htmlFor="file-upload-input"
                  className="file-upload-label"
                >
                  Upload Image
                </label>
                <div>
                  <input
                    id="file-upload-input"
                    type="file"
                    onChange={handleFileChange}
                    className="file-upload-input"
                    accept="image/*"
                  />
                  {preview && (
                    <div className="image-preview">
                      <img src={preview} alt="Preview" />
                    </div>
                  )}
                </div>
                 <span className="file-upload-name">{fileName}</span> 
              </div> */}
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
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

export default AxleDetails;
