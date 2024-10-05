import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDetails({
  formDataDivision,
  setFormDataDivision,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
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
    // console.log(formData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formDataDivision.WheelNo) {
      newErrors.WheelNo = "Wheel No is required.";
    } else if (!/^\d+$/.test(formDataDivision.WheelNo)) {
      newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataDivision.LooryNo) {
      newErrors.LooryNo = "Loory No is required.";
    } else if (!/^\d+$/.test(formDataDivision.LooryNo)) {
      newErrors.LooryNo = "Loory No must be numeric.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataDivision((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/LHBDivisionPreInspectionForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      const existingWheelNos = JSON.parse(localStorage.getItem("wheelNumbers")) || [];
      existingWheelNos.push(formDataDivision.WheelNo);
      localStorage.setItem("wheelNumbers", JSON.stringify(existingWheelNos));
      
      onNextStep();
      navigate("/LHBDivisionPreInspectionForm/report_details");
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
        LHB DIVISION PRE INSPECTION FORM{" "}
      </h2>
      <h2> Wheel Details For LHB Division Pre Inspection Form</h2>

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
                  value={formDataDivision.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />
                {errors.WheelNo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelNo}
                  </p>
                )}
              </div>

              <div>
                <label>
                  Loory No:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="LooryNo"
                  value={formDataDivision.LooryNo}
                  onChange={handleChange}
                  placeholder="Enter Loory No."
                />
                {errors.LooryNo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.LooryNo}
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

export default WheelDetails;
