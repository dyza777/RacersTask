import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styles from './RacersTable.css';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { deleteRacer } from '../../actions';
import { racersScoresSelector } from '../../selectors';
import "react-table/react-table.css";
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteRacer
}, dispatch);

class RacersTable extends Component {

    static propTypes = {
        racers: PropTypes.arrayOf(PropTypes.object),
        deleteRacer: PropTypes.func.isRequired
    }

    render() {
        const { racers } = this.props;
        return (
            <div>
                <span className='racers-table-title'> Турнирная таблица </span> 
                <ReactTable
                    showPagination={false}
                    resizable={false}
                    pageSize={racers.length}
                    sortable={false}
                    data={racers}
                    columns={[
                        {
                            id: 'racerName',
                            Header: "Имя",
                            accessor: d => d.name,
                            style: { textAlign: 'center', fontWeight: 'bold'}
                        },
                        {
                            id: 'racerTeam',
                            Header: "Команда",
                            accessor: d => d.team,
                            style: { textAlign: 'center'}
                        },
                        {
                            id: 'racerScore',
                            Header: "Результат",
                            accessor: d => d.score || 0,
                            style: { textAlign: 'center'}
                        },
                        {
                            id: 'delete',
                            Cell: row => (<button onClick={(e) => this.handleDeleteRacer(row)} className="btn btn-default center-block"> Удалить </button>)
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        );
    }

    handleDeleteRacer = (row) => this.props.deleteRacer(row.row.racerName);
}

export default connect(racersScoresSelector(), mapDispatchToProps)(RacersTable);