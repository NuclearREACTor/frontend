import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Register() {

  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = {
        firstName, lastName, email, password, cpassword
      };

      await axios.post("http://localhost:8000/auth/", registerData);
      getLoggedIn();
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <h1>Register a new account</h1>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <form onSubmit={register}>
            <input type="text" placeholder="firstname" className="form-control"
              onChange={(e) => { setfirstname(e.target.value) }}
            />
            <input type="text" placeholder="lastname" className="form-control"
              onChange={(e) => { setlastname(e.target.value) }}
            />
            <input type="text" placeholder="email" className="form-control"
              onChange={(e) => { setemail(e.target.value) }}
            />
            <input type="password" placeholder="password" className="form-control"
              onChange={(e) => { setpassword(e.target.value) }} />
            <input type="password" placeholder="confirm password" className="form-control"
              onChange={(e) => { setcpassword(e.target.value) }} />
            <button type="submit" className="btn btn-primary mt-3">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;