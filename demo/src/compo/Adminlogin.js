import React, { useState } from "react";
import { useNavigate} from 'react-router-dom'
function Adminlogin() {
    const navi = useNavigate()
  const [login, setLogin] = useState({ email: "", password: "" });
  const handler = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    const { email, password } = login;
    if (email && password) {
      fetch("http://localhost:5000/adminlogin/", {
        method: "POST",
        body: JSON.stringify({ email, password}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          //   console.log(json)
          alert(json.Message);
           navi('/fetch')
          ;
        })
        .catch((err) => console.log(err));

    }
    else{
        alert('please fill all required fields')
    }
   
  };
  return (
    <>
      <div class="container">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control border-warning border-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={login.email}
              onChange={handler}
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleInputPassword1"
              class="form-label border-warning"
            >
              Password
            </label>
            <input
              type="password"
              class="form-control border-warning border-3"
              id="exampleInputPassword1"
              name="password"
              value={login.password}
              onChange={handler}
            />
          </div>

          <button type="button" class="btn btn-warning" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Adminlogin;
