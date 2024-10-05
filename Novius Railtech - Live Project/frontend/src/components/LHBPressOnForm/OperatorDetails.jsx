import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function OperatorDetails({ formDataPressOnLHB, setFormDataPressOnLHB, onInputChange,
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
        console.log(formDataPressOnLHB);
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formDataPressOnLHB.MCNo) {
            newErrors.MCNo = "MC No is required.";
        } else if (!/^\d+$/.test(formDataPressOnLHB.MCNo)) {
            newErrors.MCNo = "MC No must be numeric.";
        }

        if (!formDataPressOnLHB.Operator) {
            newErrors.Operator = "Operator is required.";
        }

        if (!formDataPressOnLHB.Inspector) {
            newErrors.Inspector = "Inspector is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCancel = () => {
        setFormDataPressOnLHB((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {}),
            createdBy: "ADMIN",
        }));
        onResetStep();
        navigate("/LHBPressOnForm/details");
    };

    const handleBack = () => {
        navigate("/LHBPressOnForm/brakediscBBoresize_details");
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (validateForm()) {

            try {
                const response = await postData("/api/data", formDataPressOnLHB);
                console.log(response.AxleNumber);
                if (response) {
                    const data = await response; // Get JSON from the response
                    console.log("Form submitted successfully:", data);
                    setFormDataPressOnLHB((prevFormData) => ({
                        ...Object.keys(prevFormData).reduce((acc, key) => {
                            acc[key] = null;
                            return acc;
                        }, {}),
                        createdBy: "ADMIN",
                        SectionId: 1,
                        DepartmentId: 2,
                        WheeltypeId: 1,
                    }));

                    navigate("/LHBPressOnForm/axle_details");
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
            <h2 style={{ textAlign: "center", backgroundColor: "black", color: "white", opacity: 1 }}>PRESS-ON OF LHB WHEEL FORM </h2>
            <h2>Operator Details for PRESS-ON OF LHB WHEEL FORM</h2>

            <div className="page-border">
                <div className="page-contentLHB">

                    <div className="wheel-page-main-content">
                        <div className="row-1">
                            <div>
                                <label>M/C No.:<span className="required-asterisk">*</span></label>
                                <input
                                    type="text"
                                    name="MCNo"
                                    value={formDataPressOnLHB.MCNo}
                                    onChange={handleChange}
                                    placeholder="Enter M/C No."
                                />
                                {errors.MCNo && (
                                    <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.MCNo}</p>
                                )}
                            </div>
                            <div>
                                <label>Operator:<span className="required-asterisk">*</span></label>
                                <input
                                    type="text"
                                    name="Operator"
                                    value={formDataPressOnLHB.Operator}
                                    onChange={handleChange}
                                    placeholder="Enter Operator"
                                />
                                {errors.Operator && (
                                    <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.Operator}</p>
                                )}
                            </div>
                            <div>
                                <label>Inspector:<span className="required-asterisk">*</span></label>
                                <input
                                    type="text"
                                    name="Inspector"
                                    value={formDataPressOnLHB.Inspector}
                                    onChange={handleChange}
                                    placeholder="Enter Inspector"
                                />
                                {errors.Inspector && (
                                    <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.Inspector}</p>
                                )}
                            </div>

                        </div>
                        <div className="row-2">
                            <div>
                                <label>Remark:</label>
                                <input
                                    type="text"
                                    name="Remark"
                                    // value={formDataPressOnLHB.EndHole}
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
                                    <span className="drag-drop" >Drag & drop files</span>
                                    <span className="drag-or">--------- or ---------</span>
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
                        <div className="row-3">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="btn-container">
                            <div>
                                <button type="submit" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                            <div>
                                <button onClick={() => { if (validateForm()) { navigate("/proceedsubmitlhbpresson") } }}>
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

export default OperatorDetails;
