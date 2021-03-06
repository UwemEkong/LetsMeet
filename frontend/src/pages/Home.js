import React from 'react';
import '../styles/homestyles.css';
import logo from '../assets/logo.svg';
import {Link} from "react-router-dom";

const Home = ()=>{
  return(
      <>
      <div className="container">
        <div className="row">
          <div className="col-6">
                <h1 style={{paddingTop:"15%", paddingLeft:"20%"}}>
                    Empowering Individuals With The Strength of Their Communities
                </h1>
                <Link to="/categories"><button style={{marginLeft:"20%"}}type="button" className="btn btn-primary btn-lg mt-4">Get Started</button></Link>
          </div>
          <div className="col-4">
                <img style={{paddingTop:"10%", marginTop: "15%", marginRight:"10%"}} src={logo} width="500" height="450"/>
          </div>
        </div>
      </div>
      </>
  )
}

export default Home;