import React, { Component } from 'react';
import styles from './Races.css';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { racesTableSelector } from '../../selectors';
import "react-table/react-table.css";
import { connect } from 'react-redux';

class Races extends Component {

    static propTypes = {
        races: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        races: []
    }

    render() {
        const { teams, racers, races, addRace, addRacer, addRacerResult } = this.props;
        return (
            <div>
                <span className='racers-table-title'> Список гонок </span> 
                <ReactTable
                    showPagination={false}
                    resizable={false}
                    pageSize={races.length}
                    sortable={false}
                    data={races}
                    columns={[
                        {
                            id: 'raceNumber',
                            Header: "Порядковый номер",
                            accessor: d => d.number,
                            style: { textAlign: 'center', fontWeight: 'bold', cursor: 'pointer'},
                            Cell: (row) => (<Link to={{ pathname:`/races/${row.row.raceNumber}`}}><div>{row.value}</div></Link>)
                        },
                        {
                            id: 'raceTown',
                            Header: "Город",
                            accessor: d => d.city,
                            style: { textAlign: 'center', cursor: 'pointer'},
                            Cell: (row) => (<Link to={{ pathname:`/races/${row.row.raceNumber}`}}><div>{row.value}</div></Link>)
                        },
                        {
                            id: 'raceParticipantsCount',
                            Header: "Количество участников",
                            accessor: d => d.results.length,
                            style: { textAlign: 'center', cursor: 'pointer'},
                            Cell: (row) => (<Link to={{ pathname:`/races/${row.row.raceNumber}`}}><div>{row.value}</div></Link>)
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default connect(racesTableSelector(), null)(Races);