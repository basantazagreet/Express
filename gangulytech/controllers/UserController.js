const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/*
Status code and their meanings
100: Hold on,
200: Here you go
300: Go away
400: You fucked up
500: I fucked up
*/



const getUsers = async (req, res, next) => {
    try {
        const user = await User.find().exec();
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Error while loading data", })
    }
}


const postUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(422).json({ status: false, message: "Validation error check the input data", errors: errors.array() });
        }
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            username, email, password: hashedPassword
        });
        const result = await user.save();
        res.status(200).json({ status: "OK", message: "User created", result });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Error occurred while creating user."
        });
    }
}


const findUser = async (req, res, next) => {

    try {
        //Projection used to hide password
        const user = await User.find({ email: req.params.email }, { password: 0 });
        if (user) {

            res.status(200).json({ status: true, message: "User found", user });
        } else {
            res.status(404).json({ status: true, message: "User not found" });

        }

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Couldnot find unexpected error occured"
        })
    }

}

const updateUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(422).json({ status: false, message: "Validation error check the input data", errors: errors.array() });
        }
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username;
            const password = bcrypt.hashSync(req.body.password, 10);
            user.password = password;
            user.email = req.body.email;
            const result = await user.save();
            res.status(200).json({status:true, message:'User updated', result});
        }else{
            res.status(404).json({status:false, message:"COuldnot find user with that email"})
        }

    } catch (err) {
        res.status(500).json({ status: false, message: 'Could not update user' });
    }
    
}


const deleteUser = async (req, res, next) => {
    try{
        const result = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully", result})
        
    }catch(err){
        res.status(500).json({ status: false, message: 'Could not update user' , error: err});

    }
}

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({status: false , message: " Validation error check inputs",error: errors.array()});
    }

    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(isMatch){
                return res.status(200).json({status:true, message:"Login Successful"});
            }else{
                return res.status(402).json({status:false, message:"Password is wrong"});
            }
        }
        else{
            return res.status(404).json({status:false, message:"User not found"});
        }
    }catch(err){
        res.status(500).json({status: false, message: "Error while login", error: err});
    }
}


exports.getUsers = getUsers;
exports.postUser = postUser;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;