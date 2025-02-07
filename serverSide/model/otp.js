const mongoose=require('mongoose')
// compulsory to define schema or blueprint of data structure
const otpSchema=new mongoose.Schema({
    phoneNo:{
        type : String,
        required:true,
        
    },
    otp:{
        type:Number,
        required:true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 60*5 // Document expires 60 seconds after creation
    }
    
}
,{timestamps:true});
// schema will then converted int model
const OtpModel= mongoose.model('otp',otpSchema);

module.exports=OtpModel;