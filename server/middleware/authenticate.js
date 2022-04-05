const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')


const Authenticate = async (req, res, next)=>{
    try{
        const token = req.cookies.jwtoken
        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        //-----------------------------------if from server: id from token--token from server: token in browser
        const rootUser = await User.findOne({_id: verifyToken._id, 'tokens.token': token})
        console.log(verifyToken)
        console.log(rootUser)
        if(!rootUser){
            throw new Error('User not Found')
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        
        next()

    }catch(err){
        res.status(401).send({err: 'Unauthorised: No token provided'})
        console.log(err)
    }

}

module.exports = Authenticate