import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { postData } from "../Axios/AxiosConnection";

function ReportDetails({
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
    // console.log(formData);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formDataDivision.POHDate) {
      newErrors.POHDate = "POH Date is required.";
    }
    // else if (!/^\d+$/.test(formDataDivision.WheelNo)) {
    //   newErrors.WheelNo = "Wheel No must be numeric.";
    // }

    // if (!formDataDivision.returndate) {
    //   newErrors.returndate = "Return Date is required.";
    // }

    if (!formDataDivision.divisionreport) {
      newErrors.divisionreport = "Division Report is required.";
    }

    if (!formDataDivision.matungareport) {
      newErrors.matungareport = "Matunga Report is required.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await postData("/api/data", formDataDivision);
        console.log(response.AxleNo);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setFormDataDivision((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
          }));

          navigate("/LHBDivisionPreInspectionForm/wheel_details");
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
        LHB DIVISION PRE INSPECTION FORM{" "}
      </h2>
      <h2>Report Details For LHB Division Pre Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  P.O.H Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="POHDate"
                  value={formDataDivision.POHDate}
                  onChange={handleChange}
                />
                {errors.POHDate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.POHDate}
                  </p>
                )}
              </div>
              {/* <div>
                <label>
                  Return Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="returndate"
                  value={formDataDivision.returndate}
                  onChange={handleChange}
                />
                {errors.returndate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.returndate}
                  </p>
                )}
              </div> */}
              <div>
                <label>
                  Division Report:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="divisionreport"
                  value={formDataDivision.divisionreport}
                  onChange={handleChange}
                  placeholder="Enter Division Report"
                />
                {errors.divisionreport && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.divisionreport}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Matunga Inspection Report:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="matungareport"
                  value={formDataDivision.matungareport}
                  onChange={handleChange}
                  placeholder="Enter Matunga Inspection Report"
                />
                {errors.matungareport && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.matungareport}
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
                      navigate("/proceedsubmitLHBDivision");
                    }
                  }}
                >
                  Preview for Submission
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/LHBDivisionPreInspectionForm/wheel_details");
                  }}
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

export default ReportDetails;
