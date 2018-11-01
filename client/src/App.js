import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Clean from "./pages/Clean";
import Global from "./pages/Global";
import Report from "./pages/Report";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Exterior from "./components/Exterior";
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer";
import ReportSyringe from "./pages/ReportSyringe";
import "./App.css";

const App = () => (
  <Router>
    <Exterior>
      <Navbar />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/:id" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/clean" component={Clean} />
          <Route exact path="/clean/:id" component={Clean} />
          <Route exact path="/global" component={Global} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/report/user/:id" component={Report} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/311" component={ReportSyringe} />
        </Switch>
      </Wrapper>
      <Footer />
    </Exterior>
  </Router>
);

export default App;
