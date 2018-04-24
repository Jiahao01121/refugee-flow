import React from 'react'
import { Route, Link } from 'react-router-dom'

import GlobeContainer from './GlobeContainer'
import GlobeRightSection from './GlobeRightSection'

export default class War extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentYear: 0
    }

    this.changeYearManager = this.changeYearManager.bind(this);
  }

  changeYearManager(year){
    console.log(this);
    this.setState({
      currentYear: year
    })
  }

  render() {
    console.log("rendered!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(this.state);
    return(
      <div>
        <GlobeContainer changeYearManager = {this.changeYearManager}/>
        <GlobeRightSection currentYear = {this.state.currentYear} />
      </div>
    )
  }
}
