import { ADD_RACE, ADD_RACER_RESULT, FETCH_DATA_SUCCESS } from '../constants';

const initialState = [
]

export default function(state = initialState, action) {
  const { payload } = action; 
  switch (action.type) {
    case FETCH_DATA_SUCCESS:{
      const newState = [...payload.races];
      window.sessionStorage.setItem('races', JSON.stringify(newState))

      return newState;
    };
    case ADD_RACE: {
      const newState = [
        ...state,
        {
          number: payload.number,
          city: payload.city,
          results: []
        }
      ];
      window.sessionStorage.setItem('races', JSON.stringify(newState))

      return newState;
    };
    case ADD_RACER_RESULT: {
      const newState = [...state];
      const lastRaceResults = newState[newState.length - 1].results;
      const racerResult = lastRaceResults.find(result => result.name === payload.racerName);

      if (racerResult) {
        racerResult.position = payload.position;

        return newState;
      }

      lastRaceResults.push({ name: payload.racerName, position: payload.position});

      window.sessionStorage.setItem('races', JSON.stringify(newState))

      return newState;
    }
    default: 
      return state;
  }
}