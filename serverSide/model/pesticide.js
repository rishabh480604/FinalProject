const mongoose=require('mongoose');


const pesticideSchema = mongoose.Schema({
  name:{
    type : String,
    required:true,
    
  },
  phoneNo:{
      type:String,
      required:true
  },
  cropName:{
    type:String,
    require:true
  },
  quantity:{
    type:Number,
    require:true
  },
  cropArea:{
    type:Number,
    require:true
  },
  pesticideType:{
    type:String,
    require:true
  },
  pesticideName:{
    type:String,
    require:true
  },
  testReport:Buffer,
},{timestamps:true});

const pesticideFormModel=mongoose.model('pesticideForm',pesticideSchema);
module.exports=pesticideFormModel;