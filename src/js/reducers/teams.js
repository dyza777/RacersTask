import { FETCH_DATA_SUCCESS } from '../constants';
const initialState = [];

export default function(state = initialState, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_DATA_SUCCESS:{
      const newState = [...payload.teams];
      window.sessionStorage.setItem('teams', JSON.stringify(newState))

      return newState;
    };
    default:
      return state
  }
}