import React from 'react';
import './App.css';
import * as THREE from 'three';

import Simple from '../Simple/Simple';
import GlobeVisual from '../GlobeVisual/GlobeVisual';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      color: new THREE.Color(0xffffff),
      imgDir: './globe/',
      colorFn: (x) => {
        const c = new THREE.Color();
        c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
        // console.log(c);
        return c;
      }
    }

  }
  componentDidMount(){

  }

  render() {
    // console.log("change state rendered");
    return (
      <div>
        <div className = 'container' onClick={()=>{
        //   this.setState({
        //   color: new THREE.Color(0x6BB32E)
        // })
        this.setState({colorFn: 10})
      }}>
          <Simple ss={this.state.color} />
        </div>

        <div className = 'globe'>
          <GlobeVisual
            opts = {{
              imgDir : this.state.imgDir,
              colorFn : this.state.colorFn
            }}
            // using ref to accsss method from GlobeVisual
            ref = {(gv) => this.gv = gv}
          />
        </div>

      </div>
    );
  }
}

export default App;
