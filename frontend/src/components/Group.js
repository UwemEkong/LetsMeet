import React, { useState } from 'react';

const Group = ({ name, url, image_url, members, description, events }) => {

    name = name.toUpperCase();
    return (
        <div style={{ borderTop: "2px solid gray", marginBottom: "20px" }} className="container">
            <div style={{marginTop:"20px"}} class="row">
                <div style={{marginTop:"20px",height:"200px",border:"4px solid black", borderRadius: "10px",backgroundImage:`url(${image_url})`, backgroundSize:"contain", backgroundRepeat:"no-repeat", backgroundPosition:"center"}} class="col-2">
                </div>
                <div className="col-10">
                    <h1 style={{fontWeight:"bold"}}>{name}<br/></h1>
                    <p style={{fontSize:"30px", color:"#737373"}}> {description}<br/></p>
                    <p style={{fontSize:"24px"}}>{members} members | Public</p>
                </div>
               
            </div>
        </div>
    )
}

export default Group;