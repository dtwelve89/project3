import React, { Component } from "react";
import Header from "../../components/Header";
import Mess from "../../components/Mess";
import messes from "../../messes.json"

class Home extends Component {
  state = {
    messes: messes,
    test:0
  };

  render() {
    return (
      <div>
        <Header />
        {this.state.messes.map(mess => (
          <Mess
            key = {mess.title}
            image = {mess.image}
            description = {mess.description}
            title = {mess.title}
            location = {mess.location.street}
            date = {mess.timestamp}
            sensitive = {mess.sensitive}
            resolved = {mess.resolved}
          />
        ))}
      </div>
    );
  }
}

export default Home;