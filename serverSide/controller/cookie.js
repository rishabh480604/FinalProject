const UserModel=require('../model/user')

const SessionModel=require('../model/session')
async function getUserData(req,res){
    console.log("fetching data for session");
    const {sessionId}=req.body;
    const session=await SessionModel.findOne({sessionId:sessionId});
    if(session){
        console.log(session);
        const user=await UserModel.findOne({phoneNo:session.phoneNo});
        if(user){
            console.log("user data retrived");
            return res.send({
                status:200,
                message:"user data retrived",
                user:user,
            })
        }
        console.log("Invalid account deleted");
        return res.send({
            status:404,
            message:"Invalid account deleted"
        })
    }else{
        console.log("Session expired");
        res.send({
            status:404,
            message:"session expired "
        });
    }
}
module.exports={
    getUserData,
}