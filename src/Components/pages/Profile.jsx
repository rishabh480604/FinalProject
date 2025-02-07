import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/authSlice';
import Cookies from 'js-cookie';
const Profile = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  // if user logged in show data and history of transaction
  //if not forward to login
    // const [name, setName] = useState("");
    // const [age, setAge] = useState("");
    // const [email, setEmail] = useState("");
    // const [ph, setPh] = useState("");
    // const [address, setAddress] = useState("");
    // const [pin, setPin] = useState("");
    const isLoggedIn=useSelector((state)=>state.auth.status);
    const userData=useSelector((state)=>state.auth.userData);
    // console.log("userData : ",isLoggedIn);
    
    useEffect(()=>{
      if(!isLoggedIn){
        navigate("/login");
        // setName(userData?.name);
        // setAge(userData?.age);
        // setEmail(userData?.emailId);
        // setPh(userData?.phoneNo);
        // setAddress(userData?.address);
        // setPin(userData?.pincode);

      }
      // console.log("userData : ",userData);
    },[]);

    const profileData = {
        name: userData?.name ?? '',
        age: userData?.age ?? '',
        email: userData?.emailId ?? '',
        ph: userData?.phoneNo ?? '',
        address: userData?.address ?? '',
        pin: userData?.pincode ?? '',
      };
    
      return (
        <div className="max-w-lg mx-auto p-6 bg-green-800 bg-opacity-35 shadow-lg rounded-lg">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-2xl">
              {profileData.name.charAt(0)}
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
      
          {/* Logout Button at the Bottom */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => {
                dispatch(logout());
                Cookies.remove('sessionId');  // This will delete the 'sessionId' cookie
                navigate('/login');
              }} 
              className="bg-green-600 text-white py-2 px-4 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      );
      
    };

export default Profile;
