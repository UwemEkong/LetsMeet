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

const Event = ({ event, setHighlighted }) => {
    let time = convertUnix(event.time).toUpperCase();
    let name = event.name.toUpperCase();

    const update = () => {
        setHighlighted(event);
    }

    return (
        <div onClick={update} style={{ borderTop: "2px solid gray", marginBottom: "20px", cursor: "pointer" }} className="container">
            <div style={{ marginTop: "20px" }} className="row">
                <div style={{ marginTop: "20px", height: "200px", width: "200px", border: "4px solid black", borderRadius: "10px", backgroundImage: `url(${event.image_url})`, backgroundColor: getColor(), backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className="col-2">
                </div>
                <div className="col-10">
                    <p style={{ fontSize: "24px", color: "#737373" }} >Start Time: {time}<br /></p>
                    <h1 style={{ fontWeight: "bold" }}>{name}<br /></h1>
                    <p style={{ fontSize: "30px", color: "#737373" }}> {truncate(event.description, 128)}<br /></p>
                    <p style={{ fontSize: "24px" }}>{event.attendees} attendees </p>

                </div>

            </div>
        </div>
    )
}

export default Event;