import React, { useState } from 'react';
import Group from '../components/Group';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const GroupsPage = ({ results, setResults, formParams }) => {

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
                            name={group.name}
                            url={group.url}
                            image_url={group.image_url}
                            members={group.members}
                            description={group.description}
                            events={group.events}
                        />
                    )
                })}
            </div>
        </>)
}

export default GroupsPage;