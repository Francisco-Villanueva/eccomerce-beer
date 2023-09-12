import React from "react";
import Navbar from "../commons/Navbar";
import logo from "../assets/imgs/devbooks-circulo.png";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className="welcome">
        <div className="welcome-img">
          <img src={logo} alt="devbookLogo" />
        </div>
        <div className="welcome-text">
          <h1>WELCOME</h1>
          <h3>TO DEVBOOKS</h3>
          <p>
            THIS WEBSITE IS DEDICATED TO ALL THE PASSIONATE PEOPLE WHO WANT TO
            LEARN MORE ABOUT PROGRAMMING AND TECHNOLOGIES. <br/>
            THERE ARE ALL THE
            BOOKS YOU ARE LOOKING FOR!!!
          </p>
          <div className="welcome-divLink">
          <Link className="welcome-link" to={"/login"}><button>LOGIN</button></Link>
          <Link to={"/register"}><button>REGISTER</button></Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Welcome;
