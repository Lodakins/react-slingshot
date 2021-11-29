import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/actionTypes';
import {necessaryDataIsProvidedToCalculateSavings, calculateSavings} from '../utils/fuelSavings';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function fuelSavingsReducer(state = initialState.fuelSavings, action) {
  let newState;

  switch (action.type) {
    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {dateModified: action.dateModified});

    case CALCULATE_FUEL_SAVINGS:
      inewState = objectAssign({}, state);
      inewState[action.fieldName] = action.value;

      inewState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(newState);
      inewState.dateModified = action.dateModified;

      if (inewState.necessaryDataIsProvidedToCalculateSavings) {
        inewState.savings = calculateSavings(newState);
      }

      return inewState;

    default:
      return state;
  }
}
