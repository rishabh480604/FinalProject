const mongoose=require('mongoose')

async function connectToMongoDB(URL){
// 'mongodb://127.0.0.1:27017/test'
    try {
      await mongoose.connect(URL);
      return true;
    } catch (error) {
      console.log("error : ",error);
      return false;
    }

}
module.exports ={connectToMongoDB};