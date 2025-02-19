const {handleRegisteration,handleLogin,GenerateOtp}=require('../serverSide/controller/user')
const express= require('express')
const path=require('path')
require('dotenv').config()
const cookieParser=require('cookie-parser')
const {connectToMongoDB}=require('../serverSide/mongoConnect')
const cors=require('cors');
const {getUserData,handleLogout}=require('./controller/cookie')
const {handlePesticideBooking,handleFertilizerBooking,handleSoilTestingBooking,handleSowingBooking}=require('./controller/bookService')
// INITIAL CONFIGURATION
const corsOptions = {
    // "http://localhost:5173" 
    origin: [
        "http://127.0.0.1:5173",  // Your React frontend running on port 5173
      ], 
      methods: "GET,POST,PUT,DELETE",  // Allow these HTTP methods
      allowedHeaders: "Content-Type,Authorization,X-My-Custom-Header",  // Allow these headers in the request
      credentials: true,  // Allow cookies/credentials to be sent
    };


const app = express();
const PORT = 5000;

app.use(express.json()); // Parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses form-encoded data
app.use(cors(corsOptions));
app.use(cookieParser())

connectToMongoDB(process.env.MONGODB_URL)//connect with mongodb 
.then((res)=> res==true?console.log("mongodb connected"): console.log("error in mongodb connection "))


    app.get("/test",(req,res)=>res.send("Hello World"))

    app.post("/register",handleRegisteration)
        /*
        req.body has phone, formData
        formData  const { firstName, middleName, lastName, emailid, age, state, city, address, pincode } = formData
        insert data in user database and return account created successfully
        */
       

    app.post('/login',handleLogin)
        /*
        const { phone, otp } = req.body;
        check a user with phone no and password exist in user database
        if exist
            switch to session database create a session map  to user data base table id
            set cookie in user UI with expiry time to 15 min
            save user data in response
            and navigate to user /profile page
        else
            return invalid password
            no navigation
        */


    app.post('/generateOtp',GenerateOtp)
    
    app.post('/logout',handleLogout)
    /* 
    delete cookie from site
    remove sessionId from session database
    */
        
    // app.post("/initcheck",function_name)
    /*
    later completed 
    it will run in beginning if user has session id to fetch user data
    */
   
    app.post('/fetchData',getUserData)
    /*
    based on session id fetch data and load
    */ 
   app.post('/bookservice/pesticide',handlePesticideBooking)
   app.post('/bookservice/fertilizer',handleFertilizerBooking)
   app.post('/bookservice/sowing',handleSowingBooking)
   app.post('/bookservice/soilTest',handleSoilTestingBooking)
   



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });