import React, { useState, useEffect } from "react";
import "../resources/pendingtasks/pendingtasks.css";
import { useNavigate } from "react-router-dom";
import api from "./Axios/AxiosConnection.js";

function PendingTasks() {
  const [selectedFields, setSelectedFields] = useState({
    All: true,
    "Press-Off": true,
    "Final Inspection": true,
    Dispatch: true,
    "Press-On": true,
    "PreInspection": true,
  });

  const [pressOffData, setPressOffData] = useState([]);
  const [pressOnPendingData, setpressOnPendingData] = useState([]);
  const [dispatchPendingData, setdispatchPendingData] = useState([]);
  const [finalInspectionData, setfinalInspectionData] = useState([]);
  const [finalInspectionData2, setfinalInspectionData2] = useState([]);
  const [filteredPressOffData, setFilteredPressOffData] = useState([]);
  const [filteredPressOnData, setFilteredPressOnData] = useState([]);
  const [filteredfinalInspectionData, setFilteredfinalInspectionData] =
  useState([]);
  const [filteredfinalInspectionData2, setFilteredfinalInspectionData2] =
  useState([]);
  const [wheelNumbers, setWheelNumbers] = useState([]);
  const [preInspectionPendingData, setpreInspectionPendingData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wheel numbers from local storage
    const storedWheelNumbers =
      JSON.parse(localStorage.getItem("wheelNumbers")) || [];
    setWheelNumbers(storedWheelNumbers);
  }, []);

  useEffect(() => {
    const fetchPressOffData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/heavyrepair/pressofftable"
        );
        setPressOffData(response.data);
      } catch (error) {
        console.error("Error fetching press-off data:", error);
      }
    };

    fetchPressOffData();
  }, []);

  useEffect(() => {
    const finalInspectionData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/normalrepair/finalinspectiontable"
        );
        console.log("final inspection response: ", response);
        setfinalInspectionData(response.data);
      } catch (error) {
        console.error("Error fetching final-Inspection data: ", error);
      }
    };

    finalInspectionData();

    const PressOnApprovedfinalInspectionData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/dataComingFromPressOn/finalinspectiontable"
        );
        console.log("final inspection response: ", response);
        setfinalInspectionData2(response.data);
      } catch (error) {
        console.error("Error fetching final-Inspection data: ", error);
      }
    };

    PressOnApprovedfinalInspectionData();
  }, []);

  useEffect(() => {
    const pressOnPendingData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/pendingdataof/pressontable"
        );
        console.log("pending data for press on response: ", response);
        setpressOnPendingData(response.data);
      } catch (error) {
        console.error("Error fetching  press on pending data: ", error);
      }
    };

    pressOnPendingData();
  }, []);

  useEffect(() => {
    const dispatchPendingData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/pendingdataof/dispatchtable"
        );
        console.log("pending data for dispatch response: ", response);
        setdispatchPendingData(response.data);
      } catch (error) {
        console.error("Error fetching  dispatch pending data: ", error);
      }
    };

    dispatchPendingData();
  }, []);

  useEffect(() => {
    // if (pressOnPendingData.length && pressOffData.length) {
    const filteredData = pressOffData.filter(
      (pressOffItem) =>
        !pressOnPendingData.some(
          (pressOnItem) => pressOnItem.WheelNo === pressOffItem.WheelNo
        )
    );
    setFilteredPressOffData(filteredData);
    // }
  }, [pressOnPendingData, pressOffData]);

  useEffect(() => {
    const filteredData = pressOnPendingData.filter(
      (pressOnItem) =>
        !finalInspectionData2.some(
          (pressonApprovedItem) =>
            pressonApprovedItem.WheelNo === pressOnItem.WheelNo
        )
    );
    setFilteredPressOnData(filteredData);
  }, [finalInspectionData2, pressOnPendingData]);

  useEffect(() => {
    const filteredData = finalInspectionData.filter(
      (finalInspectionItem) =>
        !dispatchPendingData.some(
          (dispatchItem) => dispatchItem.WheelNo === finalInspectionItem.WheelNo
        )
    );
    setFilteredfinalInspectionData(filteredData);

    const filteredData2 = finalInspectionData2.filter(
      (finalInspectionItem2) =>
        !dispatchPendingData.some(
          (dispatchItem) =>
            dispatchItem.WheelNo === finalInspectionItem2.WheelNo
        )
    );
    setFilteredfinalInspectionData2(filteredData2);
  }, [dispatchPendingData, finalInspectionData, finalInspectionData2]);

  const handleFieldChange = (field) => {
    const newSelectedFields = { ...selectedFields };

    if (field === "All") {
      const newValue = !selectedFields.All;
      Object.keys(newSelectedFields).forEach((key) => {
        newSelectedFields[key] = newValue;
      });
    } else {
      newSelectedFields[field] = !selectedFields[field];
      newSelectedFields.All = Object.values(newSelectedFields).every(
        (value) => value
      );
    }

    setSelectedFields(newSelectedFields);
  };

  // const formatDate = (isoDate) => {
  //   const date = new Date(isoDate);
  //   return date.toLocaleDateString();
  // };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="pending-tasks-container">
        <h1>Jobs Pending For LHB</h1>
        <div className="cont">
          <div className="sidebar2">
            <div>
              <ul className="sidebarlist2">
                {Object.keys(selectedFields).map((field) => (
                  <li key={field} onClick={() => handleFieldChange(field)}>
                    <input
                      type="checkbox"
                      checked={selectedFields[field]}
                      onChange={() => handleFieldChange(field)}
                      style={{ marginRight: "8px" }}
                    />
                    {field}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="vertical"></div>
            </div>
          </div>
          <div className="tt">
            {selectedFields.All && <></>}
            {selectedFields["Press-Off"] && (
              <div className="tred-turning">
                <h3>Wheels Pending for Press-Off</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Wheel No.</th>
                      <th>Date of Entry</th>
                      <th>Proceed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPressOffData.map((item) => (
                      <tr key={item.WheelID}>
                        <td>{item.WheelNo}</td>
                        <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                      
                        <td>
                          <button onClick={() =>
                            navigate("/LHBPressOffForm/identification_details",{ state: { WheelNo: item.WheelNo, wheelid: item.WheelID } })
                          }>Proceed</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedFields["PreInspection"] && (
              <div className="tred-turning">
                <h3>Wheels Pending for Prinspection</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Wheel No.</th>
                      <th>Date of Entry</th>
                      <th>Proceed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wheelNumbers.map((wheelNo, index) => (
                      <tr key={index}>
                        <td>{wheelNo}</td>
                        <td>Date Placeholder</td>
                        <td>
                        <button onClick={() =>
                            navigate("/LHBSchedulePreInspection/details",{ state: { ShopSrNumber: wheelNo} })
                          }>Proceed</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedFields["Final Inspection"] && (
              <div className="wheel-assembly">
                <h3>Wheels Pending for Final Inspection</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Wheel No.</th>
                      <th>Date of Entry</th>
                      <th>Proceed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredfinalInspectionData.map((item) => (
                      <tr key={item.WheelID}>
                        <td>{item.WheelNo}</td>
                        <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate("/lhbfinalinspection/axle_details", {
                                state: {
                                  WheelNo: item.WheelNo,
                                  wheelid: item.WheelID,
                                },
                              })
                            }
                          >
                            Proceed
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredfinalInspectionData2.map((item) => (
                      <tr key={item.WheelID}>
                        <td>{item.WheelNo}</td>
                        <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate("/lhbfinalinspection/axle_details", {
                                state: {
                                  WheelNo: item.WheelNo,
                                  wheelid: item.WheelID,
                                },
                              })
                            }
                          >
                            Proceed
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedFields["Dispatch"] && (
              <div className="roller-bearing">
                <h3>Wheels Pending for Dispatch</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Wheel No.</th>
                      <th>Date of Entry</th>
                      <th>Proceed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispatchPendingData.map((item) => (
                      <tr key={item.WheelID}>
                        <td>{item.WheelNo}</td>
                        <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate(
                                "/wheelsdispatchrecordform/divisionorcarshed_details",
                                {
                                  state: {
                                    WheelNo: item.WheelNo,
                                    wheelid: item.WheelID,
                                  },
                                }
                              )
                            }
                          >
                            Proceed
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedFields["Press-On"] && (
              <div className="press-on">
                <h3>Wheels Pending for Press-On</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Wheel No.</th>
                      <th>Date of Entry</th>
                      <th>Proceed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPressOnData.map((item) => (
                      <tr key={item.WheelID}>
                        <td>{item.WheelNo}</td>
                        <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                        <td>
                          <button
                            onClick={() =>
                              navigate("/LHBPressOnForm/wheel_details", {
                                state: {
                                  WheelNo: item.WheelNo,
                                  wheelid: item.WheelID,
                                },
                              })
                            }
                          >
                            Proceed
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingTasks;
