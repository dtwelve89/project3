import React, { Component } from "react";
import Header from "../../components/Header";


class Global extends Component {
  state = {
    test:0
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Global;