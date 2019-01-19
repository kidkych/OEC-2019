import React, { Component } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Login from './Views/Login/Login'
import GenericDashboard from './Views/Dashboards/GenericDashboard/GenericDashboard'


class App extends Component {
  render() {
    return (
      <Login/>
    );
  }
}

export default App;
