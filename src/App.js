import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import HomePage from "./screens/Homepage";
import Banner from "./components/Banner";
import FetchFood from "./FetchFood";

function App() {
  return (
    <div className="App container">
      <Navbar />
      <Banner />
      <h2>Food Menu</h2>
      <FetchFood />
    </div>
  );
}

export default App;
