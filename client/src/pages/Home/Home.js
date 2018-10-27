import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../../components/Header";
import Mess from "../../components/Mess";
// import messes from "../../messes.json"

class Home extends Component {
  state = {
    messes: []
  };

  componentDidMount() {
    this.loadMesses();
  };

  loadMesses = () => {
    API.getMesses()
      .then(res => {
        //console.log(res)
        this.setState({ messes: res.data })
      })
      .catch(err => console.log(err));
  };

  loadImage = (mess) => {
    //console.log("inside loadImage mess ", mess);
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
        <Header />
        {this.state.messes.map(mess => (
          <Mess
            key={mess.title}
            image = {this.loadImage(mess)}
            title={mess.title}
            location={mess.location}
            levelOfConcern={mess.levelOfConcern}
            description={mess.description}
            timestamp={mess.timestampReport}
            sensitive={mess.sensitive}
          // resolved = {mess.resolved}
          />
        ))}
      </div>
    );
  }
}

export default Home;