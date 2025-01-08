import React from 'react';
import { useState } from 'react';

const Profile = () => {
  // if user logged in show data and history of transaction
  //if not forward to login
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [ph, setPh] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");

    const profileData = {
        name: "John Doe",
        age: 28,
        email: "john.doe@example.com",
        ph: "+1234567890",
        address: "123 Main Street, Springfield",
        pin: "987654",
      };
    
      return (
        <div className="max-w-lg mx-auto p-6 bg-green-800 bg-opacity-35 shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-2xl">
              {profileData.name.charAt(0)} {/* Display the first letter of the name */}
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">
              {profileData.name}
            </h1>
            <p className="text-white">{profileData.email}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-white font-medium">Age:</span>
              <span className="text-white">{profileData.age}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-white font-medium">Phone:</span>
              <span className="text-white">{profileData.ph}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-white font-medium">Address:</span>
              <span className="text-white text-right">{profileData.address}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-white font-medium">PIN Code:</span>
              <span className="text-white">{profileData.pin}</span>
            </div>
          </div>
        </div>
      );
    };

export default Profile;
