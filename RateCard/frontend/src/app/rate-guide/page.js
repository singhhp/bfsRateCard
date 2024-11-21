"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RateGuide = () => {
  const [rateGuideData, setRateGuideData] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState("fedex_domestic");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/${selectedCarrier}/`)
      .then((response) => {
        setRateGuideData(response.data);
      })
      .catch((error) => console.error("Error fetching rate guide data:", error));
  }, [selectedCarrier]);

  const carriers = [
    { id: "fedex_domestic", label: "FedEx Domestic" },
    { id: "fedex_international", label: "FedEx International" },
    { id: "ups_domestic", label: "UPS Domestic" },
    { id: "ups_international", label: "UPS International" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rate Guide</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        {carriers.map((carrier) => (
          <button
            key={carrier.id}
            style={{
              ...styles.tab,
              ...(selectedCarrier === carrier.id
                ? styles.activeTab
                : styles.inactiveTab),
            }}
            onClick={() => setSelectedCarrier(carrier.id)}
          >
            {carrier.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th>Service Type</th>
              <th>Industry Code</th>
              <th>Min Base Price</th>
              <th>Start Zone</th>
              <th>End Zone</th>
              <th>Start Weight</th>
              <th>End Weight</th>
              <th>Discount %</th>
            </tr>
          </thead>
          <tbody>
            {rateGuideData.map((row, index) => (
              <tr key={index} style={styles.row}>
                <td>{row.service_type}</td>
                <td>{row.industry_code}</td>
                <td>{row.minimum_base_price}</td>
                <td>{row.start_zone}</td>
                <td>{row.end_zone}</td>
                <td>{row.start_weight}</td>
                <td>{row.end_weight}</td>
                <td>{row.discount_percent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    margin: "0 5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
  },
  activeTab: {
    backgroundColor: "#007bff",
    color: "#fff",
    borderColor: "#007bff",
  },
  inactiveTab: {
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  tableContainer: {
    overflowX: "auto",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  row: {
    textAlign: "center",
    borderBottom: "1px solid #ccc",
  },
};

export default RateGuide;
