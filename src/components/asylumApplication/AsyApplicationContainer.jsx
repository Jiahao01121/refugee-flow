import React from 'react';
import { connect } from 'react-redux';

import * as d3 from 'd3';
import { toLower, startCase } from 'lodash';
import styled, { css } from 'styled-components';
import { ScaleLoader } from 'react-spinners';

import { fetchData } from '../utils/fetchers';

import { LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator } from '../LoadingBar';
import AsyApplicationChartContainer from './AsyApplicationChartContainer';

import tooltipIcon from './icon_tooltip.png';

const Background = styled.div`
  width: 25%;
  background: #0f1015f7;
  height: 100%;
  position: absolute;
  right: 0;
  top: 40px;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);
  display: flex;
  flex-direction: column;

  & ::selection {
    background: none;
    color: none;
    }
`;

const Title = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 300;
  color: white;
  margin-top: 15px;
  margin-left: 5%;
  display: inherit;
  cursor: pointer;
  z-index: 5;
  transition: all 400ms;
  &:hover{
    color: #d7d7ead4;
  }

  @media (max-width: 1245px) {
    font-size: 16px;
  }
  &:after{
    background-image: ${() => `url(${tooltipIcon})`};
    background-size: 14px 14px;
    display: inline-block;
    width: 14px;
    height: 14px;
    content: "";
    right: -5px;
    position: relative;
  }

  &:before{
    content: 'Asylum application submissions over time';
    font-weight: 100;
    color: white;
    font-size: 11px;
    letter-spacing: 0.7px;
    position: absolute;
    top: 43px;
  }
`
const ButtonWrapper = styled.div`
  display: inherit;
  justify-content: flex-start;
  height: 40px;

  @media (max-height: 599px) {
    margin: -5px 0 0 5%;
  }
  @media (max-height:749px) and (min-height: 600px) {
    margin: 10px 0 0 5%;
  }
  @media (min-height: 750px) {
    margin: 10px 0 0 5%;
  }
  @media (max-width: 1210px) {
    margin: 20px 0 0 5%;
  }


`;
const CurrentYearButton = styled.button`
  display: inherit;
  width: 50%;
  height: 30px;
  cursor: pointer;
  font-family: 'Ubuntu';
  font-weight: 400;
  font-size: 12px;
  padding: 0px 0px 0px 20px;
  background: #3f415845;
  border-radius: 3px;
  border: 1px solid;
  border-color: #3f41581c;
  transition: background 400ms,border-color 1000ms;
  color: white;
  margin-right: 5%;

  &:hover{
    background: #2b2c3c;
    border-color: #2e9493cc;
  }
  ${props => props.selected == 1 && css`
    background: #3f415894;
    border-color: #555875cf;
  `};
  &::after{
    content: ${ props => "'(" + props.selectedYear + ")'" };
    color: white;
    font-weight: 700;
    font-size: 9px;
    margin-left: 7px;
    text-decoration: underline;
    text-decoration-color: #9ca6d6f7;
  }

  @media (max-width: 1210px) {
    width: 70%;
  }
`
const AllYearButton = styled.button`
  display: inherit;
  width: 40%;
  height: 30px;
  cursor: pointer;
  font-family: 'Ubuntu';
  font-weight: 400;
  font-size: 12px;
  padding: 0px 0px 0px 27px;
  background: #3f415845;
  border-radius: 3px;
  border: 1px solid;
  border-color: #3f41581c;
  transition: background 400ms,border-color 1000ms;
  color: white;
  &:hover{
    background: #2b2c3c;
    border-color: #2e9493cc;
  }
  ${props => props.selected == 2 && css`
    background: #3f415894;
    border-color: #555875cf;
  `};
`;

class AsyApplicationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: true,
      loadingText : 'Loading...',
      buttonMode : 1,
      data: [],
    };

    this.buttonClick = this.buttonClick.bind(this);

    this.setData = this.setData.bind(this);
    this.setLoadingStatus = this.setLoadingStatus.bind(this);
  }

  componentDidMount() {
    const url = `${window.location.protocol}//${window.location.host}/data/asy_application_all`;
    fetchData(url, this.setData, this.setLoadingStatus);
  }

  setData(data) {
    this.setState({ data });
  }

  setLoadingStatus(loadingStatus) {
    this.setState({ loadingStatus });
  }

  buttonClick(i) {
    this.setState({ buttonMode: i });
  }

  render() {
    const { buttonMode, data, loadingStatus, loadingText } = this.state;
    const { selectedYear, currentCountry, loadingManager } = this.props;
    return (
      <Background>
        <Title
          onClick={() => d3.select('.annotation-wrapper')
            .style('display', 'block')
            .transition()
            .delay(10)
            .style('opacity', '1')
          }
        >
          {`Total Asylum Application | ${startCase(toLower(currentCountry))}`}
        </Title>
        <ButtonWrapper>
          <CurrentYearButton
            onClick={() => this.buttonClick(1)}
            selected={buttonMode}
            selectedYear={'201'.concat(selectedYear)}
          >
          SHOW CURRENT YEAR
          </CurrentYearButton>
          <AllYearButton
            onClick={() => this.buttonClick(2)}
            selected={buttonMode}
          >
          SHOW ALL YEARS
          </AllYearButton>
        </ButtonWrapper>

        <LoadingDivWrapper
          loading={loadingStatus}
          leftPercentage="50%"
          marginTop="-60"
        >
          <LoaderGraphWrapper>
            <ScaleLoader color="#ffffff" loading={loadingStatus} />
          </LoaderGraphWrapper>
          <LoadingIndicator>
            {loadingText}
          </LoadingIndicator>
        </LoadingDivWrapper>
        {data.length > 0 && (
          <AsyApplicationChartContainer
            selectedYear={selectedYear}
            currentCountry={currentCountry}
            data={data}
            loadingManager={loadingManager}
            chartMode={buttonMode}
          />
        )}
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  selectedYear: state.conflictReducer.selectedYear,
});

export default connect(mapStateToProps)(AsyApplicationContainer);
