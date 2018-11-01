import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Input, TextArea, FormBtn } from "../../components/Form";

class ReportSyringe extends Component {
  state = {
    category: "Report a Syringe to SF 311",
    location: "",
    dexcription: ""
  }

  handleInputChange = event => {
    event.preventDefault();
    // console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  submitSF311 = event => {
    event.preventDefault();
    console.log("inside submitSF311");
    //if (this.state.sensitive === "yes") {
    API.submit311({
      location: this.state.location,
      description: this.state.description
    })
      .then(res => console.log(res))
      .then(res => window.location.replace("/user/" + this.state.userToken))
      .catch(err => console.log(err));
    //}
  }

  backToReport = event => {
    event.preventDefault();
    window.history.back();
  }

  render() {
    return (
      <div>
        <Container category={this.state.category}>
          <form>
            <button className="btn btn-outline-success btn-block" onClick={this.backToReport}>
              Go back to general report page.
            </button>
            <br></br>
            <Input
              value={this.state.location}
              onChange={this.handleInputChange}
              name="location"
              placeholder="Location/Address (Required)"
            ></Input>
            <TextArea
              value={this.state.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Description (Optional)"
            ></TextArea>
            <FormBtn
              disabled={!(this.state.location)}
              onClick={this.submitSF311}
            >
              Send to SF311
              </FormBtn>
          </form>
        </Container>
      </div >
    );
  }
}

export default ReportSyringe;