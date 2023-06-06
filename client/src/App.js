import logo from './logo.svg';
import './App.css';
import './write.css'
import './Landing.css'
import './Glass.css'
import './Button.css'
import './Checkout.css'
import './cart.css'
import './card.css'
import './navbar.css'
import './Like.css'


import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Routes,
  NavLink
} from 'react-router-dom';
import Items from './components/Items';
import Write from './components/Write';
import Home from './components/Home';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Cart from './components/Cart';
import Myinfo from './components/Myinfo';


function App() {
  return (
    <div className="App">


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
            </ul>
    </div >




      <Routes>


        <Route path="/" element={< Landing />} />
        <Route path="/items" element={< Items />} />
        <Route path="/write" element={< Write />} />
        <Route path="/home" element={< Home />} />
        <Route path="/sign" element={< Signup />} />
        <Route path="/cart" element={< Cart />} />
        <Route path="/myinfo" element={< Myinfo />} />



      </Routes>

    </div>
  );
}

export default App;
