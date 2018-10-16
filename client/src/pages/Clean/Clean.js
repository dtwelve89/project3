import React, { Component } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar"
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
        <Header />
        <MapApp />
      </div>
    );
  }
}

export default Clean;