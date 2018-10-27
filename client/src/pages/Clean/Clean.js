import React, { Component } from "react";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
import API from "../../utils/API";
// import Modal from "../../components/Modal";
import WebCamModal from "../../components/WebCamModal";

class Clean extends Component {

  state = {
    show: false,
    mess: {},
    imageTaken: {},
    imageCapture: {}, 
    cameraOn: false
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

  startCamera = event => {
    event.preventDefault();
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

  takePhoto = event => {
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
        this.setState({ imageTaken: image });
        console.log("this.state.imageTaken ", this.state.imageTaken);
      })
      .catch(error => console.log(error));
  }

  drawCanvas = (canvas, img) => {
    //canvas.getContext('2d').clearRect(200,200,300,250);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, 330, 335);
  }

  loadImage = (mess) => {
    console.log("inside loadImage, mess ", mess);
    if (mess.image) {
      const imageBuffer = mess.image.data;
      const convertStoredImage = imageBuffer.map(part =>
        String.fromCharCode(part));
      const imageString = convertStoredImage.join('');
      return imageString;
    } else {
      return "../../images/man_in_trash.jpg"
    }
  }

  render() {
    return (
      <div>
        <MapApp />
        <Mess
          // showModal= {this.showModal.bind(this)}
          key={this.state.title}
          id={this.state.mess._id}
          //image = {this.loadImage(this.state.mess.image)}
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
            cameraOn={this.state.cameraOn}
            takePhoto={this.takePhoto}
            savePhoto={this.savePhoto}
            startCamera={this.startCamera}
          ></WebCamModal>
        </div>
      </div>

    );
  }
}

export default Clean;