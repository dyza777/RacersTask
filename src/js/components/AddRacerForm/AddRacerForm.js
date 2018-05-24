import React, { Component } from 'react';
import './AddRacerForm.css';
import PropTypes from 'prop-types';

export default class AddRacerForm extends Component {

    static propTypes = {
        onAddRacer: PropTypes.func.isRequired
    }

    static defaultProps = {
        teams: []
    }

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            selectedTeam: !!props.teams && props.teams[0] || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            selectedTeam: nextProps.teams[0]
        })
    }

    changeInputValue = (event) => this.setState({inputValue: event.target.value})

    render() {
        const { teams } = this.props;

        return (
            <div className='add-racer-block'>
                <span className='races-add-title'> Добавление Гонщика </span> 
                    <div className="form-group">
                        <label> Имя гонщика </label>
                        <input type="text" className="form-control" value={this.state.inputValue} onChange={this.changeInputValue} />
                    </div>
                    <div className="form-group">
                        <label> Команда </label>
                        <select onChange={(event) => this.setState({ selectedTeam: event.target.value })} className="form-control" id="sel1">
                            {teams.map(team => (<option key={team}>{team}</option>))}
                        </select>
                    </div>
                    <button onClick={this.handleAddRacer} className="btn btn-default pull-right"> Добавить </button>
            </div>
        )
    }

    handleAddRacer = () => {
        if (!this.state.inputValue) {
            return;
        }
        this.setState({ inputValue: ''});
        if (this.props.racers.find(racer => racer.name === this.state.inputValue)) {
            return;
        }
        this.props.onAddRacer(this.state.inputValue, this.state.selectedTeam)
    }
}