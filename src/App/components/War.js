import React from 'react'
import { Route, Link } from 'react-router-dom'

import GlobeContainer from './GlobeContainer'
import AsyApplicationContainer from './AsyApplicationContainer'

export default class War extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentYear: 0
    }

    this.changeYearManager = this.changeYearManager.bind(this);
  }

  changeYearManager(year){
    this.setState({
      currentYear: year
    })
  }

  render() {
    return(
      <div>
        <GlobeContainer changeYearManager = {this.changeYearManager}/>
        <AsyApplicationContainer currentYear = {this.state.currentYear} />
      </div>
    )
  }
}
