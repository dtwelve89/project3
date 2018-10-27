import React from "react";
import "./Mess.css";

const Mess = (props) => {
  return (
    <div className="card mess" id={props.id}>
      <div className="card-body">
        <img id="messImage" src={props.image} alt="sight"></img>
        <ul>
          {/* <button className="btn btn-secondary float-right" onClick={() => props.showModal()}>View Mess</button> */}
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
}
export default Mess;