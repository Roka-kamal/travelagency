//SERVICES FOLDER
const userModel=require('../models/user');
const emailService=require('../services/emailService')
const bcrypt = require('bcryptjs'); // For password hashing
//const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens

module.exports.dispayAllUsers= async()=>{
    try{
        const users=await userModel.find();
        return users;

    }catch(err){
        throw new Error('could not retrieve users');
    }
};

// Get User Profile (Retrieve user data)
module.exports.getUser = async (userEmail) => {
    try {
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error('Could not retrieve user: ' + err.message);
    }
};

//register a new user
module.exports.addUser = async(userInfo)=>{
    try{
        // Check if the email already exists
        const existingUser = await userModel.findOne({ email: userInfo.email });

        if (existingUser) {
            throw new Error('Email already registered');
        }   
        
        // Hash the user's password before saving
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        userInfo.password = hashedPassword;

        const user= new userModel(userInfo);
        const createdUser = await user.save(); 

        // Send welcome email
        await emailService.sendEmail(
            createdUser.email,
            "Welcome to RKSS \n",
            `Hello and welcome to our platform.<br> We're excited to have you on board! <br> EXPLORE NEW ADVENTURES`
        );

        return createdUser;

   } catch (err) {
        throw new Error(`Could not add user: ${err.message}`);
    }

 }

 // Update User Profile
module.exports.updateUser = async (userEmail, updateData) => {
    try {
        // Find the user by email and update
        const updatedUser = await userModel.findOneAndUpdate({ email: userEmail }, updateData, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        // Send email with updated user details (excluding password)
        const emailContent = `
            Hello ${updatedUser.fname} ${updatedUser.lname},<br>
            
            Your account details have been successfully updated:<br>
            
            - Name: ${updatedUser.fname} ${updatedUser.lname} <br>
            - Email: ${updatedUser.email} <br>
            - Phone: ${updatedUser.phone}<br>
            - Date of Birth: ${updatedUser.dob} <br>
            - Role: ${updatedUser.role}<br><br>
            
            Thank you for being part of our platform.
        `;

        await emailService.sendEmail(
            updatedUser.email,
            "Your Account Has Been Updated",
            emailContent
        );
        return updatedUser;
    } catch (err) {
        throw new Error('Could not update user: ' + err.message);
    }
};

// Delete User Account
module.exports.deleteUser = async (userEmail) => {
    try {
        const deletedUser = await userModel.findOneAndDelete({ email: userEmail });
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (err) {
        throw new Error('Could not delete user: ' + err.message);
    }
};
