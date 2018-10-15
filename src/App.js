import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Authentication from "./pages/Authentication";
import Clean from "./pages/Clean";
import Global from "./pages/Global";
import Report from "./pages/Report";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <div>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/authentication" component={Authentication} />
          <Route exact path="/clean" component={Clean} />
          <Route exact path="/global" component={Global} />
          <Route exact path="/report" component={Report} />
        </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
