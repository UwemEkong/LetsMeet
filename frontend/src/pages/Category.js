import React, { useState } from 'react';
import '../styles/categorystyles.css';
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";
import environment from "../assets/environment.svg";
import diversity from "../assets/diversity.svg";
import health from "../assets/health.svg";
import lgbt from "../assets/lgbt.svg";
import Form from "./Form";

const Next = ({ category, setCarouselIndex }) => {

    const update = () => {
        setCarouselIndex(1);
    }

    if (category)
        return (<a className="btn btn-primary btn-lg" onClick={update}>Next</a>);
    else
        return (<a className="btn btn-outline-primary btn-lg disabled" title="Please select a category.">Next</a>)
}

const Category = ({ setResults, setFormParams }) => {

    const [selected, setSelected] = useState(-1);
    const [carouselIndex, setCarouselIndex] = useState(0);
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
        <Carousel activeIndex={carouselIndex} controls={false} indicators={false} interval={0} keyboard={false} touch={false} pause={false}>
            <Carousel.Item>
                <h1 className="category-h1 my-4">Please Select A Category</h1>
                <Container className="mx-auto">
                    <Row>
                        <Col xs={3} style={{padding: "10px"}}>
                            <Card style={selected === 0 ? { borderColor: "blue", borderWidth: "5px", borderRadius: "10px" } : { cursor: "pointer" }} onClick={clickHandler1}>
                                <Card.Img variant="top" style={{ userSelect: "none" }} src={environment} draggable={false} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: "center", userSelect: "none" }}>Environment</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} style={{padding: "10px"}}>
                            <Card style={selected === 1 ? { borderColor: "blue", borderWidth: "5px", borderRadius: "10px" } : { cursor: "pointer" }} onClick={clickHandler2}>
                                <Card.Img variant="top" style={{ userSelect: "none" }} src={diversity} draggable={false} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: "center", userSelect: "none" }}>Diversity</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} style={{padding: "10px"}}>
                            <Card style={selected === 2 ? { borderColor: "blue", borderWidth: "5px", borderRadius: "10px" } : { cursor: "pointer" }} onClick={clickHandler3}>
                                <Card.Img variant="top" style={{ userSelect: "none" }} src={health} draggable={false} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: "center", userSelect: "none" }}>Mental Health</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={3} style={{padding: "10px"}}>
                            <Card style={selected === 3 ? { borderColor: "blue", borderWidth: "5px", borderRadius: "10px" } : { cursor: "pointer" }} onClick={clickHandler4}>
                                <Card.Img variant="top" style={{ userSelect: "none" }} src={lgbt} draggable={false} />
                                <Card.Body>
                                    <Card.Title style={{ textAlign: "center", userSelect: "none" }}>LGBTQ+</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="text-center">
                            <Next category={category} setCarouselIndex={setCarouselIndex}></Next>
                        </Col>
                    </Row>
                </Container>
            </Carousel.Item>
            <Carousel.Item>
                <Form setResults={setResults} setFormParams={setFormParams} category={category} />
            </Carousel.Item>
        </Carousel>
    )
}

export default Category;