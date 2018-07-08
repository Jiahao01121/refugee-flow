import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  height: 40px;
  background: #2d2d4a;
  position: relative;
  box-shadow: inset 1px 12px 100px -1px rgb(13, 19, 25);
  z-index: 2;
  > a:first-child{
    font-family: 'Ubuntu', sans-serif;
    font-weight: 100;
    font-size: 15px;
    color: white;
    text-decoration: none;
    padding-left: 30px;
    position: relative;
    transition: all 200ms;
    top: 12px;
    &:hover{
      font-size: 20px;
      top: 9px;
      font-weight: 900;
    }
  }

  > a:first-child:before{
    content: 'A Comparitive Study on Conflicts and Refugee Movement';
    font-family: 'Roboto';
    font-weight: 400;
    color: white;
    opacity: ${props => props.hovered? 1: 0};
    transition: 400ms all;
    font-size: 10px;
    position: absolute;
    left: 30px;
    bottom: -38px;
    /* letter-spacing: 1.1px; */
    width: 50px;
    word-spacing: 3px;
  }

`

const Nav = styled.nav`
  position: relative;
  right: -20px;
  float: right;
  top: 50%;
  transform: translateY(-50%);
  > a {
    margin-right: 50px;
    font-family: 'Ubuntu';
    box-shadow: 0px 11px 21px -2px rgb(13, 19, 25);
    font-size: 10px;
    font-weight: 100;
    color: white;
    text-decoration: underline;
  }
`


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hovered: false
    }
  }

  render(){
    return (
      <NavbarContainer hovered={this.state.hovered}>
          <Link to='/'
            onMouseOver={() => this.setState({hovered: true})}
            onMouseOut={() => this.setState({hovered: false})}>
            Refugee Flow
          </Link>
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
