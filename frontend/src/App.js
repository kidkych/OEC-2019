import React, { Component } from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Login from './Views/Login/Login'
import GenericDashboard from './Views/Dashboards/GenericDashboard/GenericDashboard'
import NurseDashboard from './Views/Dashboards/NurseDashboard/NurseDashboard';


class App extends Component {
  render() {
    return (
      // Test value; this will be replaced
      <NurseDashboard title="Nurse Dashboard" />
    );
  }
}

export default App;
