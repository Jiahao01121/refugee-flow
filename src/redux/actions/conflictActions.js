import constants from '../actionConstants';

const setSelectedYear = selectedYearIndex => ({
  type: constants.SET_SELECTED_YEAR,
  selectedYearIndex,
});

const setCurrentCountry = currentCountry => ({
  type: constants.SET_CURRENT_COUNTRY,
  currentCountry,
});

export {
  setSelectedYear,
  setCurrentCountry,
};
