import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function DivisionorCarshedDetails({ formDataWheelDispatch, setformDataWheelDispatch, onInputChange,
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
        setFile(file);  // Set the single file to state
      }
    },
  });

  const location = useLocation(); 
  const { WheelNo,wheelid } = location.state || {};

  useEffect(() => {
    console.log("working");
    if (WheelNo && wheelid) {
      
      setformDataWheelDispatch((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid:wheelid
      }));
    }
  }, [WheelNo,wheelid, setformDataWheelDispatch]);


  const validateForm = () => {
    const newErrors = {};
    if (!formDataWheelDispatch.date) {
      newErrors.date = "Date is required.";
    }

    if (!formDataWheelDispatch.DivisionCarshed) {
      newErrors.DivisionCarshed = "Division/Carshed is required.";
    }

    if (!formDataWheelDispatch.AxleUSTCode) {
      newErrors.AxleUSTCode = "Axle UST Code is required.";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    console.log(formDataWheelDispatch);
  };

  const handleCancel = () => {
    setformDataWheelDispatch((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 5,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/wheelsdispatchrecordform/divisionorcarshed_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/wheelsdispatchrecordform/wheel_details");
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
        DIVISION/CARSHED WHEELS DISPATCH RECORD FORM
      </h2>
      <h2>DIVISION/CARSHED Details for  DIVISION/CARSHED WHEELS DISPATCH RECORD FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formDataWheelDispatch.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.date}</p>
                )}
              </div>
              <div>
                <label>
                  Division/Carshed:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DivisionCarshed"
                  value={formDataWheelDispatch.DivisionCarshed}
                  onChange={handleChange}
                  placeholder="Enter Division or Carshed"
                />
                {errors.DivisionCarshed && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.DivisionCarshed}</p>
                )}
              </div>
              <div>

              </div>

            </div>
            <div className="row-2">
              <div>
                <label>Axle UST Code:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="AxleUSTCode"
                  value={formDataWheelDispatch.AxleUSTCode}
                  onChange={handleChange}
                  placeholder="Enter Axle UST Code"
                />
                {errors.AxleUSTCode && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.AxleUSTCode}</p>
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
                  <span className="drag-drop" >Drag & drop files</span>
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
                  name="remark"
                  // value={formDataWheelDispatch.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
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

export default DivisionorCarshedDetails;
