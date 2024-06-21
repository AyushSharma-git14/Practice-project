const express = require('express')
const app=express()
const bodyParser=require('body-parser')
var cors = require('cors')
const bcrypt=require('bcrypt')
const port =5000
const saltRounds=10
app.use(cors())
const multer=require('multer')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//mongodb connect
require('./connection/conn')

//model
const contact=require('./model/contact')
const Adminregister=require('./model/adminregister')


////////////MULTER //////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
       console.log(file)
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage })


app.post('/contact',async(req,res)=>{
    const{name,email,password,confirmPassword,mobile,address}=req.body
    let preUser=await contact.findOne({email})
    if(!preUser){
        let contactData=new contact({name,email,password,confirmPassword,mobile, address})
        let result=await contactData.save()
        res.send({Message:'Registered Successfully',userData:result})
    }
    else{
        res.send({Message:'Email already registered'})
    }
})

app.get('/fetch',async(req,res)=>{
    let fetchdata=await contact.find()
    res.send(fetchdata)
})

app.delete('/delete/:id',async(req,res)=>{
    await contact.deleteOne({_id:req.params.id})
    res.send({Message:"deleted"})
})

app.get('/getdetails/:id',async(req,res)=>{
    let result= await contact.findById({_id:req.params.id})
    res.send(result)
})

app.put('/update/:id',async(req,res)=>{
    const{name,email,password,confirmPassword,mobile,address}=req.body
    let result=await contact.updateOne(
        {_id:req.params.id},
        {$set:{name,email,password,confirmPassword,mobile,address}}
    )
    res.send({Message:"Update successfully"})
})



//////////////// ADMIN REGISTER API  //////////////////

app.post('/adminregister',upload.single('img'),async(req,res)=>{
    const{name,email,password,conpass}=req.body
    let preAdmin=await Adminregister.findOne({email})
    if(!preAdmin){
        const hashPass=await bcrypt.hash(password,saltRounds)
        const hashConpass=await bcrypt.hash(conpass,saltRounds)
        const photo=typeof req.file != "undefined" ? req.file.filename : null
        let admindata=new Adminregister({name,email,password:hashPass,conpass:hashConpass,img:photo})
        let result=await admindata.save()
        res.send({Message:"Registered Successfully",result})
    }
    else{
        res.send({Message:"Already registered"})
    }
})

//////////// Admin LOGIN API /////////////

app.post('/adminlogin',async(req,res)=>{
    const{email,password}=req.body
    if(email && password){

        const findEmail=await Adminregister.findOne({email})

        if(findEmail!==null){

            const ismatchpass=await bcrypt.compare(password,findEmail.password)

            if(email && ismatchpass){

                res.send({Message:'Login Success'})
            }

            else{

                res.send({Message:'Your email or password is invalid'})
            }
        }
        else{

            res.send({Message:'You are not admin !!!'})
        }
    }
    else{
        
        res.send({Message:'Please fill all the details'})
    }
})
app.listen(5000,()=>{
    console.log(`http://localhost:${port}`)
})