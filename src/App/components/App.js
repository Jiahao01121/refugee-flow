import React from 'react';
import '../stylesheets/App.css';
import * as THREE from 'three';
import * as d3 from 'd3';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Globe from './Globe'




class App extends React.Component {
  render(){
    console.count("---------- App's render called");

    return (
            <Router>
              <div>
                <Navbar />
                <Globe /> 
              </div>
            </Router>
            
    );
  }
}

export default App;
