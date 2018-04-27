import styled, { css } from 'styled-components';

const Background = styled.div`
  width: 25%;
  background: #15151C;
  height: 100%;
  position: absolute;
  right: 0;
  top: 60px;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);`

const Title = styled.p`
  position: relative;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 100;
  color: white;
  margin-top: 0;
  left: 5%;
  top: 15px;

  &:after{
    background-image: url(./title_icon.png);
    background-size: 14px 14px;
    display: inline-block;
    width: 14px;
    height: 14px;
    content: "";
    bottom: 10px;
    right: 0px;
    position: relative;
  }

  &:before{
    content: 'description: Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetue.';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 320px;
    top: 35px;
  }
`

const Legend = styled.img`
  position: absolute;
  bottom: 75px;
  margin: 0;
  right: 30px;
  width: 25%;
`

const CurrentYearButton = styled.button`
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  left: 20px;
  position: absolute;
  background: none;
  border: none;
  top: 110px;
  margin: 0px;
  text-decoration : ${props => props.selected == 1 ? 'underline' : 'none'}
  }
`

const AllYearButton = styled.button`
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  left: 170px;
  position: absolute;
  background: none;
  border: none;
  top: 110px;
  margin: 0px;
  text-decoration : ${props => props.selected == 2 ? 'underline' : 'none'}

`
export {
  Background,
  Title,
  Legend,
  CurrentYearButton,
  AllYearButton,
  }
