import React, { useState } from 'react';
import Event from '../components/Event';
import sampleImage from '../assets/environment.svg';

const EventsPage = () => {

    let EVENTS = [{
        "name": "My Event",
        "time": 1615732200000,
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. readable English.",
        "group_url": "https://hackmerced.com/#/",
        "url": "url to event",
        "location:": "Lisle, IL",
        "attendees": 4,
        "image": sampleImage
    }, {
        "name": "My Event",
        "time": 1615732200000,
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. readable English.",
        "group_url": "https://hackmerced.com/#/",
        "url": "url to event",
        "location:": "Lisle, IL",
        "attendees": 4,
        "image": sampleImage
    }]




    return (<div className="container">
        {EVENTS.map((event) => {
            return (
                <Event
                    name={event.name}
                    time={event.time}
                    description={event.description}
                    group_url={event.group_url}
                    url={event.url}
                    location={event.location}
                    attendees={event.attendees}
                    image={event.image} />
            )
        })}
    </div>)
}

export default EventsPage;