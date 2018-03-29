import React from 'react';
import './App.css';
import * as THREE from 'three';
import * as d3 from 'd3';


import Simple from '../Simple/Simple';
import GlobeVisual from '../GlobeVisual/GlobeVisual';

var data = require('../GlobeVisual/t')



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
      },
      format: 'legend',
      name: null,
      animated: true

    }

  }
  componentDidMount(){



      const data_dict = data.map( (d) =>d[0] );


      for (let i=0;i<data.length;i++) {

        // TODO: data (fetched from API)
        // data add here
        this.gv.addData(data[i][1], {format: 'legend', name: data[i][0], animated: true} );
        // TODO interactive between data
        //addEventListener
        // $('#year'+data[i][0]).mouseover(data_transition(i));
      }

      this.gv.createPoints(data);

      this.gv.animate();

  }

  render() {
    console.count("---------- App's render called");

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
              colorFn : this.state.colorFn,
              format: this.state.format,
              name: this.state.name,
              animated: this.state.animated,
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
