import React, { useState } from "react";

function Adminregister() {
   
  const [admin, setAdmin] = useState({ name:'',email:'', password:'', conpass:'',img:''});

  const handler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const filehandler=(e)=>{
    // console.log(e.target.files[0])
    setAdmin({...admin,img:e.target.files[0]})
  }
  const submitdata = () => {
    const {name, email, password, conpass, img } = admin;
    const formData= new FormData()
    formData.append("name",name)
    formData.append("email",email)
    formData.append("password",password)
    formData.append("conpass",conpass)
    formData.append("img",img)

    if (password===conpass){
        fetch('http://localhost:5000/adminregister', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((json) => {
        //   console.log(json)
          alert(json.Message)
          setAdmin({name:"",email:"",password:"",conpass:"",img:""})
        })
        
        .catch((err)=>console.log(err))
      }
    
    else {
      alert("Your password and confirm password did not match");
    }
  };

  return (
    <>
      <div className="container">
        <form method="post" encType="multipart/form-data">
        <div className="my-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              name="name"
              value={admin.name}
              onChange={handler}
            />
          </div>
          <div className="my-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={admin.email}
              onChange={handler}
            />
          </div>
          <div className="my-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password1"
              name="password"
              value={admin.password}
              onChange={handler}
            />
          </div>
          <div className="my-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmpass"
              name="conpass"
              value={admin.conpass}
              onChange={handler}
            />
          </div>
          <div>
            Profile: <input type="file" name="img" onChange={filehandler}/>
          </div><br/>

          <button type="button" className="btn btn-danger" onClick={submitdata}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Adminregister;
