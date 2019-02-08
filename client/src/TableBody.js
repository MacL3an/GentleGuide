import React, {Component} from 'react';

const TableBody = props => {
    const rows = props.routesData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.elevation}</td>
            </tr>
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>            
    );
}

export default TableBody;