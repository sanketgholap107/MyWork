import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BRGDetails({
  formDataFinal,
  setFormDataFinal,
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
  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinal.BRGRemainLife) {
      newErrors.BRGRemainLife = "BRG Remain Life is required.";
      // } else if (!/^\d+$/.test(formData.WheelNo)) {
      //   newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataFinal.BRGMake) {
      newErrors.BRGMake = "BRG Make is required.";
    }

    if (!formDataFinal.BRGNo) {
      newErrors.BRGNo = "BRG No is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/general_details");
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
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>BRG Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  BRG Remain Life:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BRGRemainLife"
                  value={formDataFinal.BRGRemainLife}
                  onChange={handleChange}
                  placeholder="Enter BRG Remain Life"
                />
                {errors.BRGRemainLife && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGRemainLife}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BRG Make:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="BRGMake"
                  value={formData.BRGMake}
                  onChange={handleChange}
                  placeholder="Enter BRG Make"
                /> */}
                <select
                  name="BRGMake"
                  value={formDataFinal.BRGMake}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select BRG Make</option>
                  <option value="SKF">SKF</option>
                  <option value="TIM">TIM</option>
                  <option value="NBC">NBC</option>
                </select>
                {errors.BRGMake && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGMake}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BRG No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BRGNo"
                  value={formDataFinal.BRGNo}
                  onChange={handleChange}
                  placeholder="Enter BRG No."
                />
                {errors.BRGNo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGNo}
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

export default BRGDetails;
