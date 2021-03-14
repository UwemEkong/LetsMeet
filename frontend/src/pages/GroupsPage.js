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


    return (
        <>
         <div style={{display:"flex"}} className="container">
            <div style={{flex:"1", marginLeft:"320px", cursor:"pointer"}}>
            <h1 onClick={getEvents} styles={{cursor:"pointer"}}>Events </h1>
            </div>
            <div>
        <h1 style={{color:"blue",flex:"1", marginRight:"350px"}} > <u>| Groups</u></h1>
            </div>
        </div>

        <div className="container">
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
    </div>
    </>)
}

export default GroupsPage;