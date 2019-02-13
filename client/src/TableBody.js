import React from 'react';
import TableRow from './TableRow';

const TableBody = props => {
    const rows = props.routesData.map((row, index) => {
        return (
            <TableRow rowData={row} key={index}/> 
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>      
    );
}

export default TableBody;