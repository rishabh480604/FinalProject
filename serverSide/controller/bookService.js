const pesticideFormModel=require('../model/pesticide');
const fertilizerFormModel=require('../model/fertilizer');
const sowingFormModel=require('../model/sowing')
const soilTestingFormModel=require('../model/soilTesting')

async function handlePesticideBooking(req,res){
    console.log("Req Body : ",req.body);
    const {name,phoneNo, cropName, quantity,cropArea, pesticideType, pesticideName}=req.body;

    
    try{
        console.log({
            "name":name,
            "phoneNo":phoneNo,
            "cropName" : cropName,
            "quantity":quantity,
            "cropArea" : cropArea,
            "pesticideType":pesticideType,
            "pesticideName":pesticideName,
            "testReport":null
        });
        const response=await pesticideFormModel.create({
            name,
            phoneNo,
            cropName,
            quantity,
            cropArea,
            pesticideType,
            pesticideName,
            testReport:null
        });
        console.log("pesticideBooking Response : ",response);
        return res.status(200).send({message:"pesticide Booking completed"});
    }catch(error){
        console.log("error : ",error);
        return res.status(404).send({message : error});
    }


}

async function handleFertilizerBooking(req,res){
    const {name,phoneNo,cropName,quantity,cropArea,fertilizerName}=req.body;
    try{
        const response= await fertilizerFormModel.create({
            name,
            phoneNo,
            cropName,
            quantity,
            cropArea,
            fertilizerName,
            testReport:null
        });
        console.log("fertilizerBooking Succes: ",response);
        return res.status(200).send({message:"fertilizer Booking completed"});
    }catch(error){
        return res.status(404).send({message:error});
    }


}

async function handleSowingBooking(req,res){
    const {name,phoneNo,grainName,landArea,grainType}=req.body;
    try{
        const response=await sowingFormModel.create({
            name,
            phoneNo,
            grainName,
            grainType,
            landArea,
            testReport:null
        });
        console.log("sowingBooking success : ",response);
        return res.status(200).send({message:"sowingBooking Completed"});
    }catch(error){
        return res.status(404).send({message:error});
    }


}

async function handleSoilTestingBooking(req,res){
    const {name,phoneNo,latitude,longitude,samples}=req.body;
    try{
        const location={
            longitude:longitude,
            latitude:latitude
        };
        const response=await soilTestingFormModel.create({
            name,
            phoneNo,
            location,
            samples

        });
        console.log("soilTestingBooking : ",response);
        return res.status(200).send({message:"SoilTesting Booked"});

    }catch(error){
        return res.status(404).send({message:error});
    }

}
  
module.exports={
    handleFertilizerBooking,
    handlePesticideBooking,
    handleSoilTestingBooking,
    handleSowingBooking,
}