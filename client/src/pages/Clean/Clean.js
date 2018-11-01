import React, { Component } from "react";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
import API from "../../utils/API";
// import Modal from "../../components/Modal";
import WebCamModal from "../../components/WebCamModal";
import Container from "../../components/Container";
import { FormBtn, TextArea} from "../../components/Form";

class Clean extends Component {

  state = {
    category: "Cleaned that Mess!",
    comment: "",
    show: false,
    mess: {},
    imageTaken: {},
    imageCapture: {}, 
    cameraOn: false,
    imageLoaded: {},
    className: "messes"
  };

  componentDidMount() {
    API.getMess(this.props.match.params.id)
    .then(res => this.setState({ mess: res.data }))
    .then(() => this.loadImage())
    .catch(err => console.log(err));
  }

  // Functions for camera
  showModal = () => {
    //console.log("state show ", this.state.show);
    this.setState({
      show: true
    });
  }

  hideModal = () => {
    //console.log("state show ", this.state.show);
    this.setState({
      show: false
    });
  }

  startCamera = () => {
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
        //console.log("this.state.imageTaken ", this.state.imageTaken);
      })
      .catch(error => console.log(error));
  }

  drawCanvas = (canvas, img) => {
    //canvas.getContext('2d').clearRect(200,200,300,250);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, 330, 335);
  }

  loadImage = () => {
    //console.log("this.state.mess.image", this.state.mess.image);
    if (this.state.mess.imageMess) {
      const imageBuffer = this.state.mess.imageMess.data;
      const convertStoredImage = imageBuffer.map(part =>
        String.fromCharCode(part));
      const imageString = convertStoredImage.join('');
      this.setState({imageLoaded : imageString});
    } else {
      this.setState({imageLoaded: `${window.location.origin}/images/man_in_trash.jpg` }) 
    }
  }

  //Function for Form
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Reported as clean!")
    this.setState({
      className: "resolvedMess"
    })
    if (this.state.imageTaken) { 
      API.updateMess({
        id: this.state.mess._id,
        resolved: true,
        commentCleaned: this.state.comment,
        imageCleaned: this.state.imageTaken,
        timestampCleaned: Date.now()
      })
        .then(res => console.log(res))
        .then(res => window.location.replace("/user/"))
        .catch(err => console.log(err));
    }
  }

  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <MapApp />
        <Mess
          key={this.state.mess._id}
          id={this.state.mess._id}
          className={this.state.className}
          image = {this.state.imageLoaded}
          title={this.state.mess.title}
          location={this.state.mess.location}
          levelOfConcern={this.state.mess.levelOfConcern}
          description={this.state.mess.description}
          timestamp={this.state.mess.timestampReport}
          startCamera={() => this.startCamera()}
          //resolved = {this.state.mess.resolved}
        />
        <div>
          <Container
            category={this.state.category}
          >
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
          <br></br><br></br>
          <TextArea
              value={this.state.comment}
              onChange={this.handleInputChange}
              name="comment"
              placeholder="Comment (Optional)"
          >
          </TextArea>
          <FormBtn
              // disabled={!(this.state.imageCleaned)}
              onClick={this.handleFormSubmit}
            >
              Cleaned Mess!
            </FormBtn>
          </Container>
        </div>
      </div>
    );
  }
}

export default Clean;