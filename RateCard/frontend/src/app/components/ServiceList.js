// components/ServiceList.js
import React, { useState } from 'react';

const services = ['2 Day Air AM', '2 Day Air AM Ltr', 'Economy 2 Day','Economy 2 Day Letter','Express Saver','Express Saver Letter','FedEx Ground to Canada','FedEx Smart Post','FedEx Smart Post Under 1 lb','First Overnight','First Overnight Letter','Ground @Home','Ground Prepaid'];

const ServiceList = ({ carrier }) => {
    const [rates, setRates] = useState(
        services.map((service) => ({
            name: service,
            minRate: 10, // Placeholder value
            discount: 0,
            byZone: false,
            isSelected: false,
        }))
    );

    const handleRateChange = (index, field, value) => {
        const updatedRates = [...rates];
        updatedRates[index][field] = value;
        setRates(updatedRates);
    };

    const handleCheckboxChange = (index) => {
        const updatedRates = [...rates];
        updatedRates[index].isSelected = !updatedRates[index].isSelected;
        setRates(updatedRates);
    };

    const isPrintCheckedEnabled = rates.some((service) => service.isSelected);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>{carrier} Services</h2>
                <div style={styles.buttonGroup}>
                    <button style={styles.button}>Print All</button>
                    <button 
                        style={{ ...styles.button, opacity: isPrintCheckedEnabled ? 1 : 0.5 }}
                        disabled={!isPrintCheckedEnabled}
                    >
                        Print Only Checked
                    </button>
                </div>
            </div>
            {rates.map((service, index) => (
                <div key={index} style={styles.serviceRow}>
                    <input
                        type="checkbox"
                        checked={service.isSelected}
                        onChange={() => handleCheckboxChange(index)}
                    />
                    <span style={styles.serviceName}>{service.name}</span>
                    <div style={styles.inputGroup}>
                        <span style={styles.label}>MIN</span>
                        <input
                            type="number"
                            value={service.minRate}
                            onChange={(e) => handleRateChange(index, 'minRate', e.target.value)}
                            placeholder="Base Rate"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="number"
                            value={service.discount}
                            onChange={(e) => handleRateChange(index, 'discount', e.target.value)}
                            placeholder="Discount"
                            style={styles.input}
                        />
                        <span style={styles.label}>%</span>
                    </div>
                    <button style={styles.button}>View</button>
                    <button style={styles.button}>Add Weight Break</button>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={service.byZone}
                            onChange={(e) => handleRateChange(index, 'byZone', e.target.checked)}
                        />
                        By Zone
                    </label>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
    },
    serviceRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        gap: '10px',
    },
    serviceName: {
        width: '100px',
        fontWeight: 'bold',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        width: '100px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
};

export default ServiceList;
