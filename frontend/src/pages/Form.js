import "../App.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Form as BSForm, Row, Col, Container, Button } from "react-bootstrap";
import '../styles/formstyles.css';

const ButtonOrLoading = (isSearching) => {
  if (isSearching.isSearching)
    return (<div className="spinner-border text-primary"></div>);
  else
    return (<Button className="btn-lg" type="submit">Search</Button>);
}

const NoData = ({ noData }) => {
  if (noData)
    return (
      <Row>
        <Col>
          <p className="text-danger">Sorry, no results. Try a different zip code or a bigger radius.</p>
        </Col>
      </Row>
    );
  else
    return (<></>);
}

const Form = ({ setResults, setFormParams, category }) => {

  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setIsSearching(true);

      let params = {
        category: form.category.value,
        zip: form.zip.value,
        radius: form.radius.value
      }
      setFormParams(params);

      axios.get(
        '/api/events',
        {
          params: params
        }
      ).then((resp) => {
        if (resp.data.length > 0) {
          setResults(resp.data); // list of results
          history.push("/events")
        } else
          setNoData(true);
          setIsSearching(false);
      })
    }

    setValidated(true);
  }

  return (
    <Container className="h-100" style={{ width: "50%" }}>
      <BSForm className="d-flex flex-column min-vh-75 justify-content-center align-items-center" noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col className="mb-5">
            <h1 className="pt-5">We just need a little bit more information...</h1>
          </Col>
        </Row>
        <NoData noData={noData} />
        <Row>
          <Col>
            <BSForm.Group>
              <BSForm.Label>Zip Code</BSForm.Label>
              <BSForm.Control type="text" inputMode="numeric" pattern="\d{5}" id="zip" name="zip" placeholder="94104" required />
              <BSForm.Text className="text-muted">Your zip code is used to find groups and events near you.</BSForm.Text>
              <BSForm.Control.Feedback type="invalid">Please provide a valid 5-digit zip code.</BSForm.Control.Feedback>
            </BSForm.Group>
          </Col>
          <Col>
            <BSForm.Group>
              <BSForm.Label>Search Radius</BSForm.Label>
              <BSForm.Control size="lg" as="select" defaultValue="25" name="radius">
                <option value="2">2 miles</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="25">25 miles</option>
                <option value="50">50 miles</option>
                <option value="100">100 miles</option>
                <option value="any">any distance</option>
              </BSForm.Control>
            </BSForm.Group>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <BSForm.Control type="hidden" name="category" value={category} />
            <ButtonOrLoading isSearching={isSearching} />
          </Col>
        </Row>
      </BSForm>
    </Container>
  )
};

export default Form