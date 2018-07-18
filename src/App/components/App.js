import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import * as MobileDetect from 'mobile-detect';

import Navbar from './Navbar'
import ModalButton from './ModalButton'
import Landing from './Landing'
import Conflict from './Conflict'
import RefugeeRoute from './RefugeeRoute'
import AboutPage from './AboutPage'
import MobileWarning from './MobileWarning'

class App extends React.Component {

  render(){
    this.md = new MobileDetect(window.navigator.userAgent);

    injectGlobal`
      html  body {
        width: 100%;
        height: 100%;
        margin: 0;
        background-color: #000000;
        font-size: 100%;
        overflow-y: hidden;
        overflow-x: hidden;
      }
    `;

    let path = window.location.pathname;

    return (
      this.md.mobile() === null
        ? <Router>
            <div>
              {path === '/' ? "" : <Navbar /> }
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/conflict' component={Conflict} />
                <Route path='/route/:arg' component={RefugeeRoute} />
                <Route path='/about' component={AboutPage} />
              </Switch>
            </div>
          </Router>
        : <MobileWarning/>

    );
  }
}

export default App;
