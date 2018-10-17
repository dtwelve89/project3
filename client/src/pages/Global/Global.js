import React, { Component } from "react";
import Header from "../../components/Header";


class Global extends Component {
  state = {
    messes: []
  };

  // need to return a list of current messes that exist/have been reported but not yet cleaned
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
        <Header />

        {/* Here we would want to render the map as the top of the screen based on users current location, then we would want to pull in the 'Uncleaned Messes' data via Model/Schema mapping/filtering options. */}


        {/* When the user clicks into any of the possible uncleaned messes (listed below the map, limited information showing), we want to then bring up the 'Clean' page, which will then allow a user to see all details re: the mess and mark the mess as 'clean' */}


        {/*     After 'mapping/filtering' out the uncleaned messes, we can go ahead and sort based on either location or time (might be easier for MVP), then run a loop (or some other React-friendly concept) to repeat this for the top 5-10 responses. For each of the messes we are displaying on the page, we would want to show the limited info below, in addition to providing  a link to click through to the 'clean' page (at the bottom) */}

        {/* {this.state.messes.map(messes => (
          <Mess
          key = {mess.title}
          image = {mess.imgurl}
          body = {mess.body}
          title = {mess.title}
          location = {mess.location.street}
          time = {mess.timestamp}
          sensitive = {mess.sensitive}
          // ^^^ should we include sensitive 'within' category? or have them be separate?
          category= {mess.category}
        />
        ))}

        <Link to="/clean" role="button" className="btn btn-link"> Clean this mess!
        </Link> */}
      </div>

      // link button below not in proper place, but proper syntax for MERN pages, and we will want to link to the cleaning page for each mess listed.
    
      /*  Not proper syntax below, but includes paramter for viewing a specific mess based on ID when you click on that mess to view more info/clean. */
      /* <Link to="/clean/{messID}" role="button" className="btn btn-link"> */
    );
  }
};


export default Global;