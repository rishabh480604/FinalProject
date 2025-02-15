const mongoose=require('mongoose');

const fretilizerFormSchema=mongoose.Schema({
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
    testReport:{
        type:File
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
    }
});

const fertilizerFormModel=mongoose.model('fertilizerForm',fretilizerFormSchema);

module.exports=fertilizerFormModel;