import React from 'react';


function convertUnix(unix_timestamp) {
    var date = new Date(unix_timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-US")}`;
}

function getColor() {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%,1)";
}

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

const Event = ({ name, time, description, group_url, url, location, attendees, image_url }) => {
    time = convertUnix(time).toUpperCase();
    name = name.toUpperCase();
    return (
        <div style={{ borderTop: "2px solid gray", marginBottom: "20px", cursor: "pointer" }} className="container">
            <div style={{ marginTop: "20px" }} className="row">
                <div style={{ marginTop: "20px", height: "200px", width: "200px", border: "4px solid black", borderRadius: "10px", backgroundImage: `url(${image_url})`, backgroundColor: getColor(), backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className="col-2">
                </div>
                <div className="col-10">
                    <p style={{ fontSize: "24px", color: "#737373" }} >Start Time: {time}<br /></p>
                    <h1 style={{ fontWeight: "bold" }}>{name}<br /></h1>
                    <p style={{ fontSize: "30px", color: "#737373" }}> {truncate(description, 128)}<br /></p>
                    <p style={{ fontSize: "24px" }}>{attendees} attendees </p>

                </div>

            </div>
        </div>
    )
}

export default Event;