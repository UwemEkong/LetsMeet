import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/homestyles.css';
import logo from '../assets/logo.svg';
import {Link} from "react-router-dom";

const Home = ()=>{
  return(
      <>
      <div class="container">
        <div class="row">
          <div class="col-6">
                <h1 style={{paddingTop:"15%", paddingLeft:"20%"}}>
                    Empowering Individuals With The Strength of Their Communities
                </h1>
                <Link to="/categories"><button style={{marginLeft:"20%"}}type="button" class="btn btn-primary btn-lg">Get Started</button></Link>
          </div>
          <div class="col-4">
                <img style={{paddingTop:"10%", marginTop: "15%", marginRight:"10%"}} src={logo} width="500" height="450"/>
          </div>
        </div>
      </div>
      </>
  )
}

export default Home;