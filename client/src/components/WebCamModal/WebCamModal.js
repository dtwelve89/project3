import React from 'react';
import "./WebCamModal.css";
import API from "../../utils/API";


class WebCamModal extends React.Component {

  state = {
    cameraOn: false,
    imageCapture: {},
    imageTaken: {},
    imageLoaded: {}
  }
  
  startCamera = event => {
    //event.preventDefault();
    let imageCap = {};
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(mediaStream => {
        this.setState({
          cameraOn: true
        });
        const video = document.querySelector('video')
        video.srcObject = mediaStream;
        video.play();
        const track = mediaStream.getVideoTracks()[0];
        imageCap = new ImageCapture(track);
        this.setState({ imageCapture: imageCap });

      })
      .catch(error => console.log("An error occured! ", error));
  }

  onTakePhotoButtonClick(event) {
    event.preventDefault();
    this.state.imageCapture.takePhoto()
      .then(blob => {
        return createImageBitmap(blob);
      })
      .then(imageBitmap => {
        const canvas = document.querySelector('#takePhotoCanvas');
        this.drawCanvas(canvas, imageBitmap);
        const context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        const image = canvas.toDataURL('image/png', 0.1);
        this.setState({imageTaken: image});
      })
      .catch(error => console.log(error));
  }

  drawCanvas(canvas, img) {
    //canvas.getContext('2d').clearRect(200,200,300,250);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, 330, 335);
  }

  savePhoto(event) {
    event.preventDefault();
    if (this.state.imageTaken) {
      API.saveMess({
        title: "test image1",
        location: "test image1",
        levelOfConcern: "test image1",
        sensitive: "test image1",
        image: this.state.imageTaken //imageString
      })
    } else {
      console.log("this.state.imageTaken is null or undefined")
    }
  }

  render() {
    console.log("this.props.show", this.props.show);
    if (this.props.show) {
      if (this.state.cameraOn === false) {
      this.startCamera()
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
              <button id="takePhotoButton" onClick={this.onTakePhotoButtonClick.bind(this)}>Take Photo</button>
              <button id="savePhotoButton" onClick={this.savePhoto.bind(this)}>Save Photo</button>
              <button id="close" onClick={this.props.handleClose.bind(this)}>close</button>
            </div>
          </section>
        </div>
      )
    } else { return null;}
  }
};
  
export default WebCamModal;