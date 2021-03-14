import React from 'react'
import logo from '../assets/logo.svg';
import {Link} from "react-router-dom";

const Logo = () =>{
    
    return (
        <>
    <div className="container-fluid">
     <p style={{fontFamily:"arial,helvetica", fontSize:"40px"}}><Link to="/"><img style={{}} src={logo} width="100" height="100"/></Link>LetsMeet</p>
    </div>
    </>)
}

export default Logo