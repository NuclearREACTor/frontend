import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import LogOutBtn from '../screens/LogOutBtn';

export default function Navbar() {

  const { loggedIn } = useContext(AuthContext);
  //console.log(loggedIn);

  return (
    <div >
      <nav className="navbar navbar-expand-lg  bg-dark navbar-dark p-2">
        <a className="navbar-brand" href="/">Cafe Delivery</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Menu </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/order">Cart</a>
            </li>
            {loggedIn === false && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </>
            )}
            {loggedIn === true && (
              <>
                <LogOutBtn />
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )


}