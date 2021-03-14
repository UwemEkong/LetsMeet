import React, { useState } from 'react';


function convertUnix(unix_timestamp) {
    var date = new Date(unix_timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-US")}`;
}
const Event = ({ name, time, description, group_url, url, location, attendees, image }) => {
    time = convertUnix(time).toUpperCase();
    name = name.toUpperCase();
    return (
        <div style={{ borderTop: "2px solid gray", marginBottom: "20px" }} class="container">
            <div style={{marginTop:"20px"}} class="row">
                <div style={{marginTop:"20px",height:"200px",border:"4px solid black", borderRadius: "10px",backgroundImage:`url(${image})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}} class="col-2">
                </div>
                <div class="col-10">
                    <p style={{fontSize:"24px", color:"#737373"}} >Start Time: {time}<br/></p>
                    <h1 style={{fontWeight:"bold"}}>{name}<br/></h1>
                    <p style={{fontSize:"30px", color:"#737373"}}> {description}<br/></p>
                    <p style={{fontSize:"24px"}}>{attendees} attendees</p>
                </div>

            </div>
        </div>
    )
}

export default Event;