import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { postData } from "../Axios/AxiosConnection";

function WheelDetails({ formDataPressOffLHB, setFormDataPressOffLHB, onInputChange,
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
        setFile(file); // Set the single file to state
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleBack = () => {
    navigate("/LHBPressOffForm/identification_details");
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
    console.log(formDataPressOffLHB);
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOffLHB.TypeOfWheel) {
      newErrors.TypeOfWheel = "Type Of Wheel is required.";
    }

    if (!formDataPressOffLHB.WheelPressedOff) {
      newErrors.WheelPressedOff = "Wheel Pressed Off is required.";
    }

    if (!formDataPressOffLHB.Reason) {
      newErrors.Reason = "Reason is required.";
    }

    if (!formDataPressOffLHB.PressedOffRemark) {
      newErrors.PressedOffRemark = "Pressed Off Remark is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataPressOffLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
    DepartmentID: 2,
    WheeltypeID: 1,
    }));
    onResetStep();
    navigate("/LHBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

    try {
      const response = await postData("/api/data", formDataPressOffLHB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffLHB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
        }));

        navigate("/LHBPressOffForm/identification_details");
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
        PRESS-OFF OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Report Details For PRESS-OFF OF LHB WHEEL FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>Type Of Wheel:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="TypeOfWheel"
                  value={formDataPressOffLHB.TypeOfWheel}
                  onChange={handleChange}
                  placeholder="Enter Type Of Wheel"
                />
                {errors.TypeOfWheel && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.TypeOfWheel}</p>
                )}
              </div>
              <div>
                <label>Wheel Pressed Off for RA/RD/RG<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelPressedOff"
                  value={formDataPressOffLHB.WheelPressedOff}
                  onChange={handleChange}
                  placeholder="Enter Wheel PressedOff for RA/RD/RG"
                />
                {errors.WheelPressedOff && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelPressedOff}</p>
                )}
              </div>
              <div>
                <label>
                Reason:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Reason"
                  value={formDataPressOffLHB.Reason}
                  onChange={handleChange}
                  placeholder="Enter Reason"
                />
                {errors.Reason && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.Reason}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                Pressed Off Remark:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="PressedOffRemark"
                  value={formDataPressOffLHB.PressedOffRemark}
                  onChange={handleChange}
                  placeholder="Enter Pressed Off Remark"
                />
                {errors.PressedOffRemark && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.PressedOffRemark}</p>
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
                  // value={formDataPressOffLHB.EndHole}
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
                <button onClick={() => {if (validateForm()) {navigate("/proceedsubmitpressoff")}}}>
                  Preview for Submission
                </button>
              </div>
              <div>
              <button className="back_btn" onClick={handleBack}>Back</button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>Cancel</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WheelDetails;
