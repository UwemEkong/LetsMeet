import React from 'react';
import Button from 'react-bootstrap/Button';
import './homestyles.css';
import logo from '../assets/logo.svg';
const Home = ()=>{
  return(
      <>
      <div class="container">
        <div class="row">
          <div class="col-6">
                <h1 style={{paddingTop:"45%", paddingLeft:"20%"}}>
                    Empowering Individuals With The Strength of Their Communities
                </h1>
                <button style={{marginLeft:"20%"}}type="button" class="btn btn-primary btn-lg">Get Started</button>
          </div>
          <div class="col-4">
                <img style={{paddingTop:"10%", marginTop: "50%", marginRight:"10%"}} src={logo} width="500" height="450"/>
          </div>
        </div>
      </div>
      </>
  )
}

export default Home;