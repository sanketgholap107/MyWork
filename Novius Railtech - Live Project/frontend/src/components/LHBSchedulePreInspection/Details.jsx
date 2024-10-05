import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function Details({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep
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

  const location = useLocation();
  const { ShopSrNumber} = location.state || {};

  useEffect(() => {
    if (ShopSrNumber) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ShopSrNumber:ShopSrNumber
      }));
    }
  }, [ShopSrNumber, setFormData]);

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
    if (!formData.ShopSrNumber) {
      newErrors.ShopSrNumber = "Shop Sr. Number  is required.";
    } else if (!/^\d+$/.test(formData.ShopSrNumber)) {
      newErrors.ShopSrNumber = "Shop Sr. Number must be numeric.";
    }

    if (!formData.AxleNumber) {
      newErrors.AxleNumber = "Axle Number is required.";
    }

    if (!formData.ReceiveDate) {
      newErrors.ReceiveDate = "Receive Date is required.";
    }

    if (!formData.DispatchDate) {
      newErrors.DispatchDate = "Dispatch Date is required.";
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

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBSchedulePreInspection/coach_details");
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
      <h2> Details for LHB SCHEDULE PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Shop Sr. No. (Wheel No.):<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="ShopSrNumber"
                  value={formData.ShopSrNumber}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr. No."
                />
                {errors.ShopSrNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShopSrNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Axle No:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="AxleNumber"
                  value={formData.AxleNumber}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
                {errors.AxleNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.AxleNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Receive Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="ReceiveDate"
                  value={formData.ReceiveDate}
                  onChange={handleChange}
                />
                {errors.ReceiveDate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ReceiveDate}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Dispatch Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="DispatchDate"
                  value={formData.DispatchDate}
                  onChange={handleChange}
                />
                {errors.DispatchDate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DispatchDate}
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

export default Details;
