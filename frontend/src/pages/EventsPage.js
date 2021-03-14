import Event from '../components/Event';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

const EventsPage = ({ results, setResults, formParams }) => {

    const [highlighted, setHighlighted] = useState({})

    const handleClose = () => setHighlighted({});


    const history = useHistory();

    if (results.length === 0)
        history.push("/categories");

    const getGroups = () => {
        axios.get(
            '/api/groups',
            {
                params: formParams
            }
        ).then((resp) => {
            setResults(resp.data); // list of results
            history.push("/groups")
        })
    }

    function getColor() {
        return "hsla(" + ~~(360 * Math.random()) + "," +
            "70%," +
            "80%,1)";
    }
    

    return (
        <>
            <Modal show={Object.keys(highlighted).length !== 0} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{highlighted.name}</Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    <Image  style={{backgroundColor:getColor(), backgroundImage: `url(${highlighted.image_url})`,width:"200px",height:"200px", margin:"auto" }} src={highlighted.image_url} thumbnail />
                </Modal.Header>
                <Modal.Body>{highlighted.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button href={highlighted.url} target="_blank" variant="info" onClick={handleClose}>
                        Sign Up!
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container">
                <div className="mx-auto text-center mb-3">
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <h3><a className="nav-link active">Events</a></h3>
                        </li>
                        <li class="nav-item">
                            <h3 style={{ cursor: "pointer" }}><a class="nav-link" onClick={getGroups}>Groups</a></h3>
                        </li>
                    </ul>
                </div>

                {results.map((event) => {
                    return (
                        <Event
                            event={event}
                            setHighlighted={setHighlighted}
                        />

                    )
                })}
            </div>
        </>)
}

export default EventsPage;