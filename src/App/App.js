import React from 'react';
import './App.css';
import * as THREE from 'three';
import * as d3 from 'd3';

import Globe from '../Globe/Globe';



class App extends React.Component {
  // constructor(props){
    // super(props)

  // }

  render(){
    console.count("---------- App's render called");

    return (
            <Globe />
    );
  }
}

export default App;
