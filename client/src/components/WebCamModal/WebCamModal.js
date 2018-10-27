import React from 'react';
import "./WebCamModal.css";


class WebCamModal extends React.Component {

  state = {
    cameraOn: false,
    imageCapture: {},
    imageTaken: {},
    imageLoaded: {}
  }

  render() {
    //console.log("this.props.show", this.props.show);
    if (this.props.show) {
      if (this.props.cameraOn === false) {
        this.props.startCamera()
      }
      return (
        <div className = {this.props.show ? "modal display-block" : "modal display-none"} style={{display:"block"}}>
          <section className="modal-main">
            <div>
              <video
                ref={(stream) => { this.videoStream = stream }}
              ></video>
            </div>
            <div id="takeImage">
              <canvas 
                width='300'
                height='400'
                id="takePhotoCanvas"
                ref={(canvas) => { this.canvas = canvas }}
              ></canvas>
              <button id="takePhotoButton" onClick={this.props.takePhoto}>Take Photo</button>
              <button id="saveAndCloseButton" onClick={this.props.handleClose}>Save Photo and Close</button>
            </div>
          </section>
        </div>
      )
    } else { return null;}
  }
};
  
export default WebCamModal;