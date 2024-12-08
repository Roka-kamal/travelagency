//ROUTER FOLDER
const {Router} = require('express');
const userController = require('../controllers/user');
const userRouter = Router();

userRouter.get('/', userController.dispayAllUsers);
userRouter.get('/:email', userController.getUser); // Get user by email
userRouter.post('/', userController.postUser); // Create user
userRouter.put('/:email', userController.putUser); // Update user by email
userRouter.delete('/:email', userController.deleteUser); // Delete user by email


module.exports=userRouter;
