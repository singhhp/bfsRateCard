
"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceList from '../components/ServiceList';

const RateCardGenerator = () => {
    const [selectedCarrier, setSelectedCarrier] = useState('FedEx');

    return (
        <div>
            <Navbar onCarrierChange={setSelectedCarrier} />
            <ServiceList carrier={selectedCarrier} />
        </div>
    );
};

export default RateCardGenerator;
