const mongoose=require('mongoose')
// compulsory to define schema or blueprint of data structure
const sessionSchema=new mongoose.Schema({
    sessionId:{
        type : String,
        required:true,
        
    },
    phoneNo:{
        type:String,
        required:true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 60*10 // Document expires 60 seconds*10 after creation
    }
    
}
,{timestamps:true});
// schema will then converted int model
const SessionModel= mongoose.model('session',sessionSchema);

module.exports=SessionModel;