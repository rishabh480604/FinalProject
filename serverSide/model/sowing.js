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
    grainName:{
        type:String,
        require:true
    },
    grainType:{
        type:String,
        require:true
    },
    landArea:{
        type:Number,
        require:true

    },
    testReport:{
        type:Buffer
    }
    
});

const sowingFormModel=mongoose.model('sowingForm',sowingFormSchema);

module.exports=sowingFormModel;
