import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import { Input, TextArea, FormBtn} from "../../components/Form";


class Report extends Component {
  state = {
    category: "Report Mess",
    title:"",
    location:"",
    levelOfConcern:"",
    description:"",
    sensitive:""
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
    if (this.state.title && this.state.location && this.state.levelOfConcern && this.state.sensitive) {
      API.saveMess({
        title: this.state.title,
        location: this.state.location,
        levelOfConcern: this.state.levelOfConcern,
        description: this.state.description,
        sensitive: this.state.sensitive
      })
        .then(res => window.location.replace("/"))
        // .then(res => console.log(res))
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

export default Report;