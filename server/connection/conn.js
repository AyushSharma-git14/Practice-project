const mongoose = require('mongoose')
const data="Form"
mongoose.connect(`mongodb://127.0.0.1:27017/${data}`)
.then(()=>{
    console.log('MongoDB is Connected')
})
.catch(()=>{
    console.log('MongoDB is not connected')
})