import React, { Component } from 'react'
import LandingPage from '../stylesheets/LandingPage.css'

export default class Landing extends Component {
  render() {
    return(
      <div>
        <h1>"The world is in much greater disarray than it was during the Cold War, in the Cold War,
          the world had two fundamental concentrations of power in the United States and the Soviet Union,
          and both respective alliance-systems. We understood how to avoid direct confrontation,
          because anything might lead to nuclear escalation, and we have formal or informal roles. Well,
          now is anything but. We have power much more widely distibuted in the world, plus we have globalization."
          <span> -- Richard Haass, Vice Interview, Oct 2017</span>
        </h1>
        <div>
          <ul className='side-links'>
            <li><a href="https://www.behance.com" target="_blank">Behance</a></li>
            <li><a href="https://www.behance.com" target="_blank">Behance</a></li>
            <li><a href="https://www.github.com" target="_blank">Github</a></li>
          </ul>
        </div>
        <video autoPlay loop id="videoBackground" muted plays-inline>
          <source src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>
    )
  }
}
