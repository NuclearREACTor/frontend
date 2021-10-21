import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
// import HomePage from "./screens/Homepage";
import MainPage from "./MainPage";
import OrderPage from "./OrderPage";
import RegisterPage from "./screens/Register";
import LoginPage from "./screens/LoginPage";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";




import PaymentPage from "./PaymentPage";

// cookies and tokens allowed
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className="App container">
      <AuthContextProvider>
        <Navbar />
        <BrowserRouter>
          <Route path="/" exact component={MainPage} />
          <Route path="/order/:id" exact component={OrderPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={MainPage} />
          <Route path="/order/:id" exact component={OrderPage} />
          <Route path="/payment/:id" exact component={PaymentPage} />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
