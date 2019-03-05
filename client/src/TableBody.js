import React from 'react';
import TableRow from './TableRow';

const TableBody = props => {
    const rows = props.routesData.map((row, index) => {
        return (
            <TableRow rowData={row} key={`${row.name}-${row.trailhead.x}-${row.trailhead.y}`} date = {props.date}/> 
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>      
    );
}

export default TableBody;