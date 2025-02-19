const UserModel=require('../model/user')
const OtpModel=require('../model/otp')
const SessionModel=require('../model/session')
const {v4:uuidv4}=require('uuid')

async function handleRegisteration(req,res){
    console.log("handle Registeration")
    const {phone,formData,Otp}=req.body;
    console.log(phone, formData);
    const user=await UserModel.findOne({phoneNo:phone});
    if(user){
        return res.send({
            status:409,
            message:"user already exist!"
        });
    }
    const { firstName, middleName, lastName, emailid, age, state, city, address, pincode } = formData;
    const fullname= [firstName, middleName,lastName].filter(Boolean).join(" ");
    const fulladdress= [address,city,state].filter(Boolean).join(" , ");
    try{
        const response=await UserModel.create({
            name:fullname,
            age:age,
            emailId:emailid,
            phoneNo:phone,
            address:fulladdress,
            pincode:pincode,
        })
        console.log("created user response : ",response)
        return res.send({
            status:200,
            message:'Registration successful'
        })
    }catch(e){
        console.log(e);
        res.send({
            status:500,
            error:e,
            message:'failed to create user'
        })
    }
    
}

async function GenerateOtp(req,res){
    
    console.log("opt generate executed");
    let otpVal= Math.floor(100000 + Math.random() * 900000);
    const {phone,isSignUp} =req.body;
    
    const userExist=await UserModel.findOne({phoneNo:phone});
    console.log("new USer : ",isSignUp);
    console.log("userExist : ",userExist)
    if(isSignUp ){
        //new user 
        //should not have already user
        if(userExist){
            return res.send({
                status:409,
                message:"user already exist,Login!!"
            });
        }
    }else{
        //old user logging
        //shuould have account
        if(!userExist){
            return res.send({
                status:409,
                message:"user doesn't exist,Signup!!"
            });
        }
    }
    await OtpModel.findOneAndDelete({phoneNo:phone});
    try{
        const response=await OtpModel.create({
            phoneNo:phone,
            otp:otpVal,
        })
        // console.log("Otp response : ",response);
        if(!response){
            return res.send({
                status:403,
                message:"Error in creating otp"
            });
        }else{
            console.log(phone," otp : ",otpVal);
            return res.send({
                status:200,
                message:"Otp sent successfully"
            });
        }
    }catch(e){
        return res.send({
            status:403,
            message:"Error from server side",
            error:e
        })
    }
}

async function handleLogin(req,res){
    console.log("handle login executed");
    const{phoneNo,Otp}=req.body;
    // check user exist
    const userExist=await UserModel.findOne({phoneNo:phoneNo});
    console.log("userExist : ",userExist);
    if(!userExist){
        return res.send({
            status:404,
            message:"user not exist,Please Register"
        })
    }
    // check otp correct
    const otpExist=await OtpModel.findOne({phoneNo:phoneNo,otp:Otp});
    console.log("otpExist : ",otpExist);
    if(!otpExist){
        return res.send({
            status:401,
            message:"Invalid Otp"
        })
    }

    //check whether any cookie already exist
    const sessionExist=await SessionModel.findOne({phoneNo:phoneNo});
    if(sessionExist){
        return res.send({
            status:409,
            message:"user already LoggedIn"
        })
    }
        //can create a session for user
        const sessionId=uuidv4();
        const response=await SessionModel.create({
            sessionId:sessionId,
            phoneNo:phoneNo
        });
        if(response){
            res.cookie("sessionId",sessionId,{
                maxAge: 10 * 60 * 1000,   //min sec milliSec
                // httpOnly: true,         // Prevents JavaScript access (security best practice)
                // secure: true,           // Requires HTTPS (remove this for local development)
                // sameSite: "Strict",     // Prevents CSRF attacks
                // path: "/" 
            }
            
            );
            return res.send({
                status:200,
                message:"Login successfully",
                user:userExist,
            });
        }else{

            return res.send({
                status:401,
                message:"Error in creating session"
            });
        }    
}
// async function handleLogout(req,res){


// }

module.exports={
    handleRegisteration,
    handleLogin,
    GenerateOtp,
}