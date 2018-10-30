import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Input, TextArea, FormBtn } from "../../components/Form";
import WebCamModal from '../../components/WebCamModal';

class Report extends Component {
  state = {
    category: "Report Mess",
    title: "",
    location: "",
    levelOfConcern: "",
    description: "",
    sensitive: "",
    syringe: false,
    lat: "",
    lng: "",
    show: false,
    imageTaken: {},
    imageCapture: {}, 
    cameraOn: false,
    userToken: ""
  };

  // getPosition() {
  //   // Simple wrapper
  //   return new Promise((res, rej) => {
  //     navigator.geolocation.getCurrentPosition(res, rej);
  //   })
  //   // .then(console.log(res));
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
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
    if (this.state.title && this.state.location && this.state.levelOfConcern && this.state.sensitive) {
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
        reportedUser: this.props.match.params.id // user identifier
      })
        .then(res => console.log(res))
        .then(res => window.location.replace("/user/" + this.state.userToken))
        .catch(err => console.log(err));
    }
  }

  handleSyringe = event => {
    event.preventDefault();
    // API.reverseGeocode({
    //   lat: this.state.lat, 
    //   long: this.state.lng
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    this.setState({
      syringe: true,
      category: "Report to SF 311"
    })
  }

  submitSF311 = event => {
    event.preventDefault();
    console.log("inside submitSF311");
    //if (this.state.sensitive === "yes") {
    API.submit311({
      url: this.state.url,
      searchInputId: this.state.searchInputId
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    //}
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
    if (this.state.syringe) {
      return (
        <div>
          <Container
            category={this.state.category}
          >
            <form>
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"
              ></Input>
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              ></TextArea>
              <FormBtn
                //disabled={!(this.state.sensitive)}
                onClick={this.submitSF311}
              >
                Send to SF311
              </FormBtn>
            </form>
          </Container>
        </div >
      )
    } else {
      return (

        <div>
          <Container
            category={this.state.category}
          >
            <button id="syringe" onClick={this.handleSyringe}>It's a syringe!</button>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"
              />
              <div>
                <span>Take a picture of that mess!  </span>
                <button id="showModal" onClick={this.showModal}>Take Picture</button>
                <WebCamModal
                  show={this.state.show}
                  handleClose={this.hideModal}
                  cameraOn={this.state.cameraOn}
                  takePhoto={this.takePhoto}
                  savePhoto={this.savePhoto}
                  startCamera={() => this.startCamera()}
                ></WebCamModal>
              </div>
              <Input
                value={this.state.levelOfConcern}
                onChange={this.handleInputChange}
                name="levelOfConcern"
                placeholder="Level of Concern (Required)"
              />
              <Input
                value={this.state.sensitive}
                onChange={this.handleInputChange}
                name="sensitive"
                placeholder="Is this a sensitive item? (Required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.title && this.state.location && this.state.levelOfConcern && this.state.sensitive)}
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
}

export default Report;