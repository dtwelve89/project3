import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";


class Home extends Component {
  state = {
    test:0
  };

  render() {
    return (
      <div>
        <Navbar />
        <Header />
      </div>
    );
  }
}

export default Home;