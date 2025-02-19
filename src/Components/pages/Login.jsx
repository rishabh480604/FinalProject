import React, { useEffect, useState } from 'react';
import './Login.css';
import { FaPhone, FaMapMarkerAlt, FaCity, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';

 
import { useNavigate } from 'react-router-dom';

const Login = ({ theme, setUserData }) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    //check if user already login by store status
    //if already login forward to profile
    const [isSignUp, setIsSignUp] = useState(false);
    const [phone, setPhone] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [Otp, setOtp] = useState('');
    // const [GeneratedOtp,setGeneratedOtp]= useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        emailid:'',
        age: '',
        state: '',
        city: '',
        address: '',
        pincode: '',
    });
    
    // Toggle between login and sign-up forms
    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setPhone('');
        setShowOtp(false);
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            emailid:'',
            age: '',
            state: '',
            city: '',
            address: '',
            pincode: '',
        });
    };

    // Validate phone number for Indian format
    const handlePhoneChange = (e) => {
        const input = e.target.value;
        setPhone(input);
    };

    // Handle input change for form data in sign-up
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Check if all sign-up fields are filled
    const isSignUpComplete = () => {
        const { firstName, lastName, emailid,age, state, city, address, pincode } = formData;
        return firstName && lastName && age && state && city && address && pincode;
    };
    

    // Show OTP input when "Get OTP" button is clicked
    const  handleGetOtpClick = async() => {
        if (phone && /^(\+91)?[6-9]\d{9}$/.test(phone)) { // Check if phone is valid before showing OTP
            setShowOtp(true);
            const response=await axios.post('http://127.0.0.1:5000/generateOtp', { phone ,isSignUp});
            
            if(response){
                // console.log(response.data.message);
                alert(response.data.message);
                if(response.data.status==409){
                    toggleForm();
                }
                // alert(response.data.message);
            }else{
                alert("No response from api");
            }
            


        

        } else {
            alert("Please enter a valid phone number.");
        }
    };

    // handle register
    const handleRegister = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', { phone, formData });
            if(response?.status==200){
                alert(response.data.message)
                toggleForm();
            }else{
                alert(response.data.message)
            }
            
            // setMessage(response.data.message); // Set success message from response
        } catch (error) {
            // Check if the error response exists and set an appropriate message
            if (error.response) {
                // The request was made and the server responded with a status code
                setMessage(error.response.data.message + 'Registration failed');
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('Error: ' + error.message);
            }
        }finally{
            setOtp('');
        }
      };
      //hnadle login
      const handleLogin = async (e) => {
        // e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:5000/login', { phoneNo:phone,Otp:Otp }, { withCredentials: true });
          console.log(response.data.status);
          if(response.data.status==404){
            alert(response.data.message);
            toggleForm();
          }else{
            alert(response.data.message);
            console.log(response.data.user);
            dispatch(login({userData:response.data.user}));

            navigate("/profile");
            // setMessage(response.data.message);
          }
          
        //   navigate('/dashboard');  // Redirect to dashboard on successful login
        } catch (error) {
          setMessage(error.response?.data?.message || 'Login failed');
        }
      };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            console.log(formData);
            // console.log()
            // console.log(document.getElementById('otp').innerText );
            // console.log(Otp);
            // if(GeneratedOtp!==null && GeneratedOtp==Otp){
                // alert('OTP matched');
                if(!showOtp){
                    alert("generate Otp");
                    return;
                }
                handleRegister()
                // alert(message);
            // }else{
                // alert("Invalid Otp");
            // }
            
        } else {
                handleLogin()
          
            
        }
        setOtp('')
    };
    const isLoggedIn= useSelector((state)=> state.auth.status);
    useEffect(()=>{
        
        if(isLoggedIn){
            navigate("/profile")
        }
        
    },[isLoggedIn]);

    return (
        <div className={`wrapper ${theme}`}>
            <form onSubmit={handleSubmit}>
                <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>

                <div className="input-box">
                    <input
                        type="tel"
                        placeholder='Phone Number (+91)'
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                    <FaPhone className='icon' />
                </div>

                {/* "Get OTP" button */}
                {!showOtp && (
                    <button type="button" onClick={handleGetOtpClick}>Get OTP</button>
                )}

                {/* Conditionally render OTP input */}
                {showOtp && (
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='OTP'
                            id="otp"
                            value={Otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                )}

                {isSignUp && (
                    <div className="signup-form">
                        <div className="name-inputs">
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder='First Name'
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="middleName"
                                    placeholder='Middle Name (Optional)'
                                    value={formData.middleName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder='Last Name'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="emailid"
                                placeholder='EmailId'
                                value={formData.emailid}
                                onChange={handleInputChange}
                                
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="number"
                                name="age"
                                placeholder='Age'
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="state"
                                placeholder='State'
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                            <FaMapMarkerAlt className='icon' />
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="city"
                                placeholder='City'
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <FaCity className='icon' />
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="address"
                                placeholder='Address'
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                name="pincode"
                                placeholder='Pincode'
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* <div>{message}</div> */}

                        {/* Show OTP input if all sign-up fields are complete */}
                        {/* {isSignUpComplete() && showOtp && (
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='OTP'
                                    value={Otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <FaLock className='icon' />
                            </div>
                        )} */}
                    </div>
                )}

                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>

                <div className="registration-link">
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
                        <a href="#" onClick={toggleForm}>{isSignUp ? ' Login' : ' Register'}</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
