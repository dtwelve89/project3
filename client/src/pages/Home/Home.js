import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../../components/Header";
import Mess from "../../components/Mess";
import { Link } from "react-router-dom";
// import messes from "../../messes.json"

class Home extends Component {
  state = {
    messes: [],
    resolvedMesses: []
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.loadMesses(this.props.match.params.id);
  }

  loadMesses = user => {
    API.getUserMesses(user)
      .then(res => {
        //console.log(res)
        const resolvedMesses = res.data.filter(entry => {
          // console.log("inside filter resolved");
          // console.log("entry ", entry);
          // console.log("entry.resolved ", entry.resolved);
          return entry.resolved;
        });
        //console.log("resolvedMesses ", resolvedMesses);
        const messes = res.data.filter(entry => {
          return !(entry.resolved);
        });
        //console.log("messes ", messes);
        this.setState({
          messes: messes,
          resolvedMesses: resolvedMesses
        });
        // console.log("this.state.messes ", this.state.messes);
        // console.log("this.state.resolvedMesses ", this.state.messes);
      })
      .catch(err => console.log(err));
  }

  loadImage = mess => {
    //console.log("inside loadImage mess ", mess);
    let image = {};
    if (mess.resolved) {
      //console.log("inside mess.resolved", mess.resolved);
      image = mess.imageCleaned;
    } else {
      image = mess.imageMess;
    }
    //console.log("image", image);
    if (image) {
      const imageBuffer = image.data;
      const convertStoredImage = imageBuffer.map(part =>
        String.fromCharCode(part));
      const imageString = convertStoredImage.join('');
      return imageString;
    } else {
      return `${window.location.origin}/images/man_in_trash.jpg`
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    window.location.replace("/report/user/" + this.props.match.params.id);
  }

  render() {
    return (
      <div id="homepage">
        <Header />
        <button className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.handleFormSubmit}
            >
            Report a Mess!
        </button>
        {this.state.messes.map(mess => (
          <Link to={"/clean/" + mess._id}>
            <Mess
              key={mess._id}
              className='messes'
              image={this.loadImage(mess)}
              title={mess.title}
              location={mess.location}
              levelOfConcern={mess.levelOfConcern}
              description={mess.description}
              timestamp={mess.timestampReport}
            />
          </Link>
        ))}
        <br></br>
        {this.state.resolvedMesses.map(resolvedMess => (
          <Mess
            key={resolvedMess._id}
            className='resolvedMess'
            image={this.loadImage(resolvedMess)}
            title={resolvedMess.title}
            location={resolvedMess.location}
            levelOfConcern={resolvedMess.levelOfConcern}
            description={resolvedMess.description}
            timestamp={resolvedMess.timestampReport}
          />
        ))}
        <br></br>
      </div>
    );
  }
}

export default Home;