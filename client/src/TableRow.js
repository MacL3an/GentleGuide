import React, {Component} from 'react';

class TableRow extends Component {
    render() {
        let dangerLevel = parseInt(this.props.rowData.avalancheDanger);
        let warningClass = null;
        if (dangerLevel >= 3) {
            warningClass = "avoid";
        } else if (dangerLevel === 2 && this.props.rowData.terrainComplexity > 1) {
            warningClass = "caution";
        } else if (dangerLevel <= 2) {
            warningClass = "ok";
        }

        return (
            <tr className={warningClass}>
                <td>{this.props.rowData.avalancheDanger}</td>
                <td>{this.props.rowData.name}</td>
                <td>{this.props.rowData.elevation}</td>
                <td>{this.props.rowData.ascent}</td>
                <td>{this.props.rowData.duration}</td>
                <td>{this.props.rowData.terrainComplexity}</td>
                <td>{this.props.rowData.description}</td>
            </tr>
        );
    }
}

export default TableRow;
