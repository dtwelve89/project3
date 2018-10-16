import React, { Component } from "react";
import MapApp from "../../components/Maps";


class Clean extends Component {
  state = {
    ID: "",
    location: "",
    SensitiveWaste: true,
    resolved: true
  };

  render() {
    return (
      <div>
        <MapApp />
      </div>
    );
  }
}

export default Clean;