import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Input, TextArea, FormBtn, Option } from "../../components/Form";


class Report extends Component {
  state = {
    category: "Report Mess",
    title:"",
    location:"",
    levelOfConcern:"",
    description:""
    // sensitive:""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Reported!")
    if (this.state.title && this.state.location) {
      API.saveMess({
        title: this.state.title,
        location: this.state.location,
        levelOfConcern: this.state.levelOfConcern,
        description: this.state.description
      })
        .then(res => this.loadMesses())
        .catch(err => console.log(err));
    }
  };

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
            <Input
              value={this.state.levelOfConcern}
              onChange={this.handleInputChange}
              name="levelOfConcern"
              placeholder="Level of Concern (Optional)"
            />
            <TextArea
              value={this.state.description}
              onChange={this.handleInputChange}
              name="description"
              placeholder="Description (Optional)"
            />
            {/* <Option
              value={this.state.sensitive}
              onChange={this.handleInputChange}
              name="sensitive"
              placeholder="Hazardous Needle (Optional)"
            /> */}
            <FormBtn
              disabled={!(this.state.title && this.state.location)}
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