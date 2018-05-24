import { ADD_RACE, ADD_RACER, ADD_RACER_RESULT, DELETE_RACER, FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../constants';
import { RSAA } from 'redux-api-middleware';

export const addRace = (city, number) => ({
    type: ADD_RACE,
    payload: { city, number }
});

export const addRacerResult = (racerName, position) => ({
    type: ADD_RACER_RESULT,
    payload: { racerName, position }
});

export const addRacer = (racerName, racerTeam) => ({
    type: ADD_RACER,
    payload: { racerName, racerTeam }
});

export const deleteRacer = (racerName) => ({
    type: DELETE_RACER,
    payload: { racerName }
});

export const fetchData = (data) => {
    if (!data) {
        return {
            [RSAA]: {
                endpoint: 'https://api.myjson.com/bins/u78ny',
                method: 'GET',
                types: [ FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR ]
            }
        }
    }

    return {
        type: FETCH_DATA_SUCCESS,
        payload: {
            races: JSON.parse(data.races),
            racers: JSON.parse(data.racers),
            teams: JSON.parse(data.teams)
        }
    }
};