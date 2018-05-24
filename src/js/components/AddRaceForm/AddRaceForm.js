import React, { Component } from 'react';
import './AddRaceForm.css';
import PropTypes from 'prop-types';

export default class AddRaceForm extends Component {

    static propTypes = {
        onAddRace: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    static defaultProps = {
        racesAmount: 1
    }

    changeInputValue = (event) => this.setState({ inputValue: event.target.value})

    render() {
        return (
            <div className='add-race-block'>
                <span className='races-add-title'> Добавление гонки </span> 
                    <div className="form-group">
                        <label> Город </label>
                        <input type="text" className="form-control" value={this.state.inputValue} onChange={this.changeInputValue} />
                    </div>
                    <span> {`Гонка номер ${this.props.racesAmount + 1}`} </span>
                    <button onClick={this.handleAddRace} className="btn btn-default pull-right"> Добавить </button>
            </div>
        )
    }

    handleAddRace = () => {
        if (!this.state.inputValue) {
            return;
        }
        this.setState({ inputValue: ''});
        this.props.onAddRace(this.state.inputValue, this.props.racesAmount + 1)
    }
}