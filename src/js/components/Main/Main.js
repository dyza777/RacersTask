import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import App from '../App/app';
import RacesRoute from '../RacesRoute/RacesRoute';
import RaceInfo from '../RaceInfo/RaceInfo';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchData
}, dispatch);

class Main extends Component {
    
    componentWillMount() {
        const racers = window.sessionStorage.getItem('racers');
        const races = window.sessionStorage.getItem('races');
        const teams = window.sessionStorage.getItem('teams');
        const data = (racers || races || teams) ? { racers, races, teams } : null;

        this.props.fetchData(data);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route path='/main' component={App}/>
                    <Route path='/races' component={RacesRoute}/>
                    <Route path="*" render={() => (<Redirect to="/main"/>)}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Main));