import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Link, Switch}from 'react-router-dom';
import Navbar from "./components/Navbar";
// import HomePage from "./screens/Homepage";
import MainPage from "./MainPage";
import OrderPage from "./OrderPage";

function App() {
  return (
    <div className="App container">
        <Navbar />
      <BrowserRouter>
      <Route path="/" exact component ={MainPage}/>
      <Route path="/order/:id" exact component={OrderPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
