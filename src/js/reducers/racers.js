import { ADD_RACER, DELETE_RACER, FETCH_DATA_SUCCESS } from '../constants';

const initialState = [

];

export default function(state = initialState, action) {
  const { payload } = action;
  switch(action.type) {
    case FETCH_DATA_SUCCESS: {
      const newState = [...payload.racers];
      window.sessionStorage.setItem('racers', JSON.stringify(newState))

      return newState;
    };
    case ADD_RACER: {
      const newState = [
        ...state, {
          name: payload.racerName,
          team: payload.racerTeam
        }
      ];
      window.sessionStorage.setItem('racers', JSON.stringify(newState))

      return newState;
    };
    case DELETE_RACER: {
      const newState = [...state].filter(racer => racer.name !== payload.racerName);
      window.sessionStorage.setItem('racers', JSON.stringify(newState));

      return newState
    }

    default: 
      return state;
  }
}