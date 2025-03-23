import React, { useEffect, useState } from 'react';
import './BookServices.css';
import conf from "./../../config"
import { useSelector } from 'react-redux';
import axios from 'axios';

const BookServices = () => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedSubOption, setSelectedSubOption] = useState('');
    const [selectedModel,setSelectedModel]=useState('');
    const [modelResult,setModelResult]=useState('');
    const PlantModel=['Potato', 'Corn', 'BlackPepper'];
    const typesOfPesticides=['Insecticides','Herbicides','Rodenticides', 'Bactericides', 'Fungicides','Larvicides'];
    const [pesticideForm,setPesticideForm]=useState({
        name:'',
        phoneNo:'',
        cropName:'',
        quantity:'',
        cropArea:'',
        pesticideType:'',
        pesticideName:'',
    });
    const [fertilizerForm,setFertilizerForm]=useState({
        name:'',
        phoneNo:'',
        cropName:'',
        quantity:'',
        cropArea:'',
        fertilizerName:''
    });
    const [sowingForm,setSowingForm]=useState({
        name:'',
        phoneNo:'',
        grainName:'',
        landArea:'',//float
        grainType:''
    });
    const [soilTestingForm,setSoilTestingForm]=useState({
        name:'',
        phoneNo:'',
        latitude:'',
        longitude:'',
        samples:''
    });
    const name=useSelector((state)=>state.auth.userData?.name) ?? '';
    const phoneNo=useSelector((state)=> state.auth.userData?.phoneNo) ?? '';
    function handleSoilTestingFormChange(e){
        const {name,value}=e.target;
        setSoilTestingForm({...soilTestingForm,[name]:value});
    }
    function handleSowingFormChange(e){
        const {name,value}=e.target;
        setSowingForm({...sowingForm,[name]:value});
    }
    function handlePesticideFormChange(e){
        const {name,value}=e.target;
        setPesticideForm({...pesticideForm,[name]:value});
    }
    function handleFertilizerFormChange(e){
        const {name,value}=e.target;
        setFertilizerForm({...fertilizerForm,[name]:value});
    }

    function getLocation(){
        try{
            console.log('getLOcation');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=>{

                    const long=position.coords.longitude;
                    const lat=position.coords.latitude;
                    setSoilTestingForm({...soilTestingForm,['latitude']:lat,['longitude']:long});
                    
                    // console.log(position.coords.latitude," ",position.coords.longitude);
                });
              } else {
                console.log("Geolocation not supported");
              }
        }catch(e){
            console.log(e);
        }
        
        
    }
    //change result data with useState and in select model choice clear it past result
    function fetchBookingServiceLink(bookingService){
        switch (bookingService) {
            case 'fertilizer':
                return 'http://127.0.0.1:5000/bookservice/fertilizer';
                
            case 'pesticide':
                return 'http://127.0.0.1:5000/bookservice/pesticide';
                

            case 'sowing':
                return 'http://127.0.0.1:5000/bookservice/sowing';
            
            case 'soilTesting':
                return 'http://127.0.0.1:5000/bookservice/soilTest';
                                                   
            default:
                return null;
        };
    };

    const handleBookNow = async(bookingData,bookingService) => {

        if(name==null || name==''){
            alert("Please Signin");
            return;
        }
        console.log("name : ",name,"phoneNo : ",phoneNo);

        console.log("booknow function called");
        
        bookingData={...bookingData,name:name,phoneNo:phoneNo};
        console.log(bookingData);
        const bookingServiceLink=fetchBookingServiceLink(bookingService);
        if(bookingServiceLink==null){
            alert(" Server Issue ,Invalid booking api");
        }
        const response=await axios.post(bookingServiceLink,{...bookingData});
        if(response.status==200){
            alert("Service booked Successfully");
        }else{
            alert("Server Error : ",response.data.message);
        }
        // console.log(pesticideForm);
        // Redirecting to a sample payment gateway URL
        // window.open('https://pay.google.com/', '_blank');
    };

    
    const renderServiceDetails = () => {
        switch (selectedService) {
            case 'Spraying':
                return (
                    <div>
                        <h3>Spraying Options</h3>
                        <button onClick={() => setSelectedSubOption('Pesticides')}>Pesticides</button>
                        {/* <button onClick={() => setSelectedSubOption('Insecticides')}>Insecticides</button> */}
                        <button onClick={() => setSelectedSubOption('Fertilizer')}>Fertilizer</button>
                        {selectedSubOption === 'Pesticides' && renderPesticidesForm()}
                        {/* {selectedSubOption === 'Insecticides' && renderInsecticidesForm()} */}
                        {selectedSubOption === 'Fertilizer' && renderFertilizerForm()}
                    </div>
                );
            case 'Sowing':
                return renderSowingForm();
            case 'Diagnosis':
                return renderSelectDiagnosisPlant();
            case 'Testing':
                return renderTestingForm();
            case 'Information':
                return renderInformationLinks();
            default:
                return <p>Select a service to get started.</p>;
        }
    };

    const renderSelectDiagnosisPlant = () =>(
        <div>
            <h3>Plant Selection </h3>
            {PlantModel.map((plant) => (
                <button
                    key={plant}
                    className={`px-4 py-2 m-2 rounded ${selectedModel === plant ? 'bg-[#004D01] text-white' : 'bg-[#1a1d1fb2] text-black'}`}
                    onClick={() => {
                        setSelectedModel(plant);
                        setModelResult('');
                    }}
                >
                    {plant}
                </button>
            ))}
            {selectedModel!='' && renderDiagnosisForm()}
        </div>
    )
    const getDiagnosisResult= (event) => {
        event.preventDefault();
        // console.log("diagnosis run");
        let formData = new FormData();
        formData.append("file", document.getElementById("image_file").files[0]);
        fetch(fetchPlantDiagnosisLink(), {
            method: "POST",
            body: formData
            
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // return document.getElementById("result").innerText = "Prediction: " + JSON.stringify(data);//data.prediction
            setModelResult("Predicted Disease : " + JSON.stringify(data.prediction));
        })
        .catch(error => {
            // return document.getElementById("result").innerText = "Error: " + error;
            setModelResult("Error: " + error);
            });
        };
    const renderDiagnosisForm =() =>(
        <div>
            Upload Image : <input id ="image_file" type='file' i/>
            <button className="book-now-button" onClick={getDiagnosisResult}>Diagnosis</button>
            <div className='w-full' id="result">{modelResult}</div>

            
            {/* fetchPlantDiagnosisLink */}
        </div>

    )
    const renderPesticidesForm = () => (
        <div>
            <h4>Pesticides</h4>
            <input type="text" name="cropName" value={pesticideForm.cropName} onChange={handlePesticideFormChange} placeholder="Crop Name" />
            <input type="number" name='quantity' value={pesticideForm.quantity} onChange={handlePesticideFormChange} placeholder="Quantity" />
            <input type='number' step='0.01' name='cropArea' value={pesticideForm.cropArea} onChange={handlePesticideFormChange} placeholder="Crop Area" />
            <select name='pesticideType' value={pesticideForm.pesticideType} onChange={handlePesticideFormChange}>
                <option value="" disabled>Select Pesticide Type:</option>
                {typesOfPesticides.map((pesti,index)=>( 
                <option key={index} value={pesti}>{pesti}</option>
                ))}
            </select>
            <input type="text" name="pesticideName" value={pesticideForm.pesticideName} onChange={handlePesticideFormChange} placeholder="pesticide Name" />
            <button className="book-now-button" onClick={()=>handleBookNow(pesticideForm,'pesticide')}>Book Now</button>
        </div>
    );

    // const renderInsecticidesForm = () => (
    //     <div>
    //         <h4>Insecticides</h4>
    //         <input type="text" placeholder="Type of Insecticides" />
    //         <input type="number" placeholder="Quantity" />
    //         <input type="text" placeholder="Crop Area" />
    //         <input type="text" placeholder="Crop Type" />
    //         <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
    //     </div>
    // );

    const renderFertilizerForm = () => (
        <div>
            <h4>Fertilizer</h4>
            <input type="text" name='cropName' value={fertilizerForm.cropName} placeholder="Crop Name" onChange={handleFertilizerFormChange} />
            <input type="number" name='quantity' value={fertilizerForm.quantity} placeholder="Quantity" onChange={handleFertilizerFormChange} />
            <input type='number' step='0.01' name='cropArea' value={fertilizerForm.cropArea} placeholder="Crop Area" onChange={handleFertilizerFormChange}/>
            <input type="text" name='fertilizerName' value={fertilizerForm.fertilizerName} placeholder="Fertilizer Name" onChange={handleFertilizerFormChange}/>
            <button className="book-now-button" onClick={()=>handleBookNow(fertilizerForm,'fertilizer')}>Book Now</button>
        </div>
    );
    
    // const renderDiagnosisForm =() =>(
    //     <div>
    //         Upload image :<input type="file"/>
    //         <button className="book-now-button" onClick={handleDiagnosis}>Book Now</button>
    //     </div>

    // )
    const renderSowingForm = () => (
        <div>
            <h4>Sowing</h4>
            <input type="text" placeholder="Grain Name" name='grainName' value={sowingForm.grainName} onChange={handleSowingFormChange} />
            <input type="number" step='0.01' placeholder="Land Area" name='landArea' value={sowingForm.landArea} onChange={handleSowingFormChange} />
            <select name='grainType' value={sowingForm.grainType} onChange={handleSowingFormChange}>
                <option value="" disabled>Select Grain Type:</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Desi' >Desi</option>
            </select>
            <button className="book-now-button" onClick={()=>handleBookNow(sowingForm,'sowing')}>Book Now</button>
        </div>
    );

    const renderTestingForm = () => (
        <div>
            <h4>Soil Testing</h4>
            <label for="latitude">Location : </label>
            <input type="text" name='latitude' placeholder='Latitude' value={soilTestingForm.latitude} readOnly />
            <input type="text" name='longitude' placeholder='Longitude' value={soilTestingForm.longitude} readOnly />
            <button onClick={getLocation}>Get Location</button>
            <input type="number" name='samples' value={soilTestingForm.samples} onChange={handleSoilTestingFormChange} placeholder="Number of Samples" />
            <button className="book-now-button" onClick={()=>handleBookNow(soilTestingForm,'soilTesting')}>Book Now</button>
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

    const fetchPlantDiagnosisLink =() =>{
        
        
        switch (selectedModel) {
            
            case 'Potato' :
                return conf.PotatoModel;
                
            case 'BlackPepper':
                return conf.BlackpepperModel;

            case 'Corn':
                return conf.CornModel;

            default :
                return null
                
        }
    }
        


    return (
        <div className="book-services-container">
            <h1>Book Services</h1>
            <div className="service-buttons">
                <button onClick={() => { setSelectedService('Spraying'); setSelectedSubOption(''); }}>Spraying</button>
                <button onClick={() => { setSelectedService('Sowing'); setSelectedSubOption(''); }}>Sowing</button>
                <button onClick={() => { setSelectedService('Testing'); setSelectedSubOption(''); }}>Testing</button>
                <button onClick={() => { setSelectedService('Diagnosis'); setSelectedSubOption(''); }}>Diagnosis</button>
                <button onClick={() => { setSelectedService('Information'); setSelectedSubOption(''); }}>Information</button>

            </div>

            {renderServiceDetails()}
        </div>
    );
};


export default BookServices;
