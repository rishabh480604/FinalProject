import React, { useState } from 'react';
import './BookServices.css';

const BookServices = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');

    const handleBookNow = () => {
        // Redirecting to a sample payment gateway URL
        window.open('https://pay.google.com/', '_blank');
    };

    const renderServiceDetails = () => {
        switch (selectedService) {
            case 'Spraying':
                return (
                    <div>
                        <h3>Spraying Options</h3>
                        <button onClick={() => setSelectedSubOption('Pesticides')}>Pesticides</button>
                        <button onClick={() => setSelectedSubOption('Insecticides')}>Insecticides</button>
                        <button onClick={() => setSelectedSubOption('Fertilizer')}>Fertilizer</button>
                        {selectedSubOption === 'Pesticides' && renderPesticidesForm()}
                        {selectedSubOption === 'Insecticides' && renderInsecticidesForm()}
                        {selectedSubOption === 'Fertilizer' && renderFertilizerForm()}
                    </div>
                );
            case 'Sowing':
                return renderSowingForm();
            case 'Testing':
                return renderTestingForm();
            case 'Information':
                return renderInformationLinks();
            default:
                return <p>Select a service to get started.</p>;
        }
    };

    const renderPesticidesForm = () => (
        <div>
            <h4>Pesticides</h4>
            <input type="text" placeholder="Type of Pesticides" />
            <input type="number" placeholder="Quantity" />
            <input type="text" placeholder="Crop Area" />
            <input type="text" placeholder="Crop Type" />
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
    );

    const renderInsecticidesForm = () => (
        <div>
            <h4>Insecticides</h4>
            <input type="text" placeholder="Type of Insecticides" />
            <input type="number" placeholder="Quantity" />
            <input type="text" placeholder="Crop Area" />
            <input type="text" placeholder="Crop Type" />
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
    );

    const renderFertilizerForm = () => (
        <div>
            <h4>Fertilizer</h4>
            <input type="text" placeholder="Soil Data" />
            <input type="number" placeholder="Quantity" />
            <input type="text" placeholder="Land Area" />
            <input type="text" placeholder="Type of Fertilizer" />
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
    );

    const renderSowingForm = () => (
        <div>
            <h4>Sowing</h4>
            <input type="text" placeholder="Grain Type" />
            <input type="number" placeholder="Land Area" />
            <select>
                <option>Hybrid</option>
                <option>Desi</option>
            </select>
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
    );

    const renderTestingForm = () => (
        <div>
            <h4>Soil Testing</h4>
            <input type="text" placeholder="Sample ID" />
            <input type="text" placeholder="Location" />
            <input type="number" placeholder="Number of Samples" />
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
        </div>
    );

    const renderInformationLinks = () => (
        <div>
            <h4>Information</h4>
            <p>
                <a href="https://mausam.imd.gov.in/" target="_blank" rel="noopener noreferrer">Weather Report (IMD)</a>
            </p>
            <p>
                <a href="https://farmer.gov.in/" target="_blank" rel="noopener noreferrer">Government Schemes for Farmers</a>
            </p>
        </div>
    );

    return (
        <div className="book-services-container">
            <h1>Book Services</h1>
            <div className="service-buttons">
                <button onClick={() => { setSelectedService('Spraying'); setSelectedSubOption(''); }}>Spraying</button>
                <button onClick={() => { setSelectedService('Sowing'); setSelectedSubOption(''); }}>Sowing</button>
                <button onClick={() => { setSelectedService('Testing'); setSelectedSubOption(''); }}>Testing</button>
                <button onClick={() => { setSelectedService('Information'); setSelectedSubOption(''); }}>Information</button>
            </div>

            {renderServiceDetails()}
        </div>
    );
};

export default BookServices;
