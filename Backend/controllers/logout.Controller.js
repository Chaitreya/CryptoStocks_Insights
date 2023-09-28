const User = require('../models/Users');

const handleLogout = async (req,res) => {
    // On Frontend delete the access token

    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly: true ,maxAge: 24*60*60*1000, secure: true, sameSite: 'none'})
        return res.sendStatus(204); 
    }
    
    await User.updateOne(
        {'username': foundUser.username},
        {'refreshToken': ' '}
    );
        
    res.clearCookie('jwt',{httpOnly: true ,maxAge: 24*60*60*1000})
    return res.sendStatus(204);
}

module.exports = handleLogout;
