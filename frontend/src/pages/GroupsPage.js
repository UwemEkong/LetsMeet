import React, { useState } from 'react';
import Group from '../components/Group';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const GroupsPage = ({ results, setResults, formParams }) => {

    const [highlighted, setHighlighted] = useState({});

    const handleClose = () => setHighlighted({});

    const history = useHistory();

    if (results.length === 0)
        history.push("/categories");

    const getEvents = () => {
        axios.get(
            '/api/events',
            {
                params: formParams
            }
        ).then((resp) => {
            setResults(resp.data); // list of results
            history.push("/events")
        })
    }


    return (
        <>
            <Modal show={Object.keys(highlighted).length !== 0} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{highlighted.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
            <div className="container">
                <div className="mx-auto text-center mb-3">
                    <ul className="nav nav-tabs nav-fill">
                        <li class="nav-item">
                            <h3 style={{cursor:"pointer"}}><a class="nav-link" onClick={getEvents}>Events</a></h3>
                        </li>
                        <li className="nav-item">
                            <h3><a className="nav-link active">Groups</a></h3>
                        </li>
                    </ul>
                </div>

                {results.map((group) => {
                    return (
                        <Group
                            group={group}
                            setHighlighted={setHighlighted}
                        />
                    )
                })}
            </div>
        </>)
}

export default GroupsPage;