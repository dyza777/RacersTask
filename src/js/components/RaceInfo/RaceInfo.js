import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { raceInfoSelector } from '../../selectors';
import { connect } from 'react-redux';

class RaceInfo extends Component {
    render() {
        const { raceInfo } = this.props;
        if (!raceInfo) return null;
        return (
            <div>
                <span className='racers-table-title'> {`Участники гонки номер ${raceInfo.number}`} </span> 
                <ReactTable
                    showPagination={false}
                    resizable={false}
                    pageSize={raceInfo.results.length}
                    sortable={false}
                    data={raceInfo.results}
                    columns={[
                        {
                            id: 'racerName',
                            Header: "Имя",
                            accessor: d => d.name,
                            style: { textAlign: 'center', fontWeight: 'bold'}
                        },
                        {
                            id: 'racerScore',
                            Header: "Позиция",
                            accessor: d => d.position,
                            style: { textAlign: 'center'}
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default connect(raceInfoSelector(), null)(RaceInfo);