const express = require('express')
const app = express()
const mongoose = require('mongoose')

// connect database to server
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    err ? console.log(err) : console.log('database connected')
})
// parse data
app.use(express.json())

// importing Routes
app.use('/persons', require('./Routes/personRoutes'))



const port = 5000
app.listen(port, (err)=>{
    err ? console.log(err) : console.log(`server is running on port: ${port}`)
})