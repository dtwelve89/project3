import React from "react";
import Moment from 'react-moment';
import "./Mess.css";

const Mess = (props) => {
  return (
    <div className={props.className === "messes" ? "card messes" : "card resolvedMess"} id={props.id}>
      <div className="card-body">
        <img id="messImage" src={props.image} alt="sight"></img>
        <ul>
          <li>Title: {props.title}</li>
          <li>Location: {props.location}</li>
          <li>Level of Concern: {props.levelOfConcern}</li>
          <Moment><li>Reported: {props.timestamp}</li></Moment>
          {/* <li>Description: {props.description}</li> */}
        </ul>

      </div>
    </div>
  );
}
export default Mess;