import React from 'react'
import logo from '../assets/logo.svg';

const Logo = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <a style={{ fontFamily: "arial,helvetica", fontSize: "40px" }} className="navbar-brand" href="/">
                    <img className="d-inline-block align-middle" src={logo} width="100" height="100" alt="Logo" />
                    <span className="ml-3">LetsMeet</span>
                </a>
            </nav>
        </>)
}

export default Logo