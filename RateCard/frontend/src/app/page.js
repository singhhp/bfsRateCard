// src/app/page.js
"use client";
import React, { useState } from 'react';
import Home from './components/Home';  // Import Home component
import Navbar from './components/Navbar';
import ServiceList from './components/ServiceList';

export default function Page() {
    const [selectedCarrier, setSelectedCarrier] = useState('FedEx');
    const [isHomeScreen, setIsHomeScreen] = useState(true);  // State to track if we're on the Home screen

    return (
        <div>
            {isHomeScreen ? (
                <Home />  // Show Home component on initial load
            ) : (
                <div>
                    <Navbar onCarrierChange={setSelectedCarrier} />
                    <ServiceList carrier={selectedCarrier} />
                </div>
            )}
        </div>
    );
}
