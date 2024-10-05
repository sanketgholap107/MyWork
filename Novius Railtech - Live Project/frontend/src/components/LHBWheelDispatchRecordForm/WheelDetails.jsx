import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function WheelDetails({ formDataWheelDispatch, setformDataWheelDispatch, onInputChange,
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

  // const location = useLocation(); 
  // const { WheelNo,wheelid } = location.state || {};

  // useEffect(() => {
  //   console.log("working");
  //   if (WheelNo && wheelid) {
      
  //     setformDataWheelDispatch((prevFormData) => ({
  //       ...prevFormData,
  //       WheelNo: WheelNo,
  //       wheelid:wheelid
  //     }));
  //   }
  // }, [WheelNo,wheelid, setformDataWheelDispatch]);



  const validateForm = () => {
    const newErrors = {};
    if (!formDataWheelDispatch.LooryNo) {
      newErrors.LooryNo = "Loory No. is required.";
    } else if (!/^\d+$/.test(formDataWheelDispatch.LooryNo)) {
      newErrors.LooryNo = "Loory No must be numeric.";
    }

    if (!formDataWheelDispatch.WheelNo) {
      newErrors.WheelNo = "Wheel No is required.";
    } else if (!/^\d+$/.test(formDataWheelDispatch.WheelNo)) {
      newErrors.WheelNo = "Wheel No must be numeric.";
    }

    if (!formDataWheelDispatch.TypeOfWheel) {
      newErrors.TypeOfWheel = "Inspector T.No. is required.";
    }


    if (!formDataWheelDispatch.TradeDiameter) {
      newErrors.TradeDiameter = "Trade Diameter is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataWheelDispatch.TradeDiameter)) {
      newErrors.TradeDiameter = "Trade Diameter must be numeric.";
    }

    if (!formDataWheelDispatch.WheelGauge) {
      newErrors.WheelGauge = "Wheel Gauge is required.";
    } else if (!/^\d+(\.\d+)?$/.test(formDataWheelDispatch.WheelGauge)) {
      newErrors.WheelGauge = "Wheel Gauge must be numeric.";
    }

    if (!formDataWheelDispatch.remark) {
      newErrors.remark = "Dispatch Remark is required.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const response = await postData("/api/data", formDataWheelDispatch);
        console.log(response.AxleNo);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataWheelDispatch((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
          }));

          navigate("/wheelsdispatchrecordform/divisionorcarshed_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
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

  return (
    <div className="component">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "white", opacity: 1 }}> DIVISION/CARSHED WHEELS DISPATCH RECORD FORM </h2>
      <h2>Wheel Details for  DIVISION/CARSHED WHEELS DISPATCH RECORD FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">

          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>Loory No:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="LooryNo"
                  value={formDataWheelDispatch.LooryNo}
                  onChange={handleChange}
                  placeholder="Enter Loory No"
                />
                {errors.LooryNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.LooryNo}</p>
                )}
              </div>
              <div>
                <label>Wheel No:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataWheelDispatch.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No"
                />
                {errors.WheelNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.WheelNo}</p>
                )}
              </div>
              <div>
                <label>Type of Wheel:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="TypeOfWheel"
                  value={formDataWheelDispatch.TypeOfWheel}
                  onChange={handleChange}
                  placeholder="Enter Type Of Wheel"
                />
                {errors.TypeOfWheel && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.TypeOfWheel}</p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>Trade Diameter(M.M.):<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="TradeDiameter"
                  value={formDataWheelDispatch.TradeDiameter}
                  onChange={handleChange}
                  placeholder="Enter Trade Diameter"
                />
                {errors.TradeDiameter && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.TradeDiameter}</p>
                )}
              </div>
              <div>
                <label>Wheel Gauge(M.M.):<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelGauge"
                  value={formDataWheelDispatch.WheelGauge}
                  onChange={handleChange}
                  placeholder="Enter Wheel Gauge"
                />
                {errors.WheelGauge && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.WheelGauge}</p>
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
                <label>Dispatch Remark:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="remark"
                  value={formDataWheelDispatch.remark}
                  onChange={handleChange}
                  placeholder="Enter Remark"
                />
                {errors.remark && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.remark}</p>
                )}
              </div>
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataWheelDispatch.remark}
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
                <button onClick={() => { if (validateForm()) { navigate("/proceedsubmitlhbwheelsdispatch") } }}>
                  Preview for Submission
                </button>
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
