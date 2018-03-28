import React from 'react';
import './App.css';
import * as THREE from 'three';

import Simple from '../Simple/Simple';
import GlobeVisual from '../GlobeVisual/GlobeVisual';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      color: new THREE.Color(0xffffff)
    }
  }
  render() {
    console.log("change state rendered");
    return (
      <div>
        <div className = 'container' onClick={()=>{ this.setState({
          color: new THREE.Color(0x6BB32E)
        }) }}>
          <Simple ss={this.state.color} />
        </div>

        <div className = 'globe'>
          <GlobeVisual />
        </div>

      </div>
    );
  }
}

export default App;
