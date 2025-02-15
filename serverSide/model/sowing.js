const mongoose=require('mongoose');

const sowingFormSchema=mongoose.Schema({
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
    fertilizerName:{
        type:string,
        require:true
    },
    testReport:{
        type:File
    }
    
});

const sowingFormModel=mongoose.model('sowingForm',sowingFormSchema);

module.exports=sowingFormModel;
