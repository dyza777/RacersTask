import React, { Component } from 'react';
import './AddRacerResultsForm.css';
import PropTypes from 'prop-types';

export default class AddRacerResultsForm extends Component {

    static propTypes = {
        onAddRacerResult: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            selectedRacer: props.racers[0] && props.racers[0].name || '',
            racers: props.racers
        }
    }

    static defaultProps = {
        racesAmount: 1
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            selectedRacer: nextProps.racers[0].name
        })
    }

    changeInputValue = (event) => this.setState({ inputValue: event.target.value})

    render() {
        const { racesAmount, racers } = this.props; 
        return (
            <div className='add-racer-results-block'>
                <span className='races-add-title'> {`Введите результаты гонщика в гонке номер ${racesAmount}`} </span> 
                    <div className="form-group">
                        <select onChange={(event) => this.setState({ selectedRacer: event.target.value})} className="form-control" id="sel1">
                            {racers.map(racer => (<option key={racer.name}>{racer.name}</option>))}
                        </select>
                    </div>
                    <div>
                        <span> Закончил на позиции </span>
                        <input
                            className="form-control"
                            type='number'
                            onChange={(event) => this.setState({ positionValue: event.target.value})}
                            value={this.state.positionValue}
                        />
                    </div>
                    <button onClick={this.handleAddRace} className="btn btn-default pull-right"> Подтвердить </button>
            </div>
        )
    }

    handleAddRace = () => {
        if (!this.state.positionValue) {
            return;
        }
        this.setState({ positionValue: ''});
        this.props.onAddRacerResult(this.state.selectedRacer, +this.state.positionValue)
    }
}