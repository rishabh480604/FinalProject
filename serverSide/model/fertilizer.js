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
        type:Buffer
    },
    quantity:{
        type:Number,
        require:true
    },
    cropArea:{
        type:Number,
        require:true

    },
    fertilizerName:{
        type:String,
        require:true
    }
});

const fertilizerFormModel=mongoose.model('fertilizerForm',fretilizerFormSchema);

module.exports=fertilizerFormModel;