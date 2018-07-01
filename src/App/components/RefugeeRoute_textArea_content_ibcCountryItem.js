import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import { countryList } from '../data/warDictionary';
import * as _ from 'underscore';

const Wrapper = styled.div`
  height: 150px;
  width: 98%
  background: #1e1e33;
  box-shadow: 10px 13px 58px -15px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin-top: 15px;
`

const CountryName = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 300;
  color: white;
  top: 20px;
  left: 30px;
  margin: 0;
  position: relative;
  width: 0;
`
const Region = styled.p`
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 100;
  left: 30px;
  color: white;
  position: relative;
  width: 200px;
  top: 9px;
`

const Stats = styled.div`
  cursor: pointer;
  left: 30px;
  height: 20px;
  background: #54547ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;
  top: 45px;
  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 600;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 5px 0px 20px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    transition: all 300ms
  }

  &>p::before{
    content: "";
    width: 5px;
    height: 5px;
    left: 7px;
    position: absolute;
    border-radius: 50%;
    background: #8383ab;
    top: 50%;
    transform: translateY(-50%);
  }

  &>p::after{
    content: 'total acrossing';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 11px;
    width: 220px;
    text-align: left;
  }

  &:hover{
    background: #54547a;
  }
`
const BorderLocation = styled.div`
  cursor: pointer;
  left: -32px;
  height: 20px;
  background: #54547ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;
  top: 18px;
  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 400;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 5px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    transition: all 300ms
  }
  &>p::after{
    content: 'Border';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 8px;
    width: 220px;
    text-align: left;
  }

  &:hover{
    background: #54547a;
  }
`
const ChartContainer = styled.div`
  width: 60%;
  position: relative;
  left: 35%;
  height: 150px;
  margin-top: -73px;
  &>p{
    position: relative;
    top: 22px;
    color: white;
    font-weight: 200;
    font-family: 'Roboto';
    font-size:  16px;
  }


`
export default class RefugeeRoute_textArea_content_ibcCountryItem extends React.Component {

  constructor(props){
    super(props);
    this.data = props.data;
  }



  render(){
    console.log(this.data);
    return(
      <div>
        <Wrapper>
          <CountryName>{this.data['NationalityLong']}</CountryName>
          <Region>{_.find(countryList, d => d[0] === this.data['NationalityLong'].toUpperCase())[1]} Region</Region>

          <Stats><p>{'10000'}</p></Stats>
          <BorderLocation><p>{this.data['BorderLocation']}</p></BorderLocation>

          <ChartContainer>
            <p>Illegal Border Crossing by Year</p>
          </ChartContainer>
        </Wrapper>
      </div>
    )
  }

}
