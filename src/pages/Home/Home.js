import React, { Component } from "react";
import Header from "../../components/Header";


class Home extends Component {
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

export default Home;