import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  height: 40px;
  background: #2d2d4a;
  position: relative;
  box-shadow: inset 0px 11px 40px -11px rgba(0, 0, 0, 0.97);
  z-index: 2;
  transition: all 2000ms;

  &::before{
    content: '';
    width: ${props => props.loadBar ? '100%':'0%'};
    height: 4px;
    background: #00ffb0bd;
  ${'' /* second color choise:
          #bf4211
          #41edb8bd
  */}
    position: absolute;
    top: 0;
    transition: inherit;
  }

  > a:first-child{
    font-family: 'Ubuntu',sans-serif;
    font-weight: 900;
    font-size: 18px;
    color: white;
    text-decoration: none;
    padding-left: 30px;
    position: relative;
    transition: all 200ms;
    top: 9px;
    &:hover{
      filter: drop-shadow(0px 2px 5px #a2a2c9);

    }
  }

  > a:first-child:after{
    content: 'A Comparitive Study on Conflicts and Refugee Movement';
    font-family: 'Ubuntu';
    font-weight: 100;
    color: white;
    opacity: 0.4;
    transition: 400ms all;
    font-size: 11px;
    position: relative;
    left: 20px;
    bottom: 1px;
    width: 300px;
    word-spacing: 3px;
    filter: drop-shadow(0px 0px 0px #000) !important;
  }
`

const Nav = styled.nav`
  position: relative;
  right: -5px;
  float: right;
  top: 50%;
  transform: translateY(-50%);
  transition: all 400ms;
  > a {
    margin-right: 50px;
    font-family: 'Ubuntu';
    font-size: 15px;
    font-weight: 100;
    color: white;
    box-shadow: 0px 5px 21px -2px rgb(13,19,25);
    transition: all 300ms;
    text-decoration: none;
  }
  > a:hover{
    box-shadow: 0px 10px 15px -5px rgb(104, 110, 150);
    background: #a1a1db;
    padding: 3px 0px;
    border-radius: 3px;
  }
`


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hovered: false,
      loadBar: false,
    }
  }

  componentDidMount(){
    console.log('aa');
    this.setState({loadBar: !this.state.loadBar},() =>{
      setTimeout(() => this.setState({loadBar: !this.state.loadBar}), 8000);
    });
  }

  render(){
    return (
      <NavbarContainer
        loadBar={this.state.loadBar}
        hovered={this.state.hovered} id="nav-show">
          <Link to='/'
            onMouseOver={() => this.setState({hovered: true})}
            onMouseOut={() => this.setState({hovered: false})}>
            Refugee Flow
          </Link>
          <Nav>
            <Link to='/conflict'>Conflict</Link>
            <Link to='/route/EasternMediterranean'>Route</Link>
            <Link to='/about'>About</Link>
            <a href='http://www.google.com'>Donate</a>
          </Nav>
        </NavbarContainer>
    )
  }

}
export default Navbar;
