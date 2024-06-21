const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
    address:String,
    mobile:Number,
    date:{type:Date,default:Date.now}
})



const contact=mongoose.model('contact',contactSchema)
module.exports=contact