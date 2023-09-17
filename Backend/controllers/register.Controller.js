const User = require('../models/Users');
const bcrypt = require('bcrypt');

const registerUser = async (req,res) => {
    const {firstname, lastname, email, username , password } = req.body;

    if(!firstname){
        return res.status(400).json({"message": "First name cannot be empty"});
    }
    if(!lastname){
        return res.status(400).json({"message": "Last Name cannot be empty"});
    }
    if(!email){
        return res.status(400).json({"message": "Email ID cannot be empty"});
    }
    if(!username){
        return res.status(400).json({"message": "User name cannot be empty"});
    }
    if(!password){
        return res.status(400).json({"message": "Password cannot be empty"});
    }

    const duplicateUser = await User.findOne({username: username}).exec();
    
    if(duplicateUser){
        return res.status(409).json({"Message": "Username already in use"})
    }
    const duplicateEmail = await User.findOne({email: email}).exec();
    
    if(duplicateEmail){
        return res.status(409).json({"Message": "Email ID already in use"});
    }

    try{
        // encrpyt password
        const hashPwd = await bcrypt.hash(password, 10);

        // create and save new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "username": username,
            "password": hashPwd
        });

        return res.status(201).json({"Message": `New user ${username} created `});


    } catch (err) {
        return res.status(500).json({"Message": err.message});
    }
}

module.exports = registerUser;