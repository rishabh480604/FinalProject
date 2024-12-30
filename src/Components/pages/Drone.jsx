import React, { useState } from 'react';
import './Drone.css'; // Import your CSS file for styling

const Drone = () => {
    const [selectedDrone, setSelectedDrone] = useState(null); // State to hold the selected drone

    // Sample drone data
    const drones = {
        service: {
            id: 'SD001',
            capacity: '10 kg',
            type: 'Service Drone',
        },
        survey: {
            id: 'SR001',
            capacity: '5 kg',
            type: 'Survey Drone',
        },
    };

    // Function to handle drone selection
    const handleDroneClick = (droneType) => {
        setSelectedDrone(drones[droneType]); // Set the selected drone data
    };

    return (
        <div className="drone-container">
            <h1>Drones</h1>
            <div className="drone-options">
                <button onClick={() => handleDroneClick('service')}>Service Drone</button>
                <button onClick={() => handleDroneClick('survey')}>Survey Drone</button>
            </div>

            {selectedDrone && (
                <div className="drone-details">
                    <h2>{selectedDrone.type}</h2>
                    <p><strong>Drone ID:</strong> {selectedDrone.id}</p>
                    <p><strong>Capacity:</strong> {selectedDrone.capacity}</p>
                </div>
            )}
        </div>
    );
};

export default Drone;
