import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Input, TextArea, FormBtn } from "../../components/Form";
import WebCamModal from '../../components/WebCamModal';
import { Link } from "react-router-dom";

class Report extends Component {
  state = {
    category: "Report a Mess!",
    title: "",
    location: "",
    levelOfConcern: "",
    description: "",
    syringe: false,
    lat: "",
    lng: "",
    show: false,
    imageTaken: {},
    imageCapture: {},
    cameraOn: false,
    userToken: ""
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
       // Code to Bypass Geolocation
      // }, () => {
      //   fetch('https://ipapi.co/json')
      //     .then(res => res.json())
      //     .then(location => {
      //       this.setState({
      //       lat: location.latitude,
      //       lng: location.longitude
      //       })
      //         .then(console.log(this.geoL));
      //     })
    });
    console.log(this.props.match.params.id);
    this.setState({
      userToken: this.props.match.params.id
    });
  }

  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Reported!")
    if (this.state.title && this.state.location && this.state.levelOfConcern) {
      API.saveMess({
        title: this.state.title,
        location: this.state.location,
        levelOfConcern: this.state.levelOfConcern,
        description: this.state.description,
        sensitive: this.state.sensitive,
        lat: this.state.lat,
        lng: this.state.lng,
        imageMess: this.state.imageTaken,
        timestampReport: Date.now,
        reportedUser: this.props.match.params.id
      })
        .then(res => console.log(res))
        .then(res => window.location.replace("/user/" + this.state.userToken))
        .catch(err => console.log(err));
    }
  }

  showModal = event => {
    event.preventDefault();
    //console.log("state show ", this.state.show);
    this.setState({
      show: true
    });
  }

  hideModal = event => {
    event.preventDefault();
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

  render() {
    return (
      <div>
        <Container
          category={this.state.category}
        >
          <Link to={"/311"}>
            <button className="btn btn-outline-danger btn-block"
            type="submit">Is it a syringe? Click here</button>
          </Link>
          <br></br>
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title (Required)"
            />
            <Input
              value={this.state.location}
              onChange={this.handleInputChange}
              name="location"
              placeholder="Location (Required)"
            />
            <div>
              <button className="btn btn-outline-success btn-block" id="showModal" onClick={this.showModal}>Take Picture of that mess!</button>
              <WebCamModal
                show={this.state.show}
                handleClose={this.hideModal}
                cameraOn={this.state.cameraOn}
                takePhoto={this.takePhoto}
                savePhoto={this.savePhoto}
                startCamera={() => this.startCamera()}
              ></WebCamModal>
            </div>
            <br></br>
            <Input
              value={this.state.levelOfConcern}
              onChange={this.handleInputChange}
              name="levelOfConcern"
              placeholder="Level of Concern (Required)"
            />
            <TextArea
              value={this.state.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Description (Optional)"
            />
            <FormBtn
              disabled={!(this.state.title && this.state.location && this.state.levelOfConcern)}
              onClick={this.handleFormSubmit}
            >
              Report Mess
            </FormBtn>
          </form>
        </Container>
      </div>
    );
  }
}


export default Report;