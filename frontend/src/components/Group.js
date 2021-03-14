import React from 'react';

function getColor() {
    return "hsla(" + ~~(360 * Math.random()) + "," +
        "70%," +
        "80%,1)";
}

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

const Group = ({ group, setHighlighted }) => {
    let name = group.name.toUpperCase();

    const update = () => {
        setHighlighted(group);
    }

    return (
        <div onClick={update} style={{ borderTop: "2px solid gray", marginBottom: "20px", cursor: "pointer" }} className="container">
            <div style={{marginTop:"20px"}} className="row">
                <div style={{marginTop:"20px",maxHeight:"200px",maxWidth:"200px",border:"4px solid black", borderRadius: "10px",backgroundImage:`url(${group.image_url})`, backgroundColor: getColor(), backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}} className="col-3">
                </div>
                <div className="col-9">
                    <h1 style={{fontWeight:"bold"}}>{name}<br/></h1>
                    <p style={{fontSize:"30px", color:"#737373"}}> {truncate(group.description, 128)}<br/></p>
                    <p style={{fontSize:"24px"}}>{group.members} members | Public</p>
                </div>
            </div>
        </div>
    )
}

export default Group;