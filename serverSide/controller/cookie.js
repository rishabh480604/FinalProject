const UserModel=require('../model/user')
const cookieParser=require('cookie-parser');

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
            status:400,
            message:"session expired "
        });
    }
}

async function handleLogout(req,res){
    try{
        console.log("cookie : ",req.cookies);
        const sessionId=req.cookies.sessionId;
        if(!sessionId){
            return res.status(403).send({message:"invalid cookie or Time Expires"});
        }
        const response=await SessionModel.findOneAndDelete(sessionId);
        if(!response){
            return res.status(404).send({message:"Session not found in DB"});
        }
        res.clearCookie(sessionId,{path:'/'});
        return res.status(200).send({message:"logout successfully"});
    }catch(error){
        console.log("logout error : ",error);
        return res.status(500).send({message:"Internal Server Error"});
    }
    
}
module.exports={
    getUserData,
    handleLogout,
}