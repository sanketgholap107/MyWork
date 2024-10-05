import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { postData } from "../Axios/AxiosConnection";

function DiscParticularOrCTRBDetails({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const [isBackNavigation, setIsBackNavigation] = useState(false); // State to track back navigation
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.DiscParticularA) {
      newErrors.DiscParticularA = "Disc Particular A is required.";
    }
    // else if (!/^\d+$/.test(formData.WheelNo)) {
    //   newErrors.WheelNo = "Wheel No must be numeric.";
    // }

    if (!formData.DiscParticularB) {
      newErrors.DiscParticularB = "Disc Particular B is required.";
    }

    if (!formData.CTRBA) {
      newErrors.CTRBA = "CTRB A is required.";
    }
    if (!formData.CTRBB) {
      newErrors.CTRBB = "CTRB B is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormData((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/LHBSchedulePreInspection/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/LHBSchedulePreInspection/repairandust_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await postData("/api/data", formData);
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setFormData((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 2,
            WheeltypeId: 1,
          }));

          navigate("/LHBSchedulePreInspection/axle_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
        LHB SCHEDULE PRE INSPECTION FORM{" "}
      </h2>
      <h2>Disc Particular/CTRB Details for LHB SCHEDULE PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Disc Particular A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formData.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
                {errors.DiscParticularA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Disc Particular B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formData.DiscParticularB}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular B"
                />
                {errors.DiscParticularB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBA"
                  value={formData.CTRBA}
                  onChange={handleChange}
                  placeholder="Enter CTRB A"
                />
                {errors.CTRBA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBA}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  CTRB B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBB"
                  value={formData.CTRBB}
                  onChange={handleChange}
                  placeholder="Enter CTRB B"
                />
                {errors.CTRBB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBB}
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
                      navigate("/proceedsubmit");
                    }
                  }}
                >
                  Preview for Submission
                </button>
              </div>
              <div>
                <button
                  onClick={handleBack}
                >
                  Back
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

export default DiscParticularOrCTRBDetails;
