import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function JournalDetails({
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
    console.log(formData);
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

  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinal.FC) {
      newErrors.FC = "F/C is required.";
      // } else if (!/^\d+$/.test(formData.WheelNo)) {
      //   newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataFinal.Size) {
      newErrors.Size = "Size is required.";
    }

    if (!formDataFinal.Oval) {
      newErrors.Oval = "Oval is required.";
    }
    if (!formDataFinal.Tap) {
      newErrors.Tap = "Tap is required.";
    }
    if (!formDataFinal.ShoulderSize) {
      newErrors.ShoulderSize = "Shoulder Size is required.";
    }
    if (!formDataFinal.JrWaiviness) {
      newErrors.JrWaiviness = "Jr Waiviness is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/bd_details");
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
      <h2>Journal Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  F/C:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FC"
                  value={formDataFinal.FC}
                  onChange={handleChange}
                  placeholder="Enter F/C"
                />
                {errors.FC && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FC}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Size"
                  value={formDataFinal.Size}
                  onChange={handleChange}
                  placeholder="Enter Size"
                />
                {errors.Size && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Size}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Oval:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Oval"
                  value={formDataFinal.Oval}
                  onChange={handleChange}
                  placeholder="Enter Oval"
                />
                {errors.Oval && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Oval}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Tap:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Tap"
                  value={formDataFinal.Tap}
                  onChange={handleChange}
                  placeholder="Enter Tap"
                />
                {errors.Tap && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Tap}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Shoulder Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="ShoulderSize"
                  value={formDataFinal.ShoulderSize}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size"
                />
                {errors.ShoulderSize && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShoulderSize}
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
            <div className="row-3">
              <div>
                <label>
                  Jr. Waiviness:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="JrWaiviness"
                  value={formData.JrWaiviness}
                  onChange={handleChange}
                  placeholder="Enter Jr. Waiviness"
                /> */}
                <select
                  name="JrWaiviness"
                  value={formDataFinal.JrWaiviness}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Jr. Waiviness</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                {errors.JrWaiviness && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.JrWaiviness}
                  </p>
                )}
              </div>
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

export default JournalDetails;
