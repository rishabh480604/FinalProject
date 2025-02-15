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
            type:float,
            require:true
        },
        latitude:{
            type:float,
            require:true
        }
    },
    samples:{
        type:Number,
        require:true
    }
    
    
});

const sowingFormModel=mongoose.model('sowingForm',sowingFormSchema);

module.exports=sowingFormModel;
