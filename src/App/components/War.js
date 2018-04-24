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
  }

  render() {
    return(
      <div>
        <GlobeContainer />
        <GlobeRightSection />
      </div>
    )
  }
}
