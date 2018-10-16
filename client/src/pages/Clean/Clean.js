import React, { Component } from "react";
import MapApp from "../../components/Maps";



class Clean extends Component {
  state = {
    ID: "",
    location: "",
    SensitiveWaste: true,
    resolved: true
  };



  //handle button click for messes then display particular chosen mess to clean. Toggle boolean to true when clean button is hit.

 


  render() {
    return (
      <div>
        <MapApp />
      </div>
    );
  }
}

export default Clean;