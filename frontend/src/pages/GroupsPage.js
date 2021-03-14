import { React, useState } from 'react';
import Group from '../components/Group';
import sampleImage from '../assets/health.svg';

const GroupsPage = () => {

    let GROUPS = [{
        "name": "My Group",
        "url": "https://hackmerced.com/#/",
        "image_url": sampleImage,
        "members": 4,
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. readable English.",
        "events": [1, 2, 3]
    }, {
        "name": "My Group",
        "url": "https://hackmerced.com/#/",
        "image_url": sampleImage,
        "members": 4,
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. readable English.",
        "events": [1, 2, 3]
    }]




    return (<div className="container">
        {GROUPS.map((group) => {
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