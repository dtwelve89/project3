import React, { Component } from "react";
import API from "../../utils/API";
// import Header from "../../components/Header";
import MapApp from "../../components/Maps";
import Mess from "../../components/Mess";
import { Link } from "react-router-dom";

class Global extends Component {
  state = {
    messes: []
  };

  componentDidMount() {
    this.loadMesses();
  };

  loadMesses = () => {
    API.getMesses()
      .then(res =>
        // console.log(res)
        this.setState({ messes: res.data })
      )
      .catch(err => console.log(err));
  };

  //Handles Mess View
  // handleView = id => {
  //   let url = "/clean?id="+ id;
  //   window.location.replace(url);
  // };

  // To find messes 'not yet cleaned' we can map / filter messes from the 'Messes' model/schema against 'Mess ID's from the 'cleaned_messes' model/schema. Really not too sure how to do this in React just yet but can talk to Tutor (not til weds tho)

  // Not totally confident on the Maps functionality yet, so would like to talk this through with someone in the group who has used this on  a previous project. It would probably be a 'nicer' layout / user experience to have the current uncleaned messes show on a map, which could be clicked into.  (so top 1/2 of screen would be map showing 5-10 'close' messes, bottom 1/2 of screen would be list of those messes that can be clicked on for more info/cleaning page)

  // Pseudocode ==>
  // Get user's location (using device's GPS signal? or give option to enter zip code if not convenient) and render Map with AJAX request for user's current area (1 mile radius?)
  // Filter/map 'Uncleaned Messes' using models process described above in comments, using tables 'Messes' and 'Cleaned_Messes'.  ==> Limit to 5 (most optimally would be based on closest location, but we could also list by date added for MVP purposes if location is too tough)
  // Use location data for the 'Uncleaned Messes' to generate points on Map on screen
  // Show 'Title, Category, Date/time, and Location' for each of the selected Uncleaned Messes in the 'Bottom half list' on the page

  render() {
    return (
      <div>
        <MapApp />
        {this.state.messes.map(mess => (
          <Link to={"/clean/" + mess._id}>
            <Mess
              key = {mess.title}
              id = {mess._id}
              // image = {mess.image}
              title = {mess.title}
              location = {mess.location}
              levelOfConcern = {mess.levelOfConcern}
              description = {mess.description}
              timestamp = {mess.timestamp}
              sensitive = {mess.sensitive}
              onChange = {this.handleView}
              // resolved = {mess.resolved}
            />
          </Link>
        ))}
      </div>
    );
  }
};
  
  // After 'mapping/filtering' out the uncleaned messes, we can go ahead and sort based on either location or time (might be easier for MVP), then run a loop (or some other React-friendly concept) to repeat this for the top 5-10 responses. For each of the messes we are displaying on the page, we would want to show the limited info below, in addition to providing  a link to click through to the 'clean' page (at the bottom)

export default Global;