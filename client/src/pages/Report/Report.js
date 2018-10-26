import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";

import { Input, TextArea, FormBtn } from "../../components/Form";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import WebCamModal from '../../components/WebCamModal';


class Report extends Component {
  state = {
    category: "Report Mess",
    title: "",
    location: "",

    levelOfConcern: "",
    description: "",
    sensitive: "",
    lat: "",
    lng: "",
    show: false
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
  };

  handleInputChange = event => {

    event.preventDefault();
    console.log(event)
    // const { name, value } = event.target;
    // this.setState({
    //   [name]: value
    // });

  };

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
        lng: this.state.lng
      })
        .then(res => window.location.replace("/"))
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  showModal = event => {
    event.preventDefault();
    console.log("state show ", this.state.show);
    this.setState({
      show: true
    });
  }

  hideModal = event => {
    event.preventDefault();
    console.log("state show ", this.state.show);
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div>
        <Container
          category={this.state.category}
        >
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
              ></WebCamModal>
            </div>

            <div>Level of concern
            <RadioGroup onChange={this.handleInputChange} horizontal
                value={this.state.levelOfConcern || ""}>
                <RadioButton
                  name="levelOfConcern"
                  className="rButton"
                  value="bad"
                  checked={this.state.levelOfConcern === "bad"}

                >
                  It is unsightly.
                </RadioButton>
                <RadioButton
                  name="levelOfConcern"
                  className="rButton"
                  value="disgusting"
                  checked={this.state.levelOfConcern === "disgusting"}

                >
                  It is disgusting.
                </RadioButton>
                <RadioButton
                  name="levelOfConcern"
                  className="rButton"
                  value="terrible"
                  checked={this.state.levelOfConcern === "terrible"}
                >
                  It's revolting.
                </RadioButton>

              </RadioGroup>
            </div>Are there sensitive materials?
            <RadioGroup onChange={this.handleInputChange} horizontal
              value={this.state.sensitive || ""}>
              <RadioButton
                name="sensitive"
                className="rButton"
                value="no"
                checked={this.state.sensitive === "no"}

              >
                No
                </RadioButton>
              <RadioButton
                name="sensitive"
                className="rButton"
                value="Yes"
                checked={this.state.sensitive === "Yes"}

              >
                Yes
                </RadioButton>
              <RadioButton
                name="sensitive"
                className="rButton"
                value="biohazard"
                checked={this.state.sensitive === "biohazard"}

              >
                There are biohazardous materials (used needles/syringes.)
                </RadioButton>

            </RadioGroup>

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

export default Report;