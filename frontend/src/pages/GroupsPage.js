import React, { useState } from 'react';
import Group from '../components/Group';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const GroupsPage = ({results, setResults, formParams}) => {

    const history = useHistory();

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


    return (<div className="container">
        <Button onClick={getEvents}>events</Button>
        {results.map((group) => {
            return (
                <Group
                    name={group.name}
                    url={group.url}
                    image_url = {group.image_url}
                    members={group.members}
                    description={group.description}
                    events= {group.events}
                    />
            )
        })}
    </div>)
}

export default GroupsPage;