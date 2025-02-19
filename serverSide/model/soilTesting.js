const mongoose=require('mongoose');

const soilTestingFormSchema=mongoose.Schema({
    name:{
        type : String,
        required:true,
        
    },
    phoneNo:{
        type:String,
        required:true
    },
    location:{
        longitude:{
            type:Number,
            require:true
        },
        latitude:{
            type:Number,
            require:true
        }
    },
    samples:{
        type:Number,
        require:true
    },
    testReport:Buffer,
    
    
});

const soilTestingFormModel=mongoose.model('soilTestingForm',soilTestingFormSchema);

module.exports=soilTestingFormModel;
