//ROUTER FOLDER
const {Router} = require('express');
const userController = require('../controllers/user');
const userRouter = Router();
module.exports=userRouter;

userRouter.get('/', userController.dispayAllUsers);
userRouter.post('/', userController.postUser);