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
    type:float,
    require:true
  },
  cropArea:{
    type:float,
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
  testReport:File
},{timestamps:true});

const pesticideFormModel=pesticideSchema.model('pesticideForm',pesticideSchema);
module.exports=pesticideFormModel;