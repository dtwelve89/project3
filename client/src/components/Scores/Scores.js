import React from "react";
import "./Scores.css";

const Container = props => {
  let stringReported = '';
  let stringCleaned = '';
  if (props.reported > 1) {
    stringReported = `You have reported ${props.reported} messes and`
  } else {
    stringReported = `You have reported ${props.reported} mess and`
  }

  if (props.cleaned > 1) {
    stringCleaned = `You have cleaned ${props.cleaned} messes!`
  } else {
    stringCleaned = `You have cleaned ${props.cleaned} mess!`
  }

  return (
  <div id="scores" className="card">
    <p>{stringReported} {stringCleaned}</p>
  </div>
);
}
export default Container;