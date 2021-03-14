import React from 'react';
import Container from "react-bootstrap";
import '../styles/formstyles.css';

const Form = () => {
    return (
      <>
      <div className="container">
      <form>
      <label for="fname"><h1>Please Enter your zip code</h1></label>
      <input type="text" id="fname" name="fname" placeholder="Zip Code"/>
      <label for="lname"><h1>Please Choose a Search Radius For Your Events / Groups</h1></label>
      <input type="text" id="lname" name="lname" placeholder="Distance (miles)"/>
      <input type="submit" value="Submit"/>
      </form>
      </div>
      </>


    )
};

export default Form