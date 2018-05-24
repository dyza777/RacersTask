import { combineReducers } from 'redux';
import racersReducer from './racers';
import racesReducer from './races';
import teamsReducer from './teams';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    racers: racersReducer,
    races: racesReducer,
    teams: teamsReducer,
    router: routerReducer
});

export default rootReducer;