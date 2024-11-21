"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './NetRateTable.css';  // Importing the CSS file

const NetRateTable = () => {
  const [netRateTable, setNetRateTable] = useState({});
  const [selectedCarrier, setSelectedCarrier] = useState("fedex_domestic");
  const [serviceType, setServiceType] = useState("Next Day Air Priority");
  const [industryCode, setIndustryCode] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/${selectedCarrier}/${serviceType}/${industryCode}/net-rate-table/`)
      .then((response) => {
        const fetchedTable = response.data.net_rate_table;
        if (fetchedTable && typeof fetchedTable === "object") {
          setNetRateTable(fetchedTable);
        } else {
          console.error("Invalid net rate table format:", fetchedTable);
          setNetRateTable({});
        }
      })
      .catch((error) => console.error("Error fetching net rate table:", error))
      .finally(() => setLoading(false));
  }, [selectedCarrier, serviceType, industryCode]);

  return (
    <div className="net-rate-table-container">
      <h2 className="title">Net Rate Table</h2>
      <div className="filters">
        <select
          className="dropdown"
          value={selectedCarrier}
          onChange={(e) => setSelectedCarrier(e.target.value)}
        >
          <option value="fedex_domestic">FedEx Domestic</option>
          <option value="ups_domestic">UPS Domestic</option>
        </select>

        <select
          className="dropdown"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="Next Day Air Priority">Next Day Air Priority-Package</option>
          <option value="Next Day Air Saver Package">Next Day Air Saver-Package</option>
          {/* Add other service types */}
        </select>

        <select
          className="dropdown"
          value={industryCode}
          onChange={(e) => setIndustryCode(e.target.value)}
        >
          <option value="1">Industry Code 1</option>
          <option value="105">Industry Code 105</option>
          {/* Add other industry codes */}
        </select>
      </div>
      {loading ? ( // Show loader when loading
        <div className="loader">Loading...</div>
      ) 
      :Object.keys(netRateTable).length === 0 ? (
        <p>No data available for the selected carrier, service, or industry code.</p>
      ) : (
        <table className="rate-table">
          <thead>
            <tr>
              <th>Weight</th>
              {Object.keys(netRateTable[Object.keys(netRateTable)[0]] || {}).map((zone) => (
                <th key={zone}>Zone {zone}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(netRateTable).map((weight) => (
              <tr key={weight}>
                <td>{weight}</td>
                {Object.keys(netRateTable[weight]).map((zone) => (
                  <td key={zone}>
                    {netRateTable[weight][zone]
                      ? `$${netRateTable[weight][zone].toFixed(2)}`
                      : "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NetRateTable;
