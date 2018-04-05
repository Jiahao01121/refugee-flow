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
        font-family: 'Roboto';
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
        text-decoration: none;
        padding-left: 30px;
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
            <Link to='/war'>War</Link>
            <Link to='/route'>Route</Link>
            <Link to='/about'>About</Link>
          </Nav>
        </NavbarContainer>
    )
  }

}
export default Navbar;
