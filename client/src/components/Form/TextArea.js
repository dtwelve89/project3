import React from "react";
import "./TextArea.css";

export const TextArea = props => (
  <div  className="form-group">
    <textarea id="textarea" className="form-control" rows="20" {...props} />
  </div>
);
