import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

function GeneralInspection({
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

  const handleSubmit = async (e) => {
    if (validateForm()) {
      e.preventDefault();

      try {
        const response = await postData("/api/data", formData);
        console.log(response.AxleNo);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
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

          navigate("/lhbfinalinspection/axle_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
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
    if (!formDataFinal.MEP) {
      newErrors.MEP = "MEP is required.";
      // } else if (!/^\d+$/.test(formData.WheelNo)) {
      //   newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataFinal.USTName) {
      newErrors.USTName = "USTName is required.";
    }

    if (!formDataFinal.FittingDt) {
      newErrors.FittingDt = "Fitting Dt is required.";
    }
    if (!formDataFinal.ECATest) {
      newErrors.ECATest = "ECA Test is required.";
    }
    if (!formDataFinal.InspectorSign) {
      newErrors.InspectorSign = "Inspector Sign is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      <h2>General Inspection for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  MEP:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="MEP"
                  value={formDataFinal.MEP}
                  onChange={handleChange}
                  placeholder="Enter MEP"
                />
                {errors.MEP && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.MEP}
                  </p>
                )}
              </div>
              <div>
                <label>
                  UST Name:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="USTName"
                  value={formDataFinal.USTName}
                  onChange={handleChange}
                  placeholder="Enter UST Name"
                />
                {errors.USTName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.USTName}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Fitting Dt:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FittingDt"
                  value={formDataFinal.FittingDt}
                  onChange={handleChange}
                  placeholder="Enter Fitting Dt"
                />
                {errors.FittingDt && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FittingDt}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  ECA Test:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="ECATest"
                  value={formData.ECATest}
                  onChange={handleChange}
                  placeholder="Enter ECA Test Result"
                /> */}
                <select
                  name="ECATest"
                  value={formDataFinal.ECATest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select ECA Test</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                {errors.ECATest && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ECATest}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Inspector Sign:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="InspectorSign"
                  value={formDataFinal.InspectorSign}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
                {errors.InspectorSign && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.InspectorSign}
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
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (validateForm()) {
                      navigate("/proceedsubmitFinal");
                    }
                  }}
                >
                  Preview for Submission
                </button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInspection;
