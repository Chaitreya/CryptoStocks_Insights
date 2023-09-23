const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res) => {
    const {username , password } = req.body;
    if(!username || !password){
        return res.status(400).json({Message: "Please enter all details"});
    }

    const foundUser = await User.findOne({username: username});
    if(!foundUser){
        return res.status(401).json({Message: "Please enter a valid username"});
    }

    try{
        const matchPwd = await bcrypt.compare(password, foundUser.password);
        if(matchPwd){
            //Create JWT
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m'}
            );

            const refreshToken = jwt.sign(
                {"username": foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            );
            
            await User.updateOne({'username': foundUser.username},{'refreshToken': refreshToken});

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000});

            return res.json({accessToken});
        }
        else{
            return res.sendStatus(401);
        }


    } catch (err){
        console.error(err.message);
    }
}

module.exports = handleLogin;
