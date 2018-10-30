import React, { Component } from "react";
import API from "../../utils/API";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
import { Link } from "react-router-dom";

class Global extends Component {
  state = {
    messes: []
  };

  componentDidMount() {
    this.loadMesses();
  }

  loadMesses = () => {
    API.getMesses()
      .then(res => {
        // console.log(res)
        const messes = res.data.filter(entry => {
          return !(entry.resolved);
        });
        this.setState({ messes: messes })
      })
      .catch(err => console.log(err));
  }

  loadImage = mess => {
    if (mess.imageMess) {
      const imageBuffer = mess.imageMess.data;
      const convertStoredImage = imageBuffer.map(part =>
        String.fromCharCode(part));
      const imageString = convertStoredImage.join('');
      return imageString;
    } else {
      return `${window.location.origin}/images/man_in_trash.jpg`
    }
  }

  render() {
    return (
      <div>
        <MapApp />
        {this.state.messes.map(mess => (
          <Link to={"/clean/" + mess._id}>
            <Mess
              key = {mess._id}
              className = "messes"
              id = {mess._id}
              image = {this.loadImage(mess)}
              title = {mess.title}
              location = {mess.location}
              levelOfConcern = {mess.levelOfConcern}
              description = {mess.description}
              timestamp = {mess.timestampReport}
              sensitive = {mess.sensitive}
              onChange = {this.handleView}
              // resolved = {mess.resolved}
            />
          </Link>
        ))}
      </div>
    );
  }
};

export default Global;