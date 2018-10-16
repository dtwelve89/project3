import React from "react";
import "./Mess.css";

const Mess = (props) => (
  <div className="mess">
    <img src={props.image} alt={props.description}></img>
    <ul>
      <li>Title: {props.title}</li>
      <li>Location: {props.location}</li>
      <li>Reported: {props.timestamp}</li>
      <li>Sensitive: {props.sensitive}</li>
      <li>Resolved: {props.resolved}</li>
    </ul>
  </div>
);

export default Mess;