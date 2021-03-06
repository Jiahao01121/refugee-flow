import constants from '../actionConstants';
import conflict from '../defaultStates/conflictDefaults';

const conflictReducer = (state = conflict, action) => {
  switch (action.type) {
    case constants.SET_SELECTED_YEAR:
      return {
        ...state,
        selectedYear: action.selectedYearIndex,
      };
    case constants.SET_CURRENT_COUNTRY:
      return {
        ...state,
        currentCountry: action.currentCountry,
      };

    default:
      return state;
  }
};

export default conflictReducer;
