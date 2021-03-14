import React, {useState} from 'react';
import '../styles/categorystyles.css';
import { Card, Container, Row, Col } from "react-bootstrap";
import environment from "../assets/environment.svg";
import diversity from "../assets/diversity.svg";
import health from "../assets/health.svg";
import lgbt from "../assets/lgbt.svg";
import {Link} from "react-router-dom";

const Category = () => {

    const [selected, setSelected] = useState(-1);

    const [category, setCategory] = useState("");

    const clickHandler1 = () => {

        setSelected(0)
        setCategory("environment")
        
    }

    const clickHandler2 = () => {
        setSelected(1)
        setCategory("diversity_inclusion")
    }

    const clickHandler3 = () => {
        setSelected(2)
        setCategory("mental_health")
    }

    const clickHandler4 = () => {
        setSelected(3)
        setCategory("lgbtq")
    }

    return (
        <>
            <h1 style={{marginBottom:"5%", marginTop:"2px"}} className="category-h1">Please Select A Category</h1>
            <Container>
                <Row style={{marginBottom: "40px", marginLeft: "30%"}}>
                    <Col style={{marginRight: "60px"}} xs={3}>
                        <Card style={ selected === 0 ? {borderColor:"blue", borderWidth:"5px", borderRadius:"10px"} : {}} onClick={clickHandler1}>
                            <Card.Img variant="top" src={environment} />
                            <Card.Body>
                            <Card.Title style={{textAlign:"center"}}>Environment</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={3}>
                    <Card style={ selected === 1 ? {borderColor:"blue", borderWidth:"5px", borderRadius:"10px"} : {}} onClick={clickHandler2}>
                            <Card.Img variant="top" src={diversity} />
                            <Card.Body>
                            <Card.Title style={{textAlign:"center"}}>Diversity </Card.Title>
                            </Card.Body>
                        </Card>
                </Col>
                </Row>
                <Row style={{marginLeft: "30%"}}>
                    <Col style={{marginRight: "60px"}} xs={3}>
                    <Card style={ selected === 2 ? {borderColor:"blue", borderWidth:"5px", borderRadius:"10px"} : {}} onClick={clickHandler3}>
                            <Card.Img variant="top" src={health} />
                            <Card.Body>
                            <Card.Title style={{textAlign:"center"}}>Mental Health</Card.Title>
                            </Card.Body>
                        </Card>
                </Col>
                    <Col xs={3}>
                    <Card style={ selected === 3 ? {borderColor:"blue", borderWidth:"5px", borderRadius:"10px"} : {}} onClick={clickHandler4}>
                            <Card.Img variant="top" src={lgbt} />
                            <Card.Body>
                            <Card.Title style={{textAlign:"center"}}>LGBTQ+</Card.Title>
                            </Card.Body>
                        </Card>
                </Col>
                </Row>
                
                <Link to={"/form/" + category}><button style={{marginLeft:"80%"}}type="button" class="btn btn-primary btn-lg">Next</button></Link>
             
            </Container>
        


            {/* <div class="container">
            <div class="row">
               <div class="col 5">
                <div class="card" >
                    <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Card 1</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>
                <div class="col 5">
                <div class="card">
                    <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Card 2</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>
              </div>
        </div> */}
        </>
        
    )
    
}

export default Category;