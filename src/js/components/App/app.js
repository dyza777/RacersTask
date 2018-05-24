import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styles from './app.css';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { addRace, addRacer, addRacerResult, deleteRacer } from '../../actions';
import { mainSelector } from '../../selectors';
import "react-table/react-table.css";
import { connect } from 'react-redux';
import AddRaceForm from '../AddRaceForm/AddRaceForm';
import AddRacerForm from '../AddRacerForm/AddRacerForm';
import AddRacerResultsForm from '../AddRacerResultsForm/AddRacerResultsForm';
import RacersTable from '../RacersTable/RacersTable';
import TeamsTable from '../TeamsTable/TeamsTable';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addRace, addRacer, addRacerResult, deleteRacer
}, dispatch);

class App extends Component {

    static propTypes = {
        teams: PropTypes.arrayOf(PropTypes.string),
        racers: PropTypes.arrayOf(PropTypes.object),
        addRace: PropTypes.func.isRequired,
        addRacerResult: PropTypes.func.isRequired,
        deleteRacer: PropTypes.func.isRequired
    }

    static defaultProps = {
        racers: [],
        teams: [],
        races: []
    }

    render() {
        const { teams, racers, races, addRace, addRacer, addRacerResult } = this.props;
        return (
            <div className='main'>
                <RacersTable />
                <div className='forms'>
                    <AddRaceForm racesAmount={races.length} onAddRace={addRace}/>
                    <AddRacerForm racers={racers} teams={teams} onAddRacer={addRacer}/>
                    <AddRacerResultsForm racesAmount={races.length} racers={racers} onAddRacerResult={addRacerResult}/>
                </div> 
                <TeamsTable />
            </div>
        );
    }

    handleDeleteRacer = (row) => this.props.deleteRacer(row.row.racerName);
}

export default connect(mainSelector(), mapDispatchToProps)(App);