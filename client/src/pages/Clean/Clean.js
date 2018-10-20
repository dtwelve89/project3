import React, { Component } from "react";
import API from "../../utils/API";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess"

class Clean extends Component {
  state = {
    id: "5bc92229a433092c0b3fddec",
    // location: "",
    // SensitiveWaste: true,
    // resolved: true
    mess:[]
  };

  //handle button click for messes then display particular chosen mess to clean. Toggle boolean to true when clean button is hit.

  componentDidMount() {
    // this.getParameterByName();
    this.loadMess();
  };

  // getParameterByName = (name, url) => {
  //   if (!url) url = window.location.href;
  //   name = name.replace(/[\[\]]/g, '\\$&');
  //   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  //       results = regex.exec(url);
  //   if (!results) return null;
  //   if (!results[2]) return '';
  //   decodeURIComponent(results[2].replace(/\+/g, ' '));
  // };

  loadMess = id => {
    API.getMess(this.state.id)
      .then(res =>
        // console.log(res)
        this.setState({ mess: res.data })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <MapApp />
        <Mess
          key = {this.state.mess.title}
          // image = {mess.image}
          title = {this.state.mess.title}
          location = {this.state.mess.location}
          levelOfConcern = {this.state.mess.levelOfConcern}
          description = {this.state.mess.description}
          timestamp = {this.state.mess.timestamp}
          sensitive = {this.state.mess.sensitive}
          // resolved = {mess.resolved}
        />
      </div>
      
    );
  }
}

export default Clean;