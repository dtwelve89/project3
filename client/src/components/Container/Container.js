import React from "react";
import "./Container.css";

const Container = props => (
  <div className="card">
    <h3 className="card-header">{props.category}</h3>
    <div className="card-body wrapper">{props.children}</div>
  </div>
);

export default Container;
