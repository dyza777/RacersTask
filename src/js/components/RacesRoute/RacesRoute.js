import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import App from '../App/app';
import Races from '../Races/Races';
import RaceInfo from '../RaceInfo/RaceInfo';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchData
}, dispatch);

export default class RacesRoute extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/races' component={Races}/>
                    <Route path='/races/:raceNumber' component={RaceInfo}/>
                </Switch>
            </div>
        )
    }
}