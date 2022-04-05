const express = require('express')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const cookieparser = require('cookie-parser')

router.use(cookieparser())

router.get('/', (req, res)=>{
    res.send(`Hello world from the server`)
})


//promise function here....
// router.post('/register', (req, res)=>{
//     const {name, gender, email, phone, password, cpassword} = req.body

//    if(!name || !gender || !email || !phone || !password || !cpassword){
//        return res.status(422).json({error: "Plz fill the field property"})
//    }
    
//    User.findOne({ email:email })//find email if its exits or not
//    .then((userExist)=>{
//     if(userExist) {
//         return res.status(422).json({ error: "Email already exist!" })
//     }

//     const user = new User({ name, gender, email, phone, password, cpassword })
//     //below save() return promises
//     user.save().then(()=>{
//         res.status(201).json({ message: "user registered successfully!" })
//     }).catch((err)=>res.status(500).json({ error: "failed registeration" }))

//    }).catch( err => { console.log(err) } )
   
// })



//async - await function here....
// route to register page
router.post('/register', async (req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body

    //checking if data is empty or not...
   if(!name || !email || !phone || !work || !password || !cpassword){
       return res.status(422).json({ err: "Plz fill the field property" })
   }
    
   try{

    const userExist = await User.findOne({ email:email })//find email if its exits or not
    
    if(userExist) {

        return res.status(422).json({ err: "Email already exist!" })

    }else if(password != cpassword){

        res.status(422).json({ err:"Password not matched" })

    }else{
            //a new instance to be saved in database...
    const user = new User({ name, email, phone, work, password, cpassword })
    
    //hashing password
    await user.save()

    res.status(201).json({ message: "User registered successfully!" })

    }

   } catch(err) {
    console.log(err)
   }
   
})


//login route
router.post('/signin', async (req, res)=>{
    const {email, password} = req.body
    try{
        if(!email || !password){
            return res.status(400).json({err:"Plz fill the data"})
        }

        const userLogin = await User.findOne({email:email})
        

        if(userLogin){
            
            const isMatch = await bcrypt.compare(password, userLogin.password)
            
            const token = await userLogin.generateAuthToken()
            console.log('token created ' + token)

                //giving response for cookie creation
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                return res.status(400).json({err: "Invalid Crediential!"})
                
            }else{
                return res.status(200).json({message:"Logged in successfully!"})
            }

        }else{
            return res.status(502).json({err:"User does not exist"})
        }

        
    }catch(err){
        console.log(err)
    }
})


//route to about page
router.get('/about',authenticate, (req, res) => {
    console.log('Hello from about') 
    res.send(req.rootUser)
             
    })

router.get('/getcontact', authenticate, (req, res) => {
    console.log('Hello from contact us') 
    res.send(req.rootUser)
                
    })   

router.get('/home', authenticate, (req, res) => {
    console.log('Hello from Home') 
    res.send(req.rootUser)
                
    })  

module.exports = router