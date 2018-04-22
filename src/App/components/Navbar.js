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

      > a{
        font-family: 'Miller-DisplaySC';
        font-size: 20px;
        color: white;
        text-decoration: none;
        padding-left: 30px;
        position: relative;
        top: -4px;
      }

      > a:first-child:before{
        content: 'A comparitive study on wars and refugee flow';
        font-family: 'Roboto';
        font-weight: 500;
        color: white;
        opacity: .5;
        font-size: 12px;
        position: absolute;
        left: 30px;
        width: 190%;
        bottom: -38px;
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
          <Link to='/'>refugee flow</Link>
          <Nav>
            <Link to='/war'>War</Link>
            <Link to='/route'>Route</Link>
            <Link to='/about'>About</Link>
          </Nav>
        </NavbarContainer>
    )
  }

}
export default Navbar;
