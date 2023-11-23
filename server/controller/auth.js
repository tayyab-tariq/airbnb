import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"

const register = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    
    if (!(name && email && password)){
        res.status(400);
        throw new Error('Invalid user data');
    }
     
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      name,
      email,
      password: passwordHash,
    });

    if (userDoc){
        res.status(201).json(userDoc);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });

    if (!checkUser){
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch){
        res.status(401);
        throw new Error('Invalid email or password');
    }

    const token = generateToken(res, checkUser._id);
    const user = { ...checkUser.toObject() };
    delete user.password;
    res.status(200).json({ token, user });
});

const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '').json(true);
});

export {
    login, 
    register,
    logout,
};
  

