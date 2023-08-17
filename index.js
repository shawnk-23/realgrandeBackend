const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app=express()
const allrouter = require('./routes/allRoutes')
//the type of data is json
app.use(express.json())
const cors = require('cors')

// var corsOptions = {
//     origin: "http://localhost:3000"
// }

// app.use(cors(corsOptions))
app.use(cors())

const db=module.exports = () => {
    try{

        mongoose.connect('mongodb+srv://cluster0.rh9pbcd.mongodb.net/realgrande?retryWrites=true&w=majority',
        {user:process.env.USERNAME, pass:process.env.PASSWORD, 
            useNewUrlParser:true,useUnifiedTopology:true})
            //checking server is authenticated (useNewUrlParser)any new url (anything after localhost/....), path won't be understood without it(routing in mongodb ex) /home...might not work without it)
            //useunifiedtopo: global (geographical thing) to use anywhere in the world. for atlas (leting atlas know i'm accessing from anywhere)
        console.log("Connection Successful")
    }catch(error){
        console.log(error)
        console.log("MongoDB Connection Failed")

    }
    // console.log("Connection Successful")
}

db()

app.use('/',allrouter)

app.listen(3002,()=> {
  console.log("Server is running at http://localhost:3002")
}) 
