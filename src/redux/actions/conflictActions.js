import constants from '../actionConstants';

const setSelectedYear = selectedYearIndex => ({ type: constants.SET_SELECTED_YEAR, selectedYearIndex });

export {
  setSelectedYear,
};
