import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

class Navbar extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const NavbarContainer = styled.div`
      line-height: 60px;
      background: #0C0C14;
      position: relative;
      box-shadow: 0px 5px 90px -1px rgba(0,0,0,1);
      z-index: 2;
      > a{
        font-family: 'Miller-DisplaySC';
        font-size: 20px;
        color: white;
        text-decoration: none;
        padding-left: 30px;
        position: relative;
        top: -10px;
      }

      > a:first-child:before{
        content: 'A Comparitive Study on Conflicts and Refugee Flows';
        font-family: 'Roboto';
        font-weight: 400;
        color: white;
        opacity: .5;
        font-size: 10px;
        position: absolute;
        left: 30px;
        bottom: -38px;
        /* letter-spacing: 1.1px; */
        width: 900%;
        word-spacing: 3px;
      }

    `

    const Nav = styled.nav`
      position: relative;
      right: 40px;
      float: right;
      > a {
          font-family: 'Roboto';
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          padding: 0 10px;
          text-decoration: none;
        }
    `

    return (
      <NavbarContainer>
          <Link to='/'>Refugee Flow</Link>
          <Nav>
            <Link to='/conflict'>Conflict</Link>
            <Link to='/route/EasternMediterranean'>Route</Link>
            <Link to='/about'>About</Link>
          </Nav>
        </NavbarContainer>
    )
  }

}
export default Navbar;
