import Event from '../components/Event';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import {Modal} from 'react-bootstrap';

const EventsPage = ({ results, setResults, formParams }) => {

    const [highlighted, setHighlighted] = useState({})

    const handleClose = () => setHighlighted({});
   

    const history = useHistory();

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

    return (
        <>
        <Modal show={Object.keys(highlighted).length !== 0 } onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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

        <div style={{display:"flex"}} className="container">
            <div style={{flex:"1", marginLeft:"320px"}}>
            <h1 style={{color:"blue", textDecoration: ""}}><u>Events</u> | </h1>
            </div>
            <div>
        <h1 onClick={getGroups} style={{flex:"1", marginRight:"350px", cursor:"pointer"}} >Groups</h1>
            </div>
        </div>
    <div className="container">
       {/* <Button onClick={getGroups}>groups</Button>*/}

        {results.map((event) => {
            return (
                <Event
                    name={event.name}
                    time={event.time}
                    description={event.description}
                    group_url={event.group_url}
                    url={event.url}
                    location={event.location}
                    attendees={event.attendees}
                    image_url={event.image_url} 
                    onClick={ (event) => {setHighlighted(event)} }

            />
                   
            )
        })}
    </div>
    </>)
}

export default EventsPage;