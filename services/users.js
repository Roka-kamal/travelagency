//SERVICES FOLDER
const userModel=require('../models/user');
const emailService=require('../services/emailService')

module.exports.dispayAllUsers= async()=>{
    try{
        const users=await userModel.find();
        return users;

    }catch(err){
        throw new Error('could not retrieve users');
    }
};

module.exports.addUser = async(userInfo)=>{
    try{
        const user= new userModel({
            fname: userInfo.fname,
            lname: userInfo.lname,
            email: userInfo.email,
            phone: userInfo.phone,
            password: userInfo.password,
            dob: userInfo.dob

        });

       // Instead of await userModel.create(userInfo);
        const createdUser = await user.save(); 

        // Send welcome email
        await emailService.sendEmail(
            createdUser.email,
            "Welcome to RKSS",
            "Hello and welcome to our platform. We're excited to have you on board!\n EXPLORE NEW ADVENTURES"
        );

        return createdUser;

   } catch (err) {
        throw new Error(`Could not add user: ${err.message}`);
    }

 }