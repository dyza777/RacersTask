import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styles from './TeamsTable.css';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import { deleteRacer } from '../../actions';
import { teamsTableSelector } from '../../selectors';
import "react-table/react-table.css";
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteRacer
}, dispatch);

class TeamsTable extends Component {

    static propTypes = {
        teams: PropTypes.arrayOf(PropTypes.object),
        deleteRacer: PropTypes.func.isRequired
    }

    render() {
        const { teams } = this.props;
        return (
            <div>
                <span className='racers-table-title'> Командный зачёт </span> 
                <ReactTable
                    showPagination={false}
                    resizable={false}
                    pageSize={teams.length}
                    sortable={false}
                    data={teams}
                    columns={[
                        {
                            id: 'teamName',
                            Header: "Название команды",
                            accessor: d => d.team,
                            style: { textAlign: 'center', fontWeight: 'bold'}
                        },
                        {
                            id: 'teamScore',
                            Header: "Результат",
                            accessor: d => d.score || 0,
                            style: { textAlign: 'center'}
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default connect(teamsTableSelector(), mapDispatchToProps)(TeamsTable);