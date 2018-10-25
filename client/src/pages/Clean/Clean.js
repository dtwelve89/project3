import React, { Component } from "react";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";

//import messes from "../../messes.json";
import API from "../../utils/API";
import Modal from "../../components/Modal";



class Clean extends Component {
  state = {
    show: false,
    messes: [],
    resolved: ""
    };

componentDidMount() {
  this.loadMesses();
}
//loads messages
loadMesses = () => {
  API.getMesses()
  .then(res =>
    this.setState({ messes: res.data, resolved: "" }))
}

//shows modal when view mess button is pressed
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
        
        {this.state.messes.map(mess => (
          <Mess
            showModal = {this.showModal.bind(this)}
            key = {mess.title}
            image = {mess.image}
            id = {mess._id}
            description = {mess.description}
            title = {mess.title}
            location = {mess.location}
            levelofConcern = {mess.levelofConcern}
            sensitive = {mess.sensitive}
            resolved = {mess.resolved}
          />
          
        ))}
        
        <Modal 
          onClose={this.showModal}
          show={this.state.show}>
          Hello Modal!! Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah, Blah
        </Modal>
      </div>
      
    );
  }
}

export default Clean;