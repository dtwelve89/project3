import React, { Component } from "react";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";


class Report extends Component {
  state = {
    title:"",
    location:"",
    description:"",
    levelOfConcern:""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveMess({
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
        levelOfConcern: this.state.levelOfConcern
      })
        .then(res => this.loadMesses())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
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
          <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
          <Input
            value={this.state.levelOfConcern}
            onChange={this.handleInputChange}
            name="levelOfConcern"
            placeholder="Level of Concern (Optional)"
          />
          <FormBtn
            disabled={!(this.state.title && this.state.location)}
            onClick={this.handleFormSubmit}
          >
            Report Mess
          </FormBtn>
        </form>
      </div>
    );
  }
}

export default Report;