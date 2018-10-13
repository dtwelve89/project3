import React, { Component } from "react";
import Header from "../../components/Header";
import Map from "../../components/Maps";
import Navbar from "../../components/Navbar";



class Clean extends Component {
  state = {
    resolved: true
  };

  componentDidMount() {
    this.loadIncident();
  }

  loadIncident = () => {}

  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <div id="map">
          <Map />
        </div>
      </div>
    );
  }
}

export default Clean;