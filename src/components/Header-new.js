import React from 'react';
import '../styles/components/Header.css'
function Header() {
  return (

   <header>
    <nav class="headerbody">
    <input type="checkbox" id="check"/>
    <label for="check" class="checkbtn">
      <i class="fa fa-bars"></i>
    </label>
    <label class="logo"><span>e</span>Hospital</label>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="/AboutUs">About Us</a></li>
      <li><a href="/contact">Contact US</a></li>
      <li><a href="/LogIn">LogIn</a></li>
      <li><a href="/signUp">SignUp</a></li>
      <li><a href="/DBConnection">DB Connection</a></li>
    </ul>
  </nav>
  </header>

  
  
    );
}

export default Header;

  {/* message prop requires a string <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/DBConnection">DB Connection</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header> */} 