const mongoose=require('mongoose')
// compulsory to define schema or blueprint of data structure
const userSchema=new mongoose.Schema({
    name:{
        type : String,
        required:true,
        
    },
    age:{
        type:Number,
        required:true,
    },
    emailId:{
        type:String,
        required : true
    },
    phoneNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
}
,{timestamps:true});
// schema will then converted int model
const UserModel= mongoose.model('user',userSchema);

module.exports=UserModel;