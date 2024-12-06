//CONTROLLER FOLDER
const userService = require ('../services/users');
const emailService = require('../services/emailService');

module.exports.dispayAllUsers = async (req, res) => {
    try{
        const users = await userService.dispayAllUsers();
        res.send({users});
    }catch(err){
        res.status(500);
        res.send({error:err});
    }
}

module.exports.postUser= async(req, res)=>{
    console.log("Received data:", req.body);
    const userInfo={

        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        dob: req.body.dob

    };
    try {
      const createdUser = await userService.addUser(userInfo);
      return res.status(201).send({
          msg: 'User created successfully.',
          userId: createdUser._id
      });
  } catch (err) {
      return res.status(500).send({
          error: err.message
      });
  }
};