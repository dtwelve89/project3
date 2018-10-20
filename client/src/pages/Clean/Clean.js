import React, { Component } from "react";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
//import messes from "../../messes.json";
import API from "../../utils/API";
// import Modal from "../../components/Modal";

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
  console.log('pressed 2')
  this.setState({
    ...this.state,
    show: !this.state.show
  });
}
 
  render() {
    return (
      <div>
        <MapApp />
          <Mess
            // showModal= {this.showModal.bind(this)}
            key = {this.state.title}
            id = {this.state.mess._id}
            // image = {mess.image}
            title = {this.state.mess.title}
            location = {this.state.mess.location}
            levelOfConcern = {this.state.mess.levelOfConcern}
            description = {this.state.mess.description}
            timestamp = {this.state.mess.timestamp}
            sensitive = {this.state.mess.sensitive}
            // resolved = {mess.resolved}
          />
        {/* <Modal 
          onClose={this.showModal}
          show={this.state.show}>
          Hello Modal!! Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah
        </Modal> */}
      </div>
      
    );
  }
}

export default Clean;