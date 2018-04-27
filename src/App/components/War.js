import React from 'react'
import { Route, Link } from 'react-router-dom'

import GlobeContainer from './GlobeContainer'
import AsyApplicationContainer from './AsyApplicationContainer'

export default class War extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentYear: 0,
      stillLoading: true
    }

    this.changeYearManager = this.changeYearManager.bind(this);
    this.loadingManager = this.loadingManager.bind(this);
  }

  changeYearManager(year){
    this.setState({
      currentYear: year
    })
  }

  loadingManager(boo){
    console.log('manager called!');
    console.log(boo);
    this.setState({
      stillLoading: boo
    })
  }

  render() {
    return(
      <div>
        <GlobeContainer changeYearManager = {this.changeYearManager}
          loadingManager = { this.loadingManager }
        />
        <AsyApplicationContainer currentYear = {this.state.currentYear}
          loadingManager = { this.state.stillLoading }
        />
      </div>
    )
  }
}
