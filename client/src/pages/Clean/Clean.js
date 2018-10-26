import React, { Component } from "react";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
import API from "../../utils/API";
// import Modal from "../../components/Modal";
import WebCamModal from "../../components/WebCamModal";

class Clean extends Component {

  state = {
    show: false,
    mess: {}
  };



  componentDidMount() {
    API.getMess(this.props.match.params.id)
      .then(res => this.setState({ mess: res.data }))
      .catch(err => console.log(err));
  }

  showModal = () => {
    console.log("state show ", this.state.show);
    this.setState({
      show: true
    });
  }

  hideModal = () => {
    console.log("state show ", this.state.show);
    this.setState({
      show: false
    });
  }


  render() {
    return (
      <div>
        <MapApp />
        <Mess
          // showModal= {this.showModal.bind(this)}
          key={this.state.title}
          id={this.state.mess._id}
          // image = {mess.image}
          title={this.state.mess.title}
          location={this.state.mess.location}
          levelOfConcern={this.state.mess.levelOfConcern}
          description={this.state.mess.description}
          timestamp={this.state.mess.timestamp}
          sensitive={this.state.mess.sensitive}
        // resolved = {mess.resolved}
        />
        <div>
          <span>Great Job! Take a picture of the clean spot!   </span>
          <button id="showModal" onClick={this.showModal}>Take Picture</button>
          <WebCamModal
            show={this.state.show}
            handleClose={this.hideModal}
          ></WebCamModal>
        </div>
      </div>

    );
  }
}

export default Clean;