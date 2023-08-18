import logo from './logo.svg';
import './App.css';
import './Navbar.css'
import './Landing.css'
import './Cart.css'
import './Slider.css'
import './Checkout.css'
import './display.css'
import './loader.css'
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Cart from './components/Cart';
import Contact from './components/Contact';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
  NavLink
} from 'react-router-dom';






function App() {
  return (
    <div className="App">
      
      
    


      

      

      <Routes>
        <Route path="/" element={< Landing />} />
        <Route path="/home" element={< Home />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/cart" element={< Cart />} />
        <Route path="/contact" element={< Contact />} />

      </Routes>

      <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >

      

    </div>
  );
}

export default App;
