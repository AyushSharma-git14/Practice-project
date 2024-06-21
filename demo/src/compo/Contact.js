import React, { useState } from 'react'

function Contact() {
  const[state,setState]=useState({name:"",email:"",password:"",confirmPassword:"",mobile:"", address:""})
  const [namemessage,setNamemessage]=useState("")
  const [emailmessage,setEmailmessage]=useState("")
  const [passmessage,setPassmessage]=useState("")
  const [mobilemessage,setMobilemessage]=useState("")

  const handler=(e)=>{
    setState({...state,[e.target.name]:e.target.value})
  }
  let submitData=()=>{
    const{name,email,password,mobile,confirmPassword,address}=state
  const nameRegex=/^[a-zA-Z]+$/
  const emailRegex=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
  const passRegex=/^[a-zA-Z]\w{3,14}$/
  const numRegex=/^[0-9]*$/

    //Name Verify
    if(name===""){
      setNamemessage("Name Cannot be Empty!!!")
      return false
    }
    else if(!(name.match(nameRegex))){
      setNamemessage("Your name should be character only")
      return false
    }
    else{
      setNamemessage("")
    }

// Email Verify
    if(email===""){
      setEmailmessage("Email Cannot be Empty!!!")
      return false
    }
    else if(!(email.match(emailRegex))){
      setEmailmessage("Please fill email correctly !!!!")
      return false
    }
    else{
      setEmailmessage("")
    }

    // Password Verify
    if(password===""){
      setPassmessage("Password Cannot be Empty!!!")
      return false
    }
    else if(!(password.match(passRegex))){
      setPassmessage("The password's first character must be a letter, it must contain at least 4 characters and no more than 15 characters and no characters other than letters, numbers and the underscore may be used")
      return false
    }
    else{
      setPassmessage("")
    }

    
//Mobile verify
    if(mobile===""){
      setMobilemessage("mobile Cannot be Empty!!!")
      return false
    }
    else if(!(mobile.match(numRegex))){
      setMobilemessage("Your number should be numeric")
      return false
    }
    else if(mobile.length<10 || mobile.length>11){
      setMobilemessage("please enter correct number")
      return false
    }
    else{
      setMobilemessage("")
    }
    console.log(state)

  
//// FETCH API //////

if (password===confirmPassword){
  fetch('http://localhost:5000/contact', {
  method: 'POST',
  body: JSON.stringify({name,email,password,confirmPassword,mobile, address}),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    alert('Registered')
    setState({name:"",email:"",password:"",confirmPassword:"",mobile:"", address:""})
  })
  
  .catch((err)=>console.log(err))
}
else{
  alert('Your password and confirm password not match')
}




  }
  return (
    <>
    


    <h1>Contact Page</h1>
    
    <div className="text-danger">
      {namemessage}
    </div>
    <div className="container">
        <form>
        <div className="mb-3">
            <label for="name 1" className="form-label">Name</label>
            <input type="text" className="form-control" id="Name"  name='name' value={state.name} onChange={handler}/>
          </div>
          <div className="text-danger">
      {emailmessage}
    </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={state.email} onChange={handler}/>
          </div>
          <div className="text-danger">
      {mobilemessage}
    </div>
          <div className="mb-3">
            <label for="Number" className="form-label">Mobile</label>
            <input type="text" className="form-control" id="Mobile" name='mobile' value={state.mobile} onChange={handler}/>
          </div>
          <div className="text-danger">
      {passmessage}
    </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label" >Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={state.password} onChange={handler}/>
          </div>
          
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label"> Confirm Password</label>
            <input type="password" className="form-control" id="exampleInputPassword2" name='confirmPassword' value={state.confirmPassword} onChange={handler}/>
          </div>
          <div className="mb-3">
            <label for="Address" className="form-label">Address</label>
            <textarea rows={5} columns={10} className='form-control' name='address' value={state.address} onChange={handler}></textarea>
          </div>

          
          <button type="button" className="btn btn-primary" onClick={submitData}>Submit</button>
        </form>
    </div>
    </>
  )
}

export default Contact
