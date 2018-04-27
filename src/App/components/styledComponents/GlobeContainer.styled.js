import styled, { css } from 'styled-components';

const TitleContainer = styled.div`
  position: absolute;
  ${'' /* background: #0000ff61; */}
  width: ${window.innerWidth - 30 - (0.25 * window.innerWidth) + 'px'};
  left: 30px;
  top: 110px;
`

const TitleText = styled.p`
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: 100;
  color: white;
  margin-top: 0;

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
    content: 'select regions & filter downbelow to switch country/matrix...';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 300px;
    bottom: -7px;
  }
`

const GlobeControllerButton = styled.button`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 15px;
  color: #ffffff66;
  left: 30px;
  position: absolute;
  background: none;
  border: none;
  top: 160px;
  margin: 0px;

  &:before{
    background-image: url(./globe_icon.png);
    background-size: 50%;
    width: 60px;
    height: 40px;
    background-repeat: no-repeat;
    display: inline-block;
    content: "";
    bottom: -16px;
    right: 12px;
    position: absolute;
    margin-right: 10px;
  }
`

export {
  TitleContainer,
  TitleText,
  GlobeControllerButton,
}
