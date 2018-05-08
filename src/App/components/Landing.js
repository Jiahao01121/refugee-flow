import React, { Component } from 'react'
import LandingPage from '../stylesheets/LandingPage.css'

export default class Landing extends Component {
  render() {
    return(
      <div className='container'>
        <div className='mid'>
          {/* <ul className='links'>
            <li><a href="https://www.behance.com" target="_blank">Behance</a></li>
            <li><a href="https://www.github.com" target="_blank">Github</a></li>
          </ul> */}
          <h1>"The world is in much greater disarray than it was during the Cold War, in the Cold War,
            the world had two fundamental concentrations of power in the United States and the Soviet Union,
            and both respective alliance-systems. We understood how to avoid direct confrontation,
            because anything might lead to nuclear escalation, and we have formal or informal roles. Well,
            now is anything but. We have power much more widely distibuted in the world, plus we have globalization."
            <span> -- Richard Haass, Vice Interview, Oct 2017</span>
          </h1>
          <div class="main-nav">
            <ul className='side-links'>
              <li><a href="https://www.behance.com" target="_blank">Behance</a></li>
              <li><a href="https://www.behance.com" target="_blank">Behance</a></li>
              <li><a href="https://www.github.com" target="_blank">Github</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
