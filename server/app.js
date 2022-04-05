const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(cors())

dotenv.config({path: './config.env'})
require('./db/conn')
//const User = require('./model/userSchema')

app.use(express.json())
//with this we say if jsonify any object through express middleware


//we link the router to make our route easy
app.use(require('./router/auth'))

const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/contact', (req, res) => {
    
//     res.send('Hello from contact')
//   })

// app.get('/about', (req, res) => {
//   console.log("HEllo about middle")
//     res.send('Hello from about')
    
//   })

app.get('/signin', (req, res) => {
    res.send('Hello from signin')
  })

app.get('/signup', (req, res) => {
    res.send('Hello from signup')
  })
//creating jwt token (example)
// const jwt = require('jsonwebtoken')

// const createToken= async()=>{
//   const token = await jwt.sign({_id:"bvregvdbfwdnqf89ry3"}, "vuuehf893r8r8th4uhuibe3bn",{expiresIn:"2 seconds"})
//   console.log(token)

//   const ver = await jwt.verify(token, "vuuehf893r8r8th4uhuibe3bn")
//   console.log(ver)
// }
// createToken()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})