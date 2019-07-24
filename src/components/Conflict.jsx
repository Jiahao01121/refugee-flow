import React from 'react';
import * as _ from 'underscore';
import * as d3 from 'd3';

import GlobeContainer from './globe/GlobeContainer';
import AsyApplicationContainer from './asylumApplication/AsyApplicationContainer';
import Annotation from './Annotation';

export default class Conflict extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stillLoading: true };

    this.loadingManager = this.loadingManager.bind(this);
  }

  evokePrompt = _.once(() => {
    !this.state.stillLoading && _.delay(() =>
      d3.select('.annotation-wrapper').style('display','block').style('opacity','1')
    , 2000 )
  })

  loadingManager(boolean){
    this.setState({ stillLoading: boolean});
  }

  render() {

    return (
      <div>
        { (() => !this.state.stillLoading && this.evokePrompt() )() }
        <Annotation />
        <GlobeContainer
          loadingManager={this.loadingManager}
          history={this.props.history}
        />
        <AsyApplicationContainer
          loadingManager={this.state.stillLoading}
        />
      </div>
    )
  }
}
