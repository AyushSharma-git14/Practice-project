const mongoose = require('mongoose')

const AdminregisterSchema=new mongoose.Schema({
    email:String,
    password:String,
    conpass:String,
    img:String,
})

const Adminregister=mongoose.model('Adminregister',AdminregisterSchema)
module.exports=Adminregister