import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BDDetails({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
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
    if (!formDataFinal.BDMake) {
      newErrors.BDMake = "BD Make is required.";
      // } else if (!/^\d+$/.test(formData.WheelNo)) {
      //   newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataFinal.BDSize) {
      newErrors.BDSize = "BD Size is required.";
    }

    if (!formDataFinal.EndHole) {
      newErrors.EndHole = "End Hole is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/brg_details");
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
        LHB FINAL INSPECTION FORM
      </h2>
      <h2>BD Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  BD Make:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="BDMake"
                  value={formData.BDMake}
                  onChange={handleChange}
                  placeholder="Enter BD Make"
                /> */}
                <select
                  name="BDMake"
                  value={formDataFinal.BDMake}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select BD Make</option>
                  <option value="KNOR">KNOR</option>
                  <option value="FTIL">FTIL</option>
                  <option value="ARIL">ARIL</option>
                  <option value="PIONER">PIONER</option>
                </select>
                {errors.BDMake && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDMake}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDSize"
                  value={formDataFinal.BDSize}
                  onChange={handleChange}
                  placeholder="Enter BD Size"
                />
                {errors.BDSize && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDSize}
                  </p>
                )}
              </div>
              <div>
                <label>
                  End Hole:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="EndHole"
                  value={formData.EndHole}
                  onChange={handleChange}
                  placeholder="Enter End Hole"
                /> */}
                <select
                  name="EndHole"
                  value={formDataFinal.EndHole}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select End Hole</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                {errors.EndHole && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.EndHole}
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

export default BDDetails;
