import { createSelectorCreator, createSelector, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash';
import { SCORE_RATES } from '../constants';

const teamsSelector = () => (state) => state.teams;
const racersSelector = () => (state) => state.racers;
export const racesSelector = () => (state) => state.races;

const raceNameRouterSelector = () => (state, props) => props.match.params.raceNumber;

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const racersScoresSelector = () => createSelector(
    [ racersSelector(), racesSelector()], (racers, races) => {
        const racersWithScores = racers.map(racer => {
            const racerScore = races.reduce((score, race) => {
                const raceResult = race.results.find(result => result.name === racer.name);
                const scoresToAdd = raceResult && SCORE_RATES[raceResult.position] || 0;

                return score + scoresToAdd;
            }, 0);

            return {
                ...racer,
                score: racerScore
            }
        })

        return { 
            racers: racersWithScores.sort((prev, next) => {
                    if (!next.score) return -1;
                    if (!prev.score) return 1;

                    return next.score - prev.score
                })
        };
    }
);

export const teamsTableSelector = () => createSelector(
    [ teamsSelector(), racersScoresSelector(), ], (teams, { racers }) => {
        const teamsWithScores = teams.map(team => {
            const teamScore = racers.reduce((score, racer) => {
                const scoresToAdd = racer.team === team ? racer.score : 0

                return score + scoresToAdd;
            }, 0);

            return {
                team,
                score: teamScore
            }
        })

        return { 
            teams: teamsWithScores.sort((prev, next) => {
                    if (!next.score) return -1;
                    if (!prev.score) return 1;

                    return next.score - prev.score
                })
        };
    }
);

export const racesTableSelector = () => createSelector(
    [ racesSelector() ], races => ({ races })
);

export const mainSelector = () => createDeepEqualSelector(
    [ teamsSelector(), racesSelector(), racersSelector() ],
    ( teams, races, racers ) => ({
            teams,
            racers,
            races
    })
);

export const raceInfoSelector = () => createDeepEqualSelector(
    [ racesSelector(), raceNameRouterSelector() ],
    ( races, raceNumber ) => ({ raceInfo: races.find(race => race.number === +raceNumber) || null })
);