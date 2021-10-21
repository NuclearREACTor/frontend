import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      await axios.post(
        "https://foodappbackend.herokuapp.com/auth/login",
        loginData
      );
      await getLoggedIn();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <form onSubmit={login}>
            <input
              type="text"
              placeholder="email"
              className="form-control"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
