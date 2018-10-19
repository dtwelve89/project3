import React from "react";
import "./Mess.css";

const Mess = (props) => (
  <div className="card mess">
    <div className="card-body">
      {/* <img src={props.image} alt={props.description}></img> */}
      <ul>
        <button className="btn btn-secondary float-right">View Mess</button>
        <li>Title: {props.title}</li>
        <li>Location: {props.location}</li>
        <li>Level of Concern: {props.levelOfConcern}</li>
        <li>Reported: {props.timestamp}</li>
        <li>Sensitive: {props.sensitive}</li>
        {/* <li>Description: {props.description}</li> */}
        {/* <li>Resolved: {props.resolved}</li> */}
      </ul>
    </div>
  </div>
);

export default Mess;