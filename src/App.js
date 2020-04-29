import React from "react";
import "./CSS/App.css";
import AuthenticationPage from "./components/auth/authenticationPage";
import HomePage from './components/dashboard/homePage'
import {Route} from "react-router-dom"
import PrivateRoute from "./components/configurations/privateRoute";

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <PrivateRoute
            exact
            path="/"
            component={HomePage}
          />
      <Route path="/auth" component={AuthenticationPage}/>
       
      </div>
    </div>
  );
}

export default App;
