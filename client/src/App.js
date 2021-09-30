import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar  from './components/Navbar';
import HomePage  from './screens/Homepage';
import Banner from './components/Banner';

function App() {
  return (
    <div className="App container">
      <Navbar/>
      <Banner/>
      <HomePage/>
    </div>
  );
}

export default App;
